import { Request } from 'express'
import { ICourseDocument } from "./course.js";
import { IUser } from './user.js';

export interface LoginBody { 
    email: string; 
    password: string 
}

export interface RegisterBody { 
    email: string;
    password: string;
    name: string
}

export interface ResetBody { 
    email: string
}

export interface NewPasswordBody { 
    password: string;
    userId: string;
    token: string
}

export interface PopulatedCartItem {
  courseId: ICourseDocument
  count: number
}

export interface CartCourse extends Partial<ICourseDocument> {
  id: string
  count: number
  price: number
}

export interface EditCourseBody {
  id: string
  title: string
  price: number
  img: string
}

export interface  MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export type ProfileBody = Pick<IUser, 'name' | 'avatarUrl'>

export interface ProfileRequest extends Request<{}, {}, ProfileBody> {
  file?: MulterFile;
}