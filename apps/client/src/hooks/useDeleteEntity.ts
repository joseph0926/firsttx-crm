import type { Model } from '@firsttx/local-first';
import { useTx, RETRY_PRESETS } from '@firsttx/tx';
import { toast } from 'sonner';
import { useClient, type TypedDocumentNode } from 'urql';

type DeleteEntityConfig<TEntity extends { id: string }, TMutationData> = {
  model: Model<TEntity[]>;
  document: TypedDocumentNode<TMutationData, { id: string }>;
  entityName: 'contact' | 'task' | 'interaction';
  onSuccess?: () => void;
};

export const useDeleteEntity = <
  TEntity extends { id: string },
  TMutationData,
>(
  config: DeleteEntityConfig<TEntity, TMutationData>
) => {
  const client = useClient();

  return useTx<{ id: string }, TMutationData, TEntity>({
    optimistic: async (input) => {
      let snapshot: TEntity | null = null;

      await config.model.patch((draft) => {
        const index = draft.findIndex((item) => item.id === input.id);
        if (index !== -1) {
          snapshot = { ...draft[index] };
          draft.splice(index, 1);
        }
      });

      return snapshot!;
    },
    rollback: async (_input, snapshot) => {
      if (snapshot) {
        await config.model.patch((draft) => {
          draft.push(snapshot);
        });
      }
    },
    request: async (input) => {
      const result = await client.mutation(config.document, {
        id: input.id,
      });

      if (result.error) {
        throw new Error(
          result.error.message || `Failed to delete ${config.entityName}`
        );
      }
      if (!result.data) {
        throw new Error(`Mutation succeeded but no data returned`);
      }

      return result.data;
    },
    onSuccess: async () => {
      toast.success(`${config.entityName} deleted successfully`);
      config.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || `Failed to delete ${config.entityName}`);
      console.error(error);
    },
    transition: true,
    retry: RETRY_PRESETS.default,
  });
};
