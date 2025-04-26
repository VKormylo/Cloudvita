import { Document, ObjectId } from 'mongoose'

interface LocationCoordinates {
  lat: number
  lon: number
}

export interface LocationDocument extends Document<ObjectId> {
  city: string
  country: string
  coordinates: LocationCoordinates
}

export interface LocationInterface {
  _id: ObjectId
  city: string
  country: string
  coordinates: LocationCoordinates
}
