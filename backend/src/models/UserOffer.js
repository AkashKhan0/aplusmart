import mongoose from "mongoose";


const UserOfferSchema = new mongoose.Schema(
{
image: { type: String, required: true },
title: { type: String, required: true },
subtitle: { type: String, required: true },
buttonUrl: { type: String, required: true },
},
{ timestamps: true }
);


export default mongoose.models.UserOffer ||
mongoose.model("UserOffer", UserOfferSchema);