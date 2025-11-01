import { PartialType, InputType } from '@nestjs/graphql';
import { CreateInteractionInput } from './create-interaction.input';

@InputType()
export class UpdateInteractionInput extends PartialType(
  CreateInteractionInput,
) {}
