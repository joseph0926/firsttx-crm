import { useSuspenseSyncedModel } from '@firsttx/local-first';
import { useClient } from 'urql';
import { ContactsModel } from '@/models/contacts';
import { GetContactsDocument } from '@/gql/graphql';
import { ContactsDataTable } from './ContactsDataTable';
import { columns } from './columns';

export function ContactsList() {
  const client = useClient();

  const contacts = useSuspenseSyncedModel(ContactsModel, async () => {
    const result = await client.query(GetContactsDocument, {});

    if (result.error) {
      const isAuthError = result.error.graphQLErrors.some(
        (e) =>
          e.extensions?.code === 'UNAUTHENTICATED' ||
          e.message.includes('Unauthorized')
      );

      if (isAuthError) {
        throw new Error('Authentication required');
      }
      throw new Error(result.error.message || 'Failed to fetch contacts');
    }

    if (!result.data?.contacts) {
      throw new Error('Failed to fetch contacts');
    }

    return result.data.contacts;
  });

  return <ContactsDataTable columns={columns} data={contacts} />;
}
