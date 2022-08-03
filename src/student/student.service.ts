import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentInput } from './student.input';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly model: Model<StudentDocument>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.model.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return await this.model.findById(id);
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = new this.model(createStudentInput);

    await student.save();

    return student;
  }

  async getManyStudents(studentsIds: any[]): Promise<Student[]> {
    return this.model.find({
      _id: { $in: studentsIds },
    });
  }
}
