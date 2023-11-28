import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })

export class User {
  @Prop({ required: true, unique: true, trim: true })
  email: string

  @Prop({ required: true, trim: true })
  password: string

  @Prop({ required: true, trim: true })
  name: string

  @Prop({ required: true, trim: true })
  username: string

  @Prop({ default: 'user' })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)