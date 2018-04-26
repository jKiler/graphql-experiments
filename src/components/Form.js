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
    const { classes, value, id, error, children, onChange, type } = this.props
    const isError = this._handleError(error, id)
    return (
      <FormControl error={isError} className={classes.formControl} aria-describedby={`${id}-text`}>
        <InputLabel htmlFor={id}>
          {children}
        </InputLabel>
        <Input id={id} value={value} type={type} onChange={onChange} />
        <FormHelperText className={classes.formHelperText} id={`${id}-text`}>
          {isError ? (
            <Fragment>
              <i className='material-icons'>error_outline</i>
              &nbsp;&nbsp;
              {error.graphQLErrors[0].data[id]}
            </Fragment>
          ) : null}
        </FormHelperText>
      </FormControl>
    )
  }

  _handleError = (error, value) => {
    if (error) {
      const keys = Object.keys(error.graphQLErrors[0].data)
      return keys.includes(value) ? true : false
    }
  }
}

export default withStyles(styles)(Form)
