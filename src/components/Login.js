import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { withStyles } from 'material-ui/styles';
import { Typography, Button } from 'material-ui'
import Form from './Form'

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

class Login extends Component {
  
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    const { email, password } = this.state
    const { classes } = this.props
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(loginMutation, { error, data }) => (
          <Fragment>
            <Typography className={classes.typography} variant='headline' gutterBottom color='primary'>
              Login
            </Typography>
            <Typography className={classes.typography} variant='caption' gutterBottom>
              Login below to get access to the content of this site
            </Typography>
            <div className={classes.container}>
              <Form error={error} field={email} fieldString='email' onChange={(e) => this.setState({ email: e.target.value })}>
                Email
              </Form>
            </div>
            <div className={classes.container}>
              <Form error={error} field={password} fieldString='password' onChange={(e) => this.setState({ password: e.target.value })}>
                Password
              </Form>
            </div>
            <div className={classes.buttonContainer}>
              <Button className={classes.button} variant='raised' color='primary'
                onClick={async (e) => {
                  const result = await loginMutation({
                    variables: {
                      email,
                      password,
                    }
                  })
                  const { token } = result.data.login
                  this._saveUserData(token)
                  this.props.history.push('/')
                }}
              >
                login
              </Button>
              <Button className={classes.button} color='primary' component={Link} to='/signup'>
                sign up
              </Button>
            </div>
          </Fragment>
        )}
      </Mutation>
    )
  }

  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default withStyles(styles)(withRouter(Login))