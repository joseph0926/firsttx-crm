import type { Model } from '@firsttx/local-first';
import { useTx } from '@firsttx/tx';
import { toast } from 'sonner';
import { useClient, type TypedDocumentNode } from 'urql';

type CreateEntityConfig<
  TInput,
  TEntity extends { id: string },
  TMutationData,
  TGraphQLInput,
> = {
  model: Model<TEntity[]>;
  document: TypedDocumentNode<TMutationData, { input: TGraphQLInput }>;
  entityName: 'contact' | 'task' | 'interaction';
  buildTempEntity: (input: TInput) => TEntity;
  transformInput: (input: TInput) => TGraphQLInput;
  extractResult: (data: TMutationData) => TEntity;
  addToTop?: boolean;
  onSuccess?: () => void;
};

export const useCreateEntity = <
  TInput,
  TEntity extends { id: string },
  TMutationData,
  TGraphQLInput,
>(
  config: CreateEntityConfig<TInput, TEntity, TMutationData, TGraphQLInput>
) => {
  const client = useClient();

  return useTx<TInput, TMutationData>({
    optimistic: async (input) => {
      const tempEntity = config.buildTempEntity(input);

      await config.model.patch((draft) => {
        if (config.addToTop) {
          draft.unshift(tempEntity);
        } else {
          draft.push(tempEntity);
        }
      });
    },
    rollback: async () => {
      await config.model.patch((draft) => {
        const index = draft.findIndex((item) => item.id.startsWith('temp-'));
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
    },
    request: async (input) => {
      const graphqlInput = config.transformInput(input);

      const result = await client.mutation(config.document, {
        input: graphqlInput,
      });
      if (result.error) {
        throw new Error(
          result.error.message || `Failed to create ${config.entityName}`
        );
      }
      if (!result.data) {
        throw new Error(`Mutation succeeded but no data returned`);
      }

      return result.data;
    },
    onSuccess: async (data) => {
      const realEntity = config.extractResult(data);

      await config.model.patch((draft) => {
        const tempIndex = draft.findIndex((item) =>
          item.id.startsWith('temp-')
        );
        if (tempIndex !== -1) {
          draft[tempIndex] = realEntity;
        }
      });

      toast.success(`${config.entityName} created successfully`);

      config.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || `Failed to create ${config.entityName}`);
      console.error(error);
    },
    transition: true,
    retry: { maxAttempts: 2, delayMs: 500 },
  });
};
