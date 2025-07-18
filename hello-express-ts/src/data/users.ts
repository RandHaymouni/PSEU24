const USERS: Store.IUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
    isActive: true,
    password: '1234'
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "User",
    isActive: true,
    password: '12345'
  },
  {
    id: 3,
    name: "Charlie Lee",
    email: "charlie.lee@example.com",
    role: "Moderator",
    isActive: false,
    password: '123456'
  },
  {
    id: 4,
    name: "Dana White",
    email: "dana.white@example.com",
    role: "User",
    isActive: true,
    password: '1234567'
  },
  {
    id: 5,
    name: "Eli Brown",
    email: "eli.brown@example.com",
    role: "User",
    isActive: false,
    password: '12345678'
  }
];

export {
  USERS
}