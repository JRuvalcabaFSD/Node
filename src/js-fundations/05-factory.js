

const buildMakePerson = ({getAge,getUuid}) => {
  return ({ name, birdthDate }) => {
    return {
      id: getUuid(),
      name,
      birdthDate,
      age: getAge(birdthDate)
    }
  }
}


module.exports = {buildMakePerson}