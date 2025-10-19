import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, { description: 'Health check endpoint' })
  hello(): string {
    return 'Hello from FirstTx CRM!';
  }
}
