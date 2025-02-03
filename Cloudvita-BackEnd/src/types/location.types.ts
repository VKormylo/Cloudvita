import { Document, ObjectId } from 'mongoose'

interface LocationCoordinates {
  lat: number
  lon: number
}

export interface LocationDocument extends Document {
  userId: ObjectId
  city: string
  country: string
  coordinates: LocationCoordinates
  lastViewed: Date
}

export interface LocationInterface {
  userId: ObjectId
  city: string
  country: string
  coordinates: LocationCoordinates
  lastViewed: Date
}
