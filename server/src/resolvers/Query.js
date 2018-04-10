function feed(parent, args, context, info) {
  return context.db.users({}, info)
}

module.exports = {
  feed,
}