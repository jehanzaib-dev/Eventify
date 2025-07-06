// utils/mockUsers.js

let users = [
  {
    id: 1,
    name: "Jehanzaib",
    email: "jehanzaib.dev@gmail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password",
  },
];

// Find a user by email
export function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

// Add a new user
export function addUser(newUser) {
  const id = users.length + 1;
  const userWithId = { id, ...newUser };
  users.push(userWithId);
  return userWithId;
}
