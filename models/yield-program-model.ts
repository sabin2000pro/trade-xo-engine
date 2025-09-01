import mongoose from 'mongoose';

export interface IYieldProgram {
    programId: number
    networkId: number
    name: string
    assetId: number
    strategyId: number
    minDeposit: number
    isOpen: boolean
}