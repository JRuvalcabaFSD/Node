
const { getAge } = require("../plugins/getAge.plugin")
const { getUuid } = require("../plugins/uuid.plugin")


const makeBuildPerson = () => {
  return ()=>{}
}


const buildPerson = ({ name,birdthDate}) => {
  return {
    id: getUuid(),
    name,
    birdthDate,
    age:getAge(birdthDate)
  }
}

const obj = {name:"Jesus",birdthDate:"1981-12-24"}
const jhon = buildPerson(obj)

console.log(jhon);
