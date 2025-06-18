import { Schema, model, models } from "mongoose";

const bikeDetailsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    type: {
      type: String, // e.g., Bike or Scooter
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    owners: {
      type: String,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    registration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    specifications: {
      type: Map,
      of: String, // key-value pairs for specifications
      required: true,
    },
    fileId: {
      type: [String], 
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const BikeDetails = models.BikeDetails || model("BikeDetails", bikeDetailsSchema);

export default BikeDetails;
