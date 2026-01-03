import mongoose from 'mongoose';

export const MarginCallSchema = new mongoose.Schema({
    
}, {timestamps: true})

export const MarginCall = new mongoose.Model('MarginCall', MarginCallSchema);