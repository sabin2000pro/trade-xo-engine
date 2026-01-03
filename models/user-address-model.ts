import mongoose from "mongoose";
import { IAddress } from "../interfaces/address-interface";

export const AddressSchema = new mongoose.Schema<IAddress>({

  line1: {
    type: String,
    default: ''
  },

  line2: {
    type: String,
    default: ''
  },

  city: {
    type: String,
    required: [true, "Please specify the city that the user resides in"],
    default: "",
  },

  postalCode: {
    type: String,
    min: [5, "The postal code must have at least 5 characters"],
    max: [15, "The postal code must not exceed 15 characters"],
    default: "",
    required: [true, "Please specify the users postal code"],
  },

  country: {
    type: String,
    default: "",
    required: [true, "Please specify the users country of residence"],
  },

  countryCode: {

    type: String,
    default: "",

    required: [true,"Please provide the country code for the country of residence",
    ],

  },
});