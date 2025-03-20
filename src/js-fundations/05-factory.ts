interface BuildMakePersonProps {
  getUuid: () => string;
  getAge: (birdthDate: string) => number;
}

interface PersonProps {
  name: string;
  birdthDate: string;
}

const buildMakePerson = ({ getAge, getUuid }: BuildMakePersonProps) => {
  return ({ name, birdthDate }: PersonProps) => {
    return {
      id: getUuid(),
      name,
      birdthDate,
      age: getAge(birdthDate),
    };
  };
};

module.exports = { buildMakePerson };
