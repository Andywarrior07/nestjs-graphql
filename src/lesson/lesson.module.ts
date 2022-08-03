import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from 'src/student/student.module';
import { Student, StudentSchema } from 'src/student/student.schema';
import { StudentService } from 'src/student/student.service';
import { LessonResolver } from './lesson.resolver';
import { Lesson, LessonSchema } from './lesson.schema';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    StudentModule,
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
