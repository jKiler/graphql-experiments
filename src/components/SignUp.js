import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN, SIGNUP_MUTATION } from '../constants'
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
                <Form error={error} value={firstName} id='firstName' type='text' onChange={this._handleChange}>
                  First name
                </Form>
                <Form error={error} value={lastName} id='lastName' type='text' onChange={this._handleChange}>
                  Last name
                </Form>
              </div>
              <div className={classes.container}>
                <Form error={error} value={email} id='email' type='email' onChange={this._handleChange}>
                  Email
                </Form>
              </div>
              <div className={classes.container}>
                <Form error={error} value={password} id='password' type='password' onChange={this._handleChange}>
                  Password
                </Form>
                <Form error={error} value={confirmPassword} id='confirmPassword' type='password' onChange={this._handleChange}>
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

  _handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState({ [id]: value })
  }
}

export default withStyles(styles)(withRouter(SignUp))
