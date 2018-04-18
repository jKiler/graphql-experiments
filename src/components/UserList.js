import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { QueryWithLoading as Query } from './QueryWithLoading'
import { AUTH_TOKEN } from '../constants'
import { withStyles } from 'material-ui/styles'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from 'material-ui'
import { User } from './User'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  // table: {
  //   minWidth: 700,
  // },
  typography: {
    margin: theme.spacing.unit,
  },
});

class UserList extends Component {
  render () {
    const { classes } = this.props
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <Fragment>
        {authToken ? (
          <Query query={FEED_QUERY} dataPath='feed.users'>
            {(users) => (
              <Paper className={classes.root}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First name</TableCell>
                      <TableCell>Last name</TableCell>
                      <TableCell>email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <User key={user.id} user={user} index={index}/>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Query>
          ) : (
          <Typography className={classes.typography} variant='caption' gutterBottom>
            You need to be logged in to view the content of this site
          </Typography>
          )
        }
      </Fragment>
    )
  }
}

const FEED_QUERY = gql`
  {
    feed {
      users {
        firstName
        lastName
        email
      }
    }
  }
`

export default withStyles(styles)(UserList)