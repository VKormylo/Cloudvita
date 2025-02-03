import { Schema, model } from 'mongoose'
import { LocationDocument } from '../types/location.types'
import ModelsEnum from '../constants/models'

const locationSchema = new Schema<LocationDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelsEnum.USER,
    required: [true, 'A location must belong to a user'],
    select: false
  },
  city: {
    type: String,
    required: [true, 'A location must have a city'],
    unique: true
  },
  country: {
    type: String,
    required: [true, 'A location must have a country']
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, 'A location must have a latitude'],
      min: -90,
      max: 90
    },
    lon: {
      type: Number,
      required: [true, 'A location must have a longitude'],
      min: -180,
      max: 180
    }
  },
  lastViewed: {
    type: Date,
    required: [true, 'A location must have a last viewed date'],
    default: Date.now
  }
})

export default model<LocationDocument>(ModelsEnum.LOCATION, locationSchema)
