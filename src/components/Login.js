import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN, LOGIN_MUTATION } from '../constants'
import { withStyles } from 'material-ui/styles';
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
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {(loginMutation, { error, data }) => (
          <Fragment>
            <Typography className={classes.typography} variant='headline' gutterBottom color='primary'>
              Login
            </Typography>
            <Typography className={classes.typography} variant='caption' gutterBottom>
              Login below to get access to the content of this site
            </Typography>
            <div className={classes.container}>
              <Form error={error} value={email} id='email' type='email' onChange={this._handleChange}>
                Email
              </Form>
            </div>
            <div className={classes.container}>
              <Form error={error} value={password} id='password' type='password' onChange={this._handleChange}>
                Password
              </Form>
            </div>
            <div className={classes.buttonContainer}>
              <Button className={classes.button} variant='raised' color='primary'
                onClick={async (e) => {
                  const token = get(await loginMutation(), 'login.token')
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

  _handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState({ [id]: value })
  }
}

export default withStyles(styles)(withRouter(Login))
