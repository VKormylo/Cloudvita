import { NextFunction, Request, RequestHandler, Response } from 'express'
import { LocationInterface } from '../types/location.types'
import Location from '../models/location'
import APIFeatures from '../utils/apiFeatures'
import { catchAsync } from '../utils/catchAsync'
import { ErrorResponse } from '../types/error.types'
import { CustomRequest } from '../types/common.types'
import { UserDocument } from '../types/user.types'

export const getLocations = catchAsync(
  async (req: CustomRequest<UserDocument>, res: Response) => {
    const userId = req.user?.id
    const features = new APIFeatures(Location.find({ userId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const locations: LocationInterface[] = await features.query

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
    const location: LocationInterface | null = await Location.findOneAndUpdate(
      {
        _id: req.params.id,
        userId
      },
      { lastViewed: req.body.lastViewed },
      {
        new: true,
        runValidators: true
      }
    )

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
    const location: LocationInterface = await Location.create({
      ...data,
      userId
    })

    res.status(201).json({
      status: 'success',
      data: {
        location
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
    const location: LocationInterface | null = await Location.findOneAndUpdate(
      { _id: req.params.id, userId },
      { lastViewed: req.body.lastViewed },
      {
        new: true,
        runValidators: true
      }
    )

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
    const location: LocationInterface | null = await Location.findOneAndDelete({
      _id: req.params.id,
      userId
    })

    if (!location) {
      return next(new ErrorResponse('No location found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
  }
)
