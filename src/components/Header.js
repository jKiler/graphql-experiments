import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { withStyles } from 'material-ui/styles'
import { AppBar, Toolbar, Typography, Button, IconButton } from 'material-ui'
import { AccountCircle } from '@material-ui/icons/'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class Header extends Component {
  render () {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { classes } = this.props
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='title' color='inherit' className={classes.flex}>
            User Panel
          </Typography>
          {authToken ? (
            <IconButton
              color='inherit'
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button color='inherit' component={Link} to='/login'>
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(withRouter(Header))
