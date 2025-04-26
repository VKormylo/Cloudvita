import mongoose from 'mongoose'
import { NextFunction, Response } from 'express'
import { LocationDocument, LocationInterface } from '../types/location.types'
import Location from '../models/location'
import User from '../models/user'
import APIFeatures from '../utils/apiFeatures'
import { catchAsync } from '../utils/catchAsync'
import { ErrorResponse } from '../types/error.types'
import { CustomRequest } from '../types/common.types'
import { UserDocument } from '../types/user.types'

export const getLocations = catchAsync(
  async (req: CustomRequest<UserDocument>, res: Response) => {
    const locationIds = req.user!.savedLocations.map(
      (location) => location.locationId
    )

    const userId = req.user?.id

    const features = new APIFeatures(
      Location.aggregate([
        {
          $match: { _id: { $in: locationIds } }
        },
        {
          $lookup: {
            from: 'users',
            let: { locationId: '$_id' },
            pipeline: [
              { $match: { _id: new mongoose.Types.ObjectId(String(userId)) } },
              { $unwind: '$savedLocations' },
              {
                $match: {
                  $expr: { $eq: ['$savedLocations.locationId', '$$locationId'] }
                }
              },
              {
                $project: {
                  _id: 0,
                  lastViewed: '$savedLocations.lastViewed'
                }
              }
            ],
            as: 'lastViewedData'
          }
        },
        {
          $addFields: {
            lastViewed: { $arrayElemAt: ['$lastViewedData.lastViewed', 0] }
          }
        },
        {
          $unset: 'lastViewedData'
        }
      ]),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const locations: LocationDocument[] = await features.query

    res.status(200).json({
      status: 'success',
      data: {
        locations,
        count: locations.length
      }
    })
  }
)

export const getLocation = catchAsync(
  async (
    req: CustomRequest<UserDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id
    const locationId = req.params.id

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { 'savedLocations.$[elem].lastViewed': req.body.lastViewed }
      },
      {
        arrayFilters: [{ 'elem.locationId': locationId }],
        new: true,
        runValidators: true
      }
    ).populate({
      path: 'savedLocations.locationId',
      select: 'id city country coordinates'
    })

    const location = user?.savedLocations
      .map((location) => ({
        ...(location.locationId as unknown as LocationDocument).toObject(),
        lastViewed: location.lastViewed
      }))
      .find((location) => location._id.toString() === locationId)

    if (!location) {
      return next(new ErrorResponse('No location found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        location
      }
    })
  }
)

export const createLocation = catchAsync(
  async (req: CustomRequest<UserDocument>, res: Response) => {
    const data = req.body as LocationInterface
    const userId = req.user?.id

    let location: LocationDocument | null = await Location.findOne({
      'coordinates.lat': data.coordinates.lat,
      'coordinates.lon': data.coordinates.lon
    })

    if (!location) {
      location = await Location.create(data)
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { savedLocations: { locationId: location._id } }
      },
      { new: true }
    )

    const savedLocation = user?.savedLocations.find(
      (item) => item.locationId.toString() === location._id.toString()
    )

    res.status(201).json({
      status: 'success',
      data: {
        location: {
          ...location.toObject(),
          lastViewed: savedLocation?.lastViewed
        }
      }
    })
  }
)

export const updateLocation = catchAsync(
  async (
    req: CustomRequest<UserDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id
    const locationId = req.params.id

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { 'savedLocations.$[elem].lastViewed': req.body.lastViewed }
      },
      {
        arrayFilters: [{ 'elem.locationId': locationId }],
        new: true,
        runValidators: true
      }
    ).populate({
      path: 'savedLocations.locationId',
      select: 'id city country coordinates'
    })

    const location = user?.savedLocations
      .map((location) => ({
        ...(location.locationId as unknown as LocationDocument).toObject(),
        lastViewed: location.lastViewed
      }))
      .find((location) => location._id.toString() === locationId)

    if (!location) {
      return next(new ErrorResponse('No location found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        location
      }
    })
  }
)

export const deleteLocation = catchAsync(
  async (
    req: CustomRequest<UserDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id
    const locationId = req.params.id

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { savedLocations: { locationId: locationId } }
      }
    )

    const usersWithLocation = await User.findOne({
      'savedLocations.locationId': locationId
    })

    if (!usersWithLocation) {
      const location = await Location.findOneAndDelete({
        _id: locationId
      })

      if (!location) {
        return next(new ErrorResponse('No location found with that ID', 404))
      }
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
  }
)
