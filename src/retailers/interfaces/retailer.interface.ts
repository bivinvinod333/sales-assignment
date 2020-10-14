import { Document } from 'mongoose';

export interface RetailerInterface extends Document {
  name: string,

  userName: string

  password: string

  role: string

  status: boolean

}
