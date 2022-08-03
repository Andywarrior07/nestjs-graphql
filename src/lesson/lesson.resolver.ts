import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { AssignStudentsToLessonInput } from './AssignStudentsToLessonInput.input';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.schema';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly studentsService: StudentService,
    private readonly service: LessonService,
  ) {}

  @Query((returns) => [LessonType])
  getLessons() {
    return this.service.getLessons();
  }

  @Query((returns) => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.service.getLessonById(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.service.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.service.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this.studentsService.getManyStudents(lesson.students);
  }
}
