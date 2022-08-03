import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class Lesson {
  @Transform((value) => value.obj._id.stoString())
  _id: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Student' }])
  students: ObjectId[];

  @Prop({
    type: String,
  })
  startDate: string;

  @Prop({
    type: String,
  })
  endDate: string;
}

export type LessonDocument = Lesson & Document;
export const LessonSchema = SchemaFactory.createForClass(Lesson);
