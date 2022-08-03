import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @IsString()
  @MinLength(4)
  @Field()
  name: string;

  @IsString()
  @MinLength(4)
  @Field()
  lastName: string;
}
