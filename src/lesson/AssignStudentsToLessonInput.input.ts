import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignStudentsToLessonInput {
  @Field((type) => [ID])
  studentIds: string[];

  @Field((type) => ID)
  lessonId: string;
}
