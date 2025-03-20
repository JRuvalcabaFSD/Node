const { getUserById } = require("./js-fundations/03-callbacks")

const id = 3

const getUserById = (id, (err,user) => {
  if (err) throw new Error(err);
  console.log(user);
})