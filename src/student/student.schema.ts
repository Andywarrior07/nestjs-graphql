import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema()
export class Student {
  @Transform((value) => value.obj._id.stoString())
  _id: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  lastName: string;
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
