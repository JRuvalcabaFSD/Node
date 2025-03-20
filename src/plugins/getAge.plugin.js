const getAgePlugin = require("get-age")

const getAge = (bridthDate) => {
  if (!bridthDate) return new Error("brdthDate is requerid")
  
  return getAgePlugin(bridthDate)
}

module.exports = {
  getAge
}