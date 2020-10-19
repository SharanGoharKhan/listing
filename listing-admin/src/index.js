/* eslint-disable camelcase */
import {
  ApolloClient, ApolloProvider,

  InMemoryCache
} from '@apollo/client'
import 'assets/scss/argon-dashboard-react.scss'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'firebase/messaging'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { server_url } from './config/config'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: `${server_url}graphql`,
  cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
