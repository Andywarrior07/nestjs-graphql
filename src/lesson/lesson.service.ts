import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonInput } from './lesson.input';
import { Lesson, LessonDocument } from './lesson.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private readonly model: Model<LessonDocument>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return await this.model.find().populate('students');
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this.model.findById(id);
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = new this.model(createLessonInput);

    await lesson.save();

    return lesson;
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.model.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException();
    }

    return await this.model.findByIdAndUpdate(
      lessonId,
      {
        students: [...lesson.students, ...studentIds],
      },
      { new: true },
    );
  }
}
