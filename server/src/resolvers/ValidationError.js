const { createError } = require('apollo-errors')

const ValidationError = createError('ValidationError', {
  message: 'Validation error has occured'
});

module.exports = ValidationError