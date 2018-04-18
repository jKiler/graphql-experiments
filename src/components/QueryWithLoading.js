import React from 'react'
import { Query } from 'react-apollo'
import { get } from 'lodash'

export const QueryWithLoading = ({ children, query, dataPath }) => (
  <Query query={query}>
  {/* TODO: create a loading component */}
    {({ loading, data }) => loading ? <div>Loading</div> : children(get(data, dataPath))}
  </Query>
)
