import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  id: String,
  advertiser: String,
  creativeUrl: String,
  bidAmount: Number,
  impressions: { type: Number, default: 0 },
});

const Ad = mongoose.model('Ad', adSchema);

export default Ad;
