import { Document } from 'mongoose';
import { User } from './user';


export interface Product extends Document {
  owner: User;
  title: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  strength: string;
  nicotine: number;
  pounches: number;
  size: string;
  types: string;
  created: Date;
}
