import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const registerUserAsync = async (request: Request, response: Response, next: NextFunction) => {
    const {email, password} = request.body;

    if(!email || !password) {

    }

    
}

export const loginUserAsync = async (request: Request, response: Response, next: NextFunction) => {

}

export const logoutUserAsync = async (request: Request, response: Response, next: NextFunction) => {

}

export const verifyEmailAddress = async (request: Request, response: Response, next: NextFunction) => {

} 