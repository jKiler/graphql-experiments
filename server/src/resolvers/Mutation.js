const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')
const ValidationError = require('./ValidationError')

// function post(parent, args, context, info) {
//   const userId = getUserId(context)
//   return context.db.mutation.createUser({
//     data: {
//       firstName: args.firstName,
//       secondName: args.secondName,
//     },
//   },
//     info,
//   )
// }

async function signup(parent, args, context, info) {
  let errors = {}
  const { firstName, lastName, email, confirmPassword } = args

  if (!firstName) {
    Object.assign(errors, {
      firstName: 'First name must not be empty',
    })
  }

  if (!lastName) {
    Object.assign(errors, {
      lastName: 'Last name must not be empty',
    })
  }

  if (!email) {
    Object.assign(errors, {
      email: 'Email must not be empty',
    })
  }

  if (!args.password) {
    Object.assign(errors, {
      password: 'Password must not be empty',
    })
  }

  if (args.password !== confirmPassword) {
    Object.assign(errors, {
      confirmPassword: 'Fields do not match',
    })
  }

  if (Object.keys(errors).length) {
    throw new ValidationError({
      data: errors,
    })
  }

  const password = await bcrypt.hash(args.password, 10)
  const user = await context.db.mutation.createUser({
    data: { 
      firstName, 
      lastName, 
      email, 
      password,
    },
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

const login = async (parent, args, context, info) => {
  if (!args.email) {
    throw new ValidationError({ 
      data: {
        email: 'Email must not be empty'
      } 
    })
  }

  const user = await context.db.query.user({ where: { email: args.email } })
  if (!user) {
    throw new ValidationError({ 
      data: {
        email: 'No such user found'
      } 
    })
  }

  if (!args.password) {
    throw new ValidationError({ 
      data: {
        password: 'Password must not be empty'
      } 
    })
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new ValidationError({ 
      data: {
        password: 'Invalid password'
      } 
    })
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  // post,
  signup,
  login,
}