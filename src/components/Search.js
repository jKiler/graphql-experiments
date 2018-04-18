import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { User } from './User'

export const Search = ({ filter }) => (
  <Query query={FEED_SEARCH_QUERY} variables={{ filter }}>
  {({ loading, error, data }) => (
    (filter) ? 
    (data.feed.users.map((user, index) => (
      <User key={user.id} user={user} index={index}/>
    ))) : ''
  )}
  </Query>
)

const FEED_SEARCH_QUERY = gql`
  {
    feed(filter: $filter) {
      users {
        firstName
        lastName
        email
      }
    }
  }
`