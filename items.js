let USERS = [
  {
    id: 1,
    fullname: "cristiano ronaldo",
    username: "ronaldo",
    password: "$2b$10$hW86zCzYTxAnAkEDiAK11u.hCMXhkq7Q6B3.qYX6yu99kWdxGdW4O", // 123123
  },
  {
    id: 2,
    fullname: "lionel messi",
    username: "messi",
    password: "$2b$10$hW86zCzYTxAnAkEDiAK11u.hCMXhkq7Q6B3.qYX6yu99kWdxGdW4O", // 123123
  },
  {
    id: 3,
    fullname: "neymar JR",
    username: "neymar",
    password: "$2b$10$hW86zCzYTxAnAkEDiAK11u.hCMXhkq7Q6B3.qYX6yu99kWdxGdW4O", // 123123
  },
];

let STUDENTS = [
  {
    id: 1,
    name: "Abigail",
    age: "18",
    gender: "female",
    phone_number: "0815182192872",
    created_by_id: 1,
    users_role: [
      { user_id: 2, role: "editor" },
      { user_id: 3, role: "viewer" },
    ],
  },
  {
    id: 2,
    name: "Alexandra",
    age: "18",
    gender: "female",
    phone_number: "0812781291021",
    created_by_id: 2,
    users_role: [
      { user_id: 3, role: "editor" },
      { user_id: 1, role: "viewer" },
    ],
  },
];

const SECRET_KEY = "sangat-rahasia";

module.exports = {
  USERS,
  STUDENTS,
  SECRET_KEY,
};
