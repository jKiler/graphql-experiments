import React, { Component, Fragment } from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
  formHelperText: {
    display: 'inline-flex',
    alignItems: 'center',
  },
})

class Form extends Component {
  render () {
    const { classes, id, error, children, ...props } = this.props
    const isError = this._handleError(error, id)
    return (
      <FormControl error={isError} className={classes.formControl}>
        <InputLabel htmlFor={id}>
          {children}
        </InputLabel>
        <Input id={id} {...props} />
        <FormHelperText className={classes.formHelperText} id={`${id}-text`}>
          {isError ? this._errorTextFor(error, id) : null}
        </FormHelperText>
      </FormControl>
    )
  }

  _handleError = (error, id) => {
    if (error) {
      const keys = Object.keys(error.graphQLErrors[0].data)
      return keys.includes(id) ? true : false
    }
  }

  _errorTextFor = (error, id) => (
    <Fragment>
      <i className='material-icons'>error_outline</i>
      &nbsp;&nbsp;
      {error.graphQLErrors[0].data[id]}
    </Fragment>
  )
}

export default withStyles(styles)(Form)
