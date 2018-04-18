async function feed(parent, args, context, info) {
  const { filter, first, skip } = args
  const where = filter ? { OR: [{ firstName_contains: filter }, { lastName_contains: filter }, { email_contains: filter }] } : {}

  const allUsers = await context.db.query.users({})
  const count = allUsers.length

  const queriedUsers = await context.db.query.users({ first, skip, where })

  return {
    userIds: queriedUsers.map(user => user.id),
  } 
}

module.exports = {
  feed,
}