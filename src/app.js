const { getUserById } = require("./js-fundations/03-callbacks")

const id = 3

getUserById(id, (err,user) => {
  if (err) throw new Error(err);
  console.log(user);
})