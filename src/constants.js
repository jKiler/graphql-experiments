import gql from 'graphql-tag'

export const AUTH_TOKEN = 'auth-token'

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signupMutation($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!) {
    signup(email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName) {
      token
    }
  }
`
