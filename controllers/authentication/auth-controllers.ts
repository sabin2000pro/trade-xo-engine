import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/users-model";

export const registerUserAsync = expressAsyncHandler(async (
  request: Request,
  response: Response,
  next?: NextFunction
): Promise<any> => {
  const { email, username, password } = request.body;

  if(!email || !username || !password) {
    return response.status(400).json({success: false, message: 'Please provide a valid e-mail / username or password'})
  }

  const createdUser = await User.create({email, username, password});
  await createdUser.save();

  return response.status(200).json({success: true, message: 'Registered Successfully', data: createdUser })
})

export const loginUserAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Login User Here', user: {}, token: null})
})

export const logoutUserAsync = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

export const logoutAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Logout User Here', user: {}, token: null})
})

export const forgotPasswordAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Forgot Password Here', user: {}, token: null})

})

export const resetPasswordAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Reset Password Endpoint' , user: {}, token: null})
})

export const getLoggedInUserAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Get Logged In User Endpoint Here' , user: {}, token: null})
})

export const verifyEmailAddress = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

export const resendEmailVerification = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Resend e-mail verification here' , data: {} })
})

export const updatePasswordAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Update user password here' , data: {} })
})