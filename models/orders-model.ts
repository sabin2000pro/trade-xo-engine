import mongoose from 'mongoose';

export type OrderType = ''
export type OrderStatus = ''

export interface IOrders {

}

export interface IOrderDocument extends IOrders, Document {}

export const OrderSchema = new mongoose.Schema<IOrders>({

})

const Order = mongoose.model('Order', OrderSchema);
export default Order;