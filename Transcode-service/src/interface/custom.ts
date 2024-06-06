import { Request } from "express";

export interface CustomRequest extends Request {
    role?: string;
    userId?: string; 
}

export interface S3Params {
    Bucket: string;
    Key: string;
    Body: any;
    ContentType: any;
  }