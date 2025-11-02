import { useQuery } from 'urql';
import { GetContactsDocument, type GetContactsQuery } from './gql/graphql';

export default function App() {
  const [result] = useQuery<GetContactsQuery>({ query: GetContactsDocument });

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {data?.contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
