import React from 'react'
import { render } from 'react-dom'
import './styles/index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import { AUTH_TOKEN } from './constants'

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareAuthLink.concat(httpLink),
  cache: new InMemoryCache()
})

render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
