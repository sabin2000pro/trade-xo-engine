import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllUsersAsync = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(200).json({success: true, message: 'All Users Here'})
})

export const fetchUserByIdAsync = asyncHandler(async(request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {id} = request.params;
    return response.status(200).json({success: true, message: 'All Users Here'})
})

export const createNewUserAsync = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;
    return response.status(200).json({success: true, message: 'All Users Here'})
})

export const editUserByIdAsync = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {userId} = request.params;
    return response.status(200).json({success: true, message: 'All Users Here'})
})

export const deleteAllUsersAsync = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})

export const deleteUserByIdAsync = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {

})

