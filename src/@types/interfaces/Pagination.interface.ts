export interface IPluginOptions {
  dontReturnTotalDocs?: boolean // Don't return the total number of results for the given query
  dontAllowUnlimitedResults?: boolean // Don't allow unlimited results
  defaultLimit?: number // A default limit instead of 10
}

export interface IPaginateOptions {
  limit: Number // The page size. Set 0 for no limit.
  sortField: String // The field name to query the range for. The field must be:
  /*
      1. Orderable. We must sort by this value. If duplicate values for paginatedField field
        exist, the results will be secondarily ordered by the _id.
      2. Indexed. For large collections, this should be indexed for query performance.
      3. Immutable. If the value changes between paged queries, it could appear twice.
      4. Complete. A value must exist for all documents.
    The default is to use the Mongo built-in '_id' field, which satisfies the above criteria.
    The only reason to NOT use the Mongo _id field is if you chose to implement your own ids.
  */
  sortAscending: Boolean // True to sort using paginatedField ascending (default is false - descending).
  next: String // The value to start querying the page.
  previous: String // The value to start querying previous page.
}

export interface IPaginateResult<T> {
  hasNext: Boolean // hasNext is true if there is a next page
  hasPrevious: Boolean // hasPrevious is true if there is a previous page
  next: String // next is the cursor for the next page
  previous: String // previous is the cursor for the previous page
  totalDocs: Number // totalDocs is the total amount of docs for the query
  docs: T[] // docs are the resulting documents for this page
}