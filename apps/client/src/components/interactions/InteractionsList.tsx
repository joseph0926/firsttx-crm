import { useSuspenseSyncedModel } from '@firsttx/local-first';
import { useClient } from 'urql';
import { InteractionsModel } from '@/models/interactions';
import { GetInteractionsDocument } from '@/gql/graphql';
import { InteractionsDataTable } from './InteractionsDataTable';
import { columns } from './columns';

export function InteractionsList() {
  const client = useClient();

  const interactions = useSuspenseSyncedModel(InteractionsModel, async () => {
    const result = await client.query(GetInteractionsDocument, {});

    if (result.error) {
      const isAuthError = result.error.graphQLErrors.some(
        (e) =>
          e.extensions?.code === 'UNAUTHENTICATED' ||
          e.message.includes('Unauthorized')
      );

      if (isAuthError) {
        throw new Error('Authentication required');
      }
      throw new Error(result.error.message || 'Failed to fetch interactions');
    }

    if (!result.data?.interactions) {
      throw new Error('Failed to fetch interactions');
    }

    return result.data.interactions;
  });

  return <InteractionsDataTable columns={columns} data={interactions} />;
}
