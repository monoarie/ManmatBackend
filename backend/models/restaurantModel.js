import mongoose from 'mongoose'

const restaurantSchema = mongoose.Schema(
  {
    restaurantName: {
      type: String
    },
    image: {
      type: String
    },
    label: {
      type: String
    },
    discount: {
      type: String
    },
    address: {
      type: String
    },
    rate: {
      type: Number,
      default: 0.0
    },
    description: {
      type: String
    },
    review: {
      type: String
    },
    isRecommended: {
      type: Boolean
    },
    placeNum: {
      type: Number
    }
  }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant