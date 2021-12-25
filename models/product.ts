import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  picture: String,
  price: Number,
  stock: Number,
});

productSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
