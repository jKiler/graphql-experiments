import React, { Component, Fragment } from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from 'material-ui'
import { withStyles } from 'material-ui/styles';

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
    const { classes, field, fieldString, error, children, onChange, type } = this.props
    const isError = this._handleError(error, fieldString)
    return (
      <FormControl 
        error={isError}
        className={classes.formControl} 
        aria-describedby={`${fieldString}-text`}
      >
        <InputLabel 
          htmlFor={fieldString}
        >
          {children}
        </InputLabel>
        <Input 
          id={fieldString} 
          value={field} 
          type={type} 
          onChange={onChange}
        />
        <FormHelperText 
          className={classes.formHelperText} 
          id={`${fieldString}-text`}
        >
          {isError ? (
            <Fragment>
              <i className='material-icons'>error_outline</i>
              &nbsp;&nbsp;
              {error.graphQLErrors[0].data[fieldString]}
            </Fragment>
          ) : ''}
        </FormHelperText>
      </FormControl>
    )
  }

  _handleError = (error, field) => {
    if (error) {
      const keys = Object.keys(error.graphQLErrors[0].data)
      if (keys.includes(field)) {
        return true
      } else {
        return false
      }
    }
  }
}

export default withStyles(styles)(Form)