const users = [
  {
    id: 1,
    name:"john Doe"
  },
  {
    id: 2,
    name:"jane Doe"
  },
]

function getUserById(id,callback) {
  const user = users.find(user => user.id === id)
  if (!user) return callback(new Error(`User not found by id: ${id}`))
  return callback(null,user)
}

module.exports = {
  getUserById
}