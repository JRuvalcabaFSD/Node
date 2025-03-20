const { getAge, getUuid } = require("./plugins")
const { buildMakePerson } = require("./js-fundations/05-factory")

const params = {name:"Jesus",birdthDate:"1981-12-24"}
const makePerson = buildMakePerson({ getAge, getUuid })

const jhon = makePerson(params)
console.log(jhon);
