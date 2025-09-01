import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const registerUserAsync = expressAsyncHandler(async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const { email, username, password } = request.body;

  return response.status(200).json({success: true, message: 'Register User Endpoint', data: {} })
})

export const loginUserAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'Login User Here', user: {}, token: null})
})

export const logoutUserAsync = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

export const verifyEmailAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

export const logoutAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})

export const forgotPasswordAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})

export const resetPasswordAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})

export const getLoggedInUserAsync = expressAsyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})