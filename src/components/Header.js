import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { withStyles } from 'material-ui/styles'
import { AppBar, Toolbar, Typography, Button } from 'material-ui'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { classes } = this.props
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            User Panel
          </Typography>
          {authToken ? (
            <Button
              color='inherit'
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to='/login'>
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      // <div className="flex pa1 justify-between nowrap orange">
      //   <div className="flex flex-fixed black">
      //     <div className="fw7 mr1">User Panel</div>
      //     <Link to="/" className="ml1 no-underline black">
      //       new
      //     </Link>
      //     <div className="ml1">|</div>
      //     <Link to="/search" className="ml1 no-underline black">
      //       search
      //     </Link>
      //     {authToken && (
      //       <div className="flex">
      //         <div className="ml1">|</div>
      //         <Link to="/create" className="ml1 no-underline black">
      //           submit
      //         </Link>
      //       </div>
      //     )}
      //   </div>
      //   <div className="flex flex-fixed">
      //     {authToken ? (
      //       <div
      //         className="ml1 pointer black"
      //         onClick={() => {
      //           localStorage.removeItem(AUTH_TOKEN)
      //           this.props.history.push(`/`)
      //         }}
      //       >
      //         logout
      //       </div>
      //     ) : (
      //       <Link to="/login" className="ml1 no-underline black">
      //         login
      //       </Link>
      //     )}
      //   </div>
      // </div>
    )
  }
}

export default withStyles(styles)(withRouter(Header))