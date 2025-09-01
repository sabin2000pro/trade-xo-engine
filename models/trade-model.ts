import mongoose from 'mongoose'

export type TradeSide = "BUY" | "SELL"
export type TradeRole = "MAKER" | "TAKER" // has the trade taken or provided liquidity
export type TradeType = "LIMIT" | "MARKET" | "STOP" | "STOP_LIMIT" // Order type that triggered the trade
export type TradeStatus = "PENDING" | "FILLED" | "PARTIALLY_FILLED" | "CANCELLED" | "SETTLED" // Execution state of the trade


export interface ITrade {

}

export interface ITradeDocument extends ITrade, Document {

}

export const TradeSchema = new mongoose.Schema({

})

const Trade = mongoose.model('Trade', TradeSchema);
export default Trade;