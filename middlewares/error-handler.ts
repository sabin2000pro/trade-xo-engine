import { NextFunction, Request, Response } from "express";

export const errorHandler = async (error: any, request: Request, response: Response, next: NextFunction) => {
    let err = {...error};
}