const login = require("./login");

// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

describe("test login function", () => {
  test("status code 200 - true ", () => {
    const req = {
      body: {
        email: "Anton44@mail.com",
        password: "123456733",
      },
    };

    const result = login(req);
    expect(result.code).toBe(200);
  });
  test("return token ", () => {
    const req = {
      body: {
        email: "Anton44@mail.com",
        password: "123456733",
      },
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI3NjE2MTdiY2JiMzY2ODdjODVhZCIsImlhdCI6MTY3NjM3OTY2NywiZXhwIjoxNjc2MzgzMjY3fQ.DIETMQAqJjZZ3j7PeKW40T4WQbpv2nuWjROs_640a3Y";
    const result = login(req);
    expect(result.data.token).toBe(token);
  });
});
