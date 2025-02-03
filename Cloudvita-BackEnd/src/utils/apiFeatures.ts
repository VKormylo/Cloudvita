import { Query } from 'mongoose'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/constants'

class APIFeatures {
  query: Query<any, any>
  queryString: any

  constructor(query: Query<any, any>, queryString: any) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryString))
    return this
  }

  sort() {
    if (typeof this.queryString.sort === 'string') {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-lastViewed')
    }
    return this
  }

  limitFields() {
    if (typeof this.queryString.fields === 'string') {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paginate() {
    const page = +(this.queryString.page as string) || DEFAULT_PAGE
    const limit = +(this.queryString.limit as string) || DEFAULT_LIMIT
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

export default APIFeatures
