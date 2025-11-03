/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Contact = {
  __typename?: 'Contact';
  company?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interactions: Array<Interaction>;
  lastContactedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  priority: ContactPriority;
  status: ContactStatus;
  tags: Array<Scalars['String']['output']>;
  tasks: Array<Task>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum ContactPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export enum ContactStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Lead = 'LEAD',
  Lost = 'LOST'
}

export type ContactsStats = {
  __typename?: 'ContactsStats';
  /** Number of active contacts */
  active: Scalars['Int']['output'];
  /** Number of inactive contacts */
  inactive: Scalars['Int']['output'];
  /** Number of lead contacts */
  leads: Scalars['Int']['output'];
  /** Total number of contacts */
  total: Scalars['Int']['output'];
};

export type CreateContactInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  lastContactedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<ContactPriority>;
  status?: InputMaybe<ContactStatus>;
  tags?: Array<Scalars['String']['input']>;
};

export type CreateInteractionInput = {
  contactId: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  type: InteractionType;
};

export type CreateTaskInput = {
  contactId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  /** Contacts statistics */
  contacts: ContactsStats;
  /** Interactions statistics */
  interactions: InteractionsStats;
  /** Tasks statistics */
  tasks: TasksStats;
};

export type Interaction = {
  __typename?: 'Interaction';
  contact: Contact;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  type: InteractionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type InteractionFiltersInput = {
  contactId?: InputMaybe<Scalars['String']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  sortBy?: InputMaybe<InteractionSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  type?: InputMaybe<InteractionType>;
};

export enum InteractionSortField {
  CreatedAt = 'CREATED_AT',
  Date = 'DATE',
  Type = 'TYPE'
}

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Note = 'NOTE'
}

export type InteractionsStats = {
  __typename?: 'InteractionsStats';
  /** Number of interactions this month */
  thisMonth: Scalars['Int']['output'];
  /** Number of interactions this week */
  thisWeek: Scalars['Int']['output'];
  /** Total number of interactions */
  total: Scalars['Int']['output'];
};

export type MagicLinkResponse = {
  __typename?: 'MagicLinkResponse';
  expiresInMinutes?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact: Contact;
  createInteraction: Interaction;
  createTask: Task;
  removeContact: Contact;
  removeInteraction: Interaction;
  removeTask: Task;
  requestMagicLink: MagicLinkResponse;
  updateContact: Contact;
  updateInteraction: Interaction;
  updateTask: Task;
  verifyMagicLink: AuthResponse;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateInteractionArgs = {
  input: CreateInteractionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationRemoveContactArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveInteractionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationRequestMagicLinkArgs = {
  input: RequestMagicLinkInput;
};


export type MutationUpdateContactArgs = {
  id: Scalars['String']['input'];
  input: UpdateContactInput;
};


export type MutationUpdateInteractionArgs = {
  id: Scalars['String']['input'];
  input: UpdateInteractionInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['String']['input'];
  input: UpdateTaskInput;
};


export type MutationVerifyMagicLinkArgs = {
  input: VerifyMagicLinkInput;
};

export type Query = {
  __typename?: 'Query';
  contact: Contact;
  contacts: Array<Contact>;
  /** Get dashboard statistics for the current user */
  dashboardStats: DashboardStats;
  /** Health check endpoint */
  hello: Scalars['String']['output'];
  interaction: Interaction;
  interactions: Array<Interaction>;
  me: User;
  task: Task;
  tasks: Array<Task>;
};


export type QueryContactArgs = {
  id: Scalars['String']['input'];
};


export type QueryInteractionArgs = {
  id: Scalars['String']['input'];
};


export type QueryInteractionsArgs = {
  filters?: InputMaybe<InteractionFiltersInput>;
};


export type QueryTaskArgs = {
  id: Scalars['String']['input'];
};


export type QueryTasksArgs = {
  filters?: InputMaybe<TaskFiltersInput>;
};

export type RequestMagicLinkInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  contact?: Maybe<Contact>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type TaskFiltersInput = {
  contactId?: InputMaybe<Scalars['String']['input']>;
  dueDateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dueDateTo?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<TaskPriority>;
  sortBy?: InputMaybe<TaskSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<TaskStatus>;
};

export enum TaskPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export enum TaskSortField {
  CreatedAt = 'CREATED_AT',
  DueDate = 'DUE_DATE',
  Priority = 'PRIORITY',
  Status = 'STATUS'
}

export enum TaskStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type TasksStats = {
  __typename?: 'TasksStats';
  /** Number of completed tasks */
  completed: Scalars['Int']['output'];
  /** Number of high priority tasks */
  highPriority: Scalars['Int']['output'];
  /** Number of pending tasks (TODO + IN_PROGRESS) */
  pending: Scalars['Int']['output'];
  /** Total number of tasks */
  total: Scalars['Int']['output'];
};

export type UpdateContactInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  lastContactedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<ContactPriority>;
  status?: InputMaybe<ContactStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateInteractionInput = {
  contactId?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
};

export type UpdateTaskInput = {
  contactId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interactions?: Maybe<Array<Interaction>>;
  name?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type VerifyMagicLinkInput = {
  token: Scalars['String']['input'];
};

export type RequestMagicLinkMutationVariables = Exact<{
  input: RequestMagicLinkInput;
}>;


export type RequestMagicLinkMutation = { __typename?: 'Mutation', requestMagicLink: { __typename?: 'MagicLinkResponse', success: boolean, message: string, expiresInMinutes?: number | null } };

export type VerifyMagicLinkMutationVariables = Exact<{
  input: VerifyMagicLinkInput;
}>;


export type VerifyMagicLinkMutation = { __typename?: 'Mutation', verifyMagicLink: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', id: string, email: string, name?: string | null, createdAt: any, updatedAt: any } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, name?: string | null, createdAt: any, updatedAt: any } };

export type ContactCoreFragment = { __typename?: 'Contact', id: string, name: string };

export type ContactContactInfoFragment = { __typename?: 'Contact', email?: string | null, phone?: string | null };

export type ContactBusinessInfoFragment = { __typename?: 'Contact', company?: string | null, position?: string | null };

export type ContactStatusFragment = { __typename?: 'Contact', status: ContactStatus, priority: ContactPriority };

export type ContactMetadataFragment = { __typename?: 'Contact', tags: Array<string>, notes?: string | null };

export type ContactTimestampsFragment = { __typename?: 'Contact', createdAt: any, updatedAt: any, lastContactedAt?: any | null };

export type ContactListItemFragment = { __typename?: 'Contact', lastContactedAt?: any | null, id: string, name: string, email?: string | null, phone?: string | null, status: ContactStatus, priority: ContactPriority };

export type ContactCardFragment = { __typename?: 'Contact', tags: Array<string>, lastContactedAt?: any | null, company?: string | null, position?: string | null, id: string, name: string, email?: string | null, phone?: string | null, status: ContactStatus, priority: ContactPriority };

export type ContactDetailFragment = { __typename?: 'Contact', id: string, name: string, email?: string | null, phone?: string | null, company?: string | null, position?: string | null, status: ContactStatus, priority: ContactPriority, tags: Array<string>, notes?: string | null, createdAt: any, updatedAt: any, lastContactedAt?: any | null };

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', id: string, name: string, email?: string | null, phone?: string | null, company?: string | null, position?: string | null, status: ContactStatus, priority: ContactPriority, tags: Array<string>, notes?: string | null, createdAt: any, updatedAt: any, lastContactedAt?: any | null } };

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'Contact', id: string, name: string, email?: string | null, phone?: string | null, company?: string | null, position?: string | null, status: ContactStatus, priority: ContactPriority, tags: Array<string>, notes?: string | null, createdAt: any, updatedAt: any, lastContactedAt?: any | null } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', removeContact: { __typename?: 'Contact', id: string, name: string } };

export type GetContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', lastContactedAt?: any | null, id: string, name: string, email?: string | null, phone?: string | null, status: ContactStatus, priority: ContactPriority }> };

export type GetContactQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', id: string, name: string, email?: string | null, phone?: string | null, company?: string | null, position?: string | null, status: ContactStatus, priority: ContactPriority, tags: Array<string>, notes?: string | null, createdAt: any, updatedAt: any, lastContactedAt?: any | null } };

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', dashboardStats: { __typename?: 'DashboardStats', contacts: { __typename?: 'ContactsStats', total: number, active: number, leads: number, inactive: number }, tasks: { __typename?: 'TasksStats', total: number, pending: number, completed: number, highPriority: number }, interactions: { __typename?: 'InteractionsStats', total: number, thisWeek: number, thisMonth: number } } };

export type UserCoreFragment = { __typename?: 'User', id: string, email: string, name?: string | null };

export type UserTimestampsFragment = { __typename?: 'User', createdAt: any, updatedAt: any };

export type UserDetailFragment = { __typename?: 'User', id: string, email: string, name?: string | null, createdAt: any, updatedAt: any };

export const ContactCoreFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ContactCoreFragment, unknown>;
export const ContactContactInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<ContactContactInfoFragment, unknown>;
export const ContactStatusFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]} as unknown as DocumentNode<ContactStatusFragment, unknown>;
export const ContactListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]} as unknown as DocumentNode<ContactListItemFragment, unknown>;
export const ContactBusinessInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<ContactBusinessInfoFragment, unknown>;
export const ContactCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactListItem"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactBusinessInfo"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]} as unknown as DocumentNode<ContactCardFragment, unknown>;
export const ContactMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<ContactMetadataFragment, unknown>;
export const ContactTimestampsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}}]} as unknown as DocumentNode<ContactTimestampsFragment, unknown>;
export const ContactDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactBusinessInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactTimestamps"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}}]} as unknown as DocumentNode<ContactDetailFragment, unknown>;
export const UserCoreFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserCoreFragment, unknown>;
export const UserTimestampsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserTimestampsFragment, unknown>;
export const UserDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserTimestamps"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserDetailFragment, unknown>;
export const RequestMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestMagicLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"expiresInMinutes"}}]}}]}}]} as unknown as DocumentNode<RequestMagicLinkMutation, RequestMagicLinkMutationVariables>;
export const VerifyMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyMagicLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetail"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserTimestamps"}}]}}]} as unknown as DocumentNode<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserTimestamps"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CreateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactBusinessInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactTimestamps"}}]}}]} as unknown as DocumentNode<CreateContactMutation, CreateContactMutationVariables>;
export const UpdateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactBusinessInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactTimestamps"}}]}}]} as unknown as DocumentNode<UpdateContactMutation, UpdateContactMutationVariables>;
export const RemoveContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<RemoveContactMutation, RemoveContactMutationVariables>;
export const GetContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}}]} as unknown as DocumentNode<GetContactsQuery, GetContactsQueryVariables>;
export const GetContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactDetail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactCore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactContactInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactBusinessInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactTimestamps"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastContactedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactCore"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactContactInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactBusinessInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactStatus"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactTimestamps"}}]}}]} as unknown as DocumentNode<GetContactQuery, GetContactQueryVariables>;
export const GetDashboardStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"inactive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"highPriority"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"thisWeek"}},{"kind":"Field","name":{"kind":"Name","value":"thisMonth"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;