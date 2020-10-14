import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string,

  userName: string

  password: string

  role: string

  status: boolean

}
