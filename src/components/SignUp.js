import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { withStyles } from 'material-ui/styles'
import { Typography, Button } from 'material-ui'
import Form from './Form'
import { get } from 'lodash'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'start',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    }
  }

  render() {
    const { email, password, confirmPassword, firstName, lastName } = this.state
    const { classes } = this.props
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signupMutation, { error, data }) => {
          return (
            <Fragment>
              <Typography className={classes.typography} variant='headline' gutterBottom color='primary'>
                Sign Up
              </Typography>
              <Typography className={classes.typography} variant='caption' gutterBottom>
                Sign up below to create an account
              </Typography>
              <div className={classes.container}>
                <Form error={error} field={firstName} fieldString='firstName' type='text' onChange={(e) => this.setState({ firstName: e.target.value })}>
                  First name
                </Form>
                <Form error={error} field={lastName} fieldString='lastName' type='text' onChange={(e) => this.setState({ lastName: e.target.value })}>
                  Last name
                </Form>
              </div>
              <div className={classes.container}>
                <Form error={error} field={email} fieldString='email' type='email' onChange={(e) => this.setState({ email: e.target.value })}>
                  Email
                </Form>
              </div>
              <div className={classes.container}>
                <Form error={error} field={password} fieldString='password' type='password' onChange={(e) => this.setState({ password: e.target.value })}>
                  Password
                </Form>
                <Form error={error} field={confirmPassword} fieldString='confirmPassword' type='password' onChange={(e) => this.setState({ confirmPassword: e.target.value })}>
                  Confirm password
                </Form>
              </div>
              <div className={classes.buttonContainer}>
                <Button className={classes.button} variant='raised' color='primary'
                  onClick={async (e) => {
                    const token = get(await signupMutation(), 'signup.token')
                    this._saveUserData(token)
                    this.props.history.push('/')                   
                  }}
                >
                  sign up
                </Button>
                <Button className={classes.button} color='primary' component={Link} to='/login'>
                  login
                </Button>
              </div>
            </Fragment>
          )
        }}
      </Mutation>
    )
  }

  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const SIGNUP_MUTATION = gql`
  mutation signupMutation($email: String!, $password: String!, $confirmPassword: String!, $firstName: String!, $lastName: String!) {
    signup(email: $email, password: $password, confirmPassword: $confirmPassword, firstName: $firstName, lastName: $lastName) {
      token
    }
  }
`

export default withStyles(styles)(withRouter(SignUp))
