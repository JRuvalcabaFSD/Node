const { v4: uuidv4 } = require("uuid")
const getAge = require("get-age")

const makeBuildPerson = () => {
  return ()=>{}
}


const buildPerson = ({ name,birdthDate}) => {
  return {
    id: uuidv4(),
    name,
    birdthDate,
    age:getAge(birdthDate)
  }
}

const obj = {name:"Jesus",birdthDate:"1981-12-24"}
const jhon = buildPerson(obj)

console.log(jhon);
