/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation RequestMagicLink($input: RequestMagicLinkInput!) {\n  requestMagicLink(input: $input) {\n    success\n    message\n    expiresInMinutes\n  }\n}\n\nmutation VerifyMagicLink($input: VerifyMagicLinkInput!) {\n  verifyMagicLink(input: $input) {\n    accessToken\n    user {\n      ...UserDetail\n    }\n  }\n}": typeof types.RequestMagicLinkDocument,
    "query Me {\n  me {\n    ...UserDetail\n  }\n}": typeof types.MeDocument,
    "fragment ContactCore on Contact {\n  id\n  name\n}\n\nfragment ContactContactInfo on Contact {\n  email\n  phone\n}\n\nfragment ContactBusinessInfo on Contact {\n  company\n  position\n}\n\nfragment ContactStatus on Contact {\n  status\n  priority\n}\n\nfragment ContactMetadata on Contact {\n  tags\n  notes\n}\n\nfragment ContactTimestamps on Contact {\n  createdAt\n  updatedAt\n  lastContactedAt\n}\n\nfragment ContactListItem on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactStatus\n  lastContactedAt\n}\n\nfragment ContactCard on Contact {\n  ...ContactListItem\n  ...ContactBusinessInfo\n  tags\n}\n\nfragment ContactDetail on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactBusinessInfo\n  ...ContactStatus\n  ...ContactMetadata\n  ...ContactTimestamps\n}": typeof types.ContactCoreFragmentDoc,
    "mutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation UpdateContact($id: String!, $input: UpdateContactInput!) {\n  updateContact(id: $id, input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation RemoveContact($id: String!) {\n  removeContact(id: $id) {\n    ...ContactCore\n  }\n}": typeof types.CreateContactDocument,
    "query GetContacts {\n  contacts {\n    ...ContactListItem\n  }\n}\n\nquery GetContact($id: String!) {\n  contact(id: $id) {\n    ...ContactDetail\n  }\n}": typeof types.GetContactsDocument,
    "query GetDashboardStats {\n  dashboardStats {\n    contacts {\n      total\n      active\n      leads\n      inactive\n    }\n    tasks {\n      total\n      pending\n      completed\n      highPriority\n    }\n    interactions {\n      total\n      thisWeek\n      thisMonth\n    }\n  }\n}": typeof types.GetDashboardStatsDocument,
    "fragment UserCore on User {\n  id\n  email\n  name\n}\n\nfragment UserTimestamps on User {\n  createdAt\n  updatedAt\n}\n\nfragment UserDetail on User {\n  ...UserCore\n  ...UserTimestamps\n}": typeof types.UserCoreFragmentDoc,
};
const documents: Documents = {
    "mutation RequestMagicLink($input: RequestMagicLinkInput!) {\n  requestMagicLink(input: $input) {\n    success\n    message\n    expiresInMinutes\n  }\n}\n\nmutation VerifyMagicLink($input: VerifyMagicLinkInput!) {\n  verifyMagicLink(input: $input) {\n    accessToken\n    user {\n      ...UserDetail\n    }\n  }\n}": types.RequestMagicLinkDocument,
    "query Me {\n  me {\n    ...UserDetail\n  }\n}": types.MeDocument,
    "fragment ContactCore on Contact {\n  id\n  name\n}\n\nfragment ContactContactInfo on Contact {\n  email\n  phone\n}\n\nfragment ContactBusinessInfo on Contact {\n  company\n  position\n}\n\nfragment ContactStatus on Contact {\n  status\n  priority\n}\n\nfragment ContactMetadata on Contact {\n  tags\n  notes\n}\n\nfragment ContactTimestamps on Contact {\n  createdAt\n  updatedAt\n  lastContactedAt\n}\n\nfragment ContactListItem on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactStatus\n  lastContactedAt\n}\n\nfragment ContactCard on Contact {\n  ...ContactListItem\n  ...ContactBusinessInfo\n  tags\n}\n\nfragment ContactDetail on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactBusinessInfo\n  ...ContactStatus\n  ...ContactMetadata\n  ...ContactTimestamps\n}": types.ContactCoreFragmentDoc,
    "mutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation UpdateContact($id: String!, $input: UpdateContactInput!) {\n  updateContact(id: $id, input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation RemoveContact($id: String!) {\n  removeContact(id: $id) {\n    ...ContactCore\n  }\n}": types.CreateContactDocument,
    "query GetContacts {\n  contacts {\n    ...ContactListItem\n  }\n}\n\nquery GetContact($id: String!) {\n  contact(id: $id) {\n    ...ContactDetail\n  }\n}": types.GetContactsDocument,
    "query GetDashboardStats {\n  dashboardStats {\n    contacts {\n      total\n      active\n      leads\n      inactive\n    }\n    tasks {\n      total\n      pending\n      completed\n      highPriority\n    }\n    interactions {\n      total\n      thisWeek\n      thisMonth\n    }\n  }\n}": types.GetDashboardStatsDocument,
    "fragment UserCore on User {\n  id\n  email\n  name\n}\n\nfragment UserTimestamps on User {\n  createdAt\n  updatedAt\n}\n\nfragment UserDetail on User {\n  ...UserCore\n  ...UserTimestamps\n}": types.UserCoreFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RequestMagicLink($input: RequestMagicLinkInput!) {\n  requestMagicLink(input: $input) {\n    success\n    message\n    expiresInMinutes\n  }\n}\n\nmutation VerifyMagicLink($input: VerifyMagicLinkInput!) {\n  verifyMagicLink(input: $input) {\n    accessToken\n    user {\n      ...UserDetail\n    }\n  }\n}"): (typeof documents)["mutation RequestMagicLink($input: RequestMagicLinkInput!) {\n  requestMagicLink(input: $input) {\n    success\n    message\n    expiresInMinutes\n  }\n}\n\nmutation VerifyMagicLink($input: VerifyMagicLinkInput!) {\n  verifyMagicLink(input: $input) {\n    accessToken\n    user {\n      ...UserDetail\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...UserDetail\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...UserDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ContactCore on Contact {\n  id\n  name\n}\n\nfragment ContactContactInfo on Contact {\n  email\n  phone\n}\n\nfragment ContactBusinessInfo on Contact {\n  company\n  position\n}\n\nfragment ContactStatus on Contact {\n  status\n  priority\n}\n\nfragment ContactMetadata on Contact {\n  tags\n  notes\n}\n\nfragment ContactTimestamps on Contact {\n  createdAt\n  updatedAt\n  lastContactedAt\n}\n\nfragment ContactListItem on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactStatus\n  lastContactedAt\n}\n\nfragment ContactCard on Contact {\n  ...ContactListItem\n  ...ContactBusinessInfo\n  tags\n}\n\nfragment ContactDetail on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactBusinessInfo\n  ...ContactStatus\n  ...ContactMetadata\n  ...ContactTimestamps\n}"): (typeof documents)["fragment ContactCore on Contact {\n  id\n  name\n}\n\nfragment ContactContactInfo on Contact {\n  email\n  phone\n}\n\nfragment ContactBusinessInfo on Contact {\n  company\n  position\n}\n\nfragment ContactStatus on Contact {\n  status\n  priority\n}\n\nfragment ContactMetadata on Contact {\n  tags\n  notes\n}\n\nfragment ContactTimestamps on Contact {\n  createdAt\n  updatedAt\n  lastContactedAt\n}\n\nfragment ContactListItem on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactStatus\n  lastContactedAt\n}\n\nfragment ContactCard on Contact {\n  ...ContactListItem\n  ...ContactBusinessInfo\n  tags\n}\n\nfragment ContactDetail on Contact {\n  ...ContactCore\n  ...ContactContactInfo\n  ...ContactBusinessInfo\n  ...ContactStatus\n  ...ContactMetadata\n  ...ContactTimestamps\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation UpdateContact($id: String!, $input: UpdateContactInput!) {\n  updateContact(id: $id, input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation RemoveContact($id: String!) {\n  removeContact(id: $id) {\n    ...ContactCore\n  }\n}"): (typeof documents)["mutation CreateContact($input: CreateContactInput!) {\n  createContact(input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation UpdateContact($id: String!, $input: UpdateContactInput!) {\n  updateContact(id: $id, input: $input) {\n    ...ContactDetail\n  }\n}\n\nmutation RemoveContact($id: String!) {\n  removeContact(id: $id) {\n    ...ContactCore\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetContacts {\n  contacts {\n    ...ContactListItem\n  }\n}\n\nquery GetContact($id: String!) {\n  contact(id: $id) {\n    ...ContactDetail\n  }\n}"): (typeof documents)["query GetContacts {\n  contacts {\n    ...ContactListItem\n  }\n}\n\nquery GetContact($id: String!) {\n  contact(id: $id) {\n    ...ContactDetail\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetDashboardStats {\n  dashboardStats {\n    contacts {\n      total\n      active\n      leads\n      inactive\n    }\n    tasks {\n      total\n      pending\n      completed\n      highPriority\n    }\n    interactions {\n      total\n      thisWeek\n      thisMonth\n    }\n  }\n}"): (typeof documents)["query GetDashboardStats {\n  dashboardStats {\n    contacts {\n      total\n      active\n      leads\n      inactive\n    }\n    tasks {\n      total\n      pending\n      completed\n      highPriority\n    }\n    interactions {\n      total\n      thisWeek\n      thisMonth\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserCore on User {\n  id\n  email\n  name\n}\n\nfragment UserTimestamps on User {\n  createdAt\n  updatedAt\n}\n\nfragment UserDetail on User {\n  ...UserCore\n  ...UserTimestamps\n}"): (typeof documents)["fragment UserCore on User {\n  id\n  email\n  name\n}\n\nfragment UserTimestamps on User {\n  createdAt\n  updatedAt\n}\n\nfragment UserDetail on User {\n  ...UserCore\n  ...UserTimestamps\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;