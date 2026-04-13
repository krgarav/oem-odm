import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    image: String,
    shades: [String],
    colors: [String],
  },
  { timestamps: true }
)

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)