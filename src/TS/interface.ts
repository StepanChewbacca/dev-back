import  { Request } from 'express';

export interface IRequest extends Request {
    file: TFiles
}

export type TFiles = {
    fieldname: string,
    originalname:string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename:string,
    path: string,
    size: number
}

export type TImageData = {
    ETag: string,
    Location: string,
    key: string,
    Bucket: string
}
