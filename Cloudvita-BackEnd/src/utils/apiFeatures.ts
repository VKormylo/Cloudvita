import { Query, Aggregate } from 'mongoose'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/constants'

type QueryType = Query<any, any> | Aggregate<any[]>

class APIFeatures {
  query: QueryType
  queryString: any
  isAggregate: boolean

  constructor(query: QueryType, queryString: any) {
    this.query = query
    this.queryString = queryString
    this.isAggregate = query instanceof Aggregate
  }

  filter() {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    )
    const parsedQuery = JSON.parse(queryString)

    if (this.isAggregate) {
      ;(this.query as Aggregate<any[]>).pipeline().push({ $match: parsedQuery })
    } else {
      ;(this.query as Query<any, any>).find(parsedQuery)
    }

    return this
  }

  sort() {
    if (typeof this.queryString.sort === 'string') {
      const sortBy = this.queryString.sort.split(',').join(' ')

      if (this.isAggregate) {
        ;(this.query as Aggregate<any[]>)
          .pipeline()
          .push({ $sort: this.convertSort(sortBy) })
      } else {
        ;(this.query as Query<any, any>).sort(sortBy)
      }
    } else {
      if (this.isAggregate) {
        ;(this.query as Aggregate<any[]>)
          .pipeline()
          .push({ $sort: { lastViewed: -1 } })
      } else {
        ;(this.query as Query<any, any>).sort('-lastViewed')
      }
    }

    return this
  }

  limitFields() {
    if (typeof this.queryString.fields === 'string') {
      const fields = this.queryString.fields.split(',').join(' ')

      if (this.isAggregate) {
        const project: any = {}
        fields.split(' ').forEach((field: string) => {
          project[field] = 1
        })
        ;(this.query as Aggregate<any[]>).pipeline().push({ $project: project })
      } else {
        ;(this.query as Query<any, any>).select(fields)
      }
    } else {
      if (this.isAggregate) {
        ;(this.query as Aggregate<any[]>)
          .pipeline()
          .push({ $project: { __v: 0 } })
      } else {
        ;(this.query as Query<any, any>).select('-__v')
      }
    }

    return this
  }

  paginate() {
    const page = +(this.queryString.page as string) || DEFAULT_PAGE
    const limit = +(this.queryString.limit as string) || DEFAULT_LIMIT
    const skip = (page - 1) * limit

    if (this.isAggregate) {
      ;(this.query as Aggregate<any[]>)
        .pipeline()
        .push({ $skip: skip }, { $limit: limit })
    } else {
      ;(this.query as Query<any, any>).skip(skip).limit(limit)
    }

    return this
  }

  private convertSort(sortBy: string) {
    const sortFields: { [key: string]: 1 | -1 } = {}
    sortBy.split(' ').forEach((field) => {
      if (field.startsWith('-')) {
        sortFields[field.substring(1)] = -1
      } else {
        sortFields[field] = 1
      }
    })
    return sortFields
  }
}

export default APIFeatures
