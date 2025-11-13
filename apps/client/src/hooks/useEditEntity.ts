import type { Model } from '@firsttx/local-first';
import { useTx, RETRY_PRESETS } from '@firsttx/tx';
import { toast } from 'sonner';
import { useClient, type TypedDocumentNode } from 'urql';

type EditEntityConfig<
  TInput extends { id: string },
  TEntity extends { id: string },
  TMutationData,
  TGraphQLInput,
> = {
  model: Model<TEntity[]>;
  document: TypedDocumentNode<
    TMutationData,
    { id: string; input: TGraphQLInput }
  >;
  entityName: 'contact' | 'task' | 'interaction';
  transformInput: (input: TInput) => TGraphQLInput;
  extractResult: (data: TMutationData) => TEntity;
  applyOptimisticUpdate?: (entity: TEntity, input: TInput) => TEntity;
  onSuccess?: () => void;
};

export const useEditEntity = <
  TInput extends { id: string },
  TEntity extends { id: string },
  TMutationData,
  TGraphQLInput,
>(
  config: EditEntityConfig<TInput, TEntity, TMutationData, TGraphQLInput>
) => {
  const client = useClient();

  return useTx<TInput, TMutationData, TEntity>({
    optimistic: async (input) => {
      let snapshot: TEntity | null = null;

      await config.model.patch((draft) => {
        const index = draft.findIndex((item) => item.id === input.id);
        if (index !== -1) {
          snapshot = { ...draft[index] };

          if (config.applyOptimisticUpdate) {
            draft[index] = config.applyOptimisticUpdate(draft[index], input);
          } else {
            draft[index] = { ...draft[index], ...input };
          }
        }
      });

      return snapshot!;
    },
    rollback: async (_input, snapshot) => {
      if (snapshot) {
        await config.model.patch((draft) => {
          const index = draft.findIndex((item) => item.id === snapshot.id);
          if (index !== -1) {
            draft[index] = snapshot;
          }
        });
      }
    },
    request: async (input) => {
      const graphqlInput = config.transformInput(input);

      const result = await client.mutation(config.document, {
        id: input.id,
        input: graphqlInput,
      });

      if (result.error) {
        throw new Error(
          result.error.message || `Failed to update ${config.entityName}`
        );
      }
      if (!result.data) {
        throw new Error(`Mutation succeeded but no data returned`);
      }

      return result.data;
    },
    onSuccess: async (data, input) => {
      const updatedEntity = config.extractResult(data);

      await config.model.patch((draft) => {
        const index = draft.findIndex((item) => item.id === input.id);
        if (index !== -1) {
          draft[index] = updatedEntity;
        }
      });

      toast.success(`${config.entityName} updated successfully`);

      config.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || `Failed to update ${config.entityName}`);
      console.error(error);
    },
    transition: true,
    retry: RETRY_PRESETS.default,
  });
};
