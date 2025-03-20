interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'john Doe',
  },
  {
    id: 2,
    name: 'jane Doe',
  },
];

export const getUserById = (
  id: number,
  callback: (err?: Error, user?: User) => void,
) => {
  const user = users.find((user) => user.id === id);
  if (!user) return callback(new Error(`User not found by id: ${id}`));
  return callback(undefined, user);
};
