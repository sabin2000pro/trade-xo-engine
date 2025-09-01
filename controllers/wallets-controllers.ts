import expressAsyncHandler from "express-async-handler";
import Wallet from "../models/wallet-model";
import { NextFunction, Request, Response } from "express";

// Returns all of the Wallets asynchronously
export const fetchAllWalletsAsync = expressAsyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    return response.status(200).json({ success: true, message: "All Wallets" });
  }
);

// Returns a single wallet by ID asynchronously
export const fetchWalletByIdAsync = expressAsyncHandler(
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    return response
      .status(200)
      .json({ success: true, message: "Fetch Wallet By Id Async" });
  }
);

// Creates a new Wallet for the user to deposit funds
export const createWalletAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;

    return response
      .status(200)
      .json({ success: true, message: "Create new Wallet" });
  }
);

export const updateWalletMetaAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const deleteWalletByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const freezeWalletByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const unfreezeWalletByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const fetchWalletBalanceByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const creditWalletByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const debitWalletByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const lockWalletFundsByIdAsync = expressAsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {}
);

export const generateWalletAddressByIdAsync = expressAsyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {}
  );