const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./../app");
const User = require("./../models/user.model");

require('dotenv').config()

jest.setTimeout(20000);
describe("Auth routes", () => {
    beforeAll(async () => {
      mongoose
        .connect(process.env.MONGO_URL||'mongodb://localhost:27017/newBlogApi', {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .then(() => {
          console.log("mongoDB connected");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    beforeEach(async () => {
      await User.create({
        first_name: "test",
        last_name: "test",
        email: "test4@gmail.com",
        password: "testtesttest",
      });
    });
    afterEach(async () => {
      await User.deleteMany();
    });
    afterAll(async () => {
      await User.deleteMany();
      await mongoose.connection.close();
    });
    it("Register a new user", async () => {
        const response = await supertest(app)
        .post("/auth/register")
        .send({
            first_name: "test",
            last_name: "test",
            email: "test5@gmail.com",
            password: "testtesttest",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Registration successful");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("userData");
        expect(response.body.data.userData).toHaveProperty("first_name", "test");
        expect(response.body.data.userData).toHaveProperty("last_name", "test");
        expect(response.body.data.userData).toHaveProperty("email", "test5@gmail.com");
    });
    it("Login a user", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({
          email: "test4@gmail.com",
          password: "testtesttest",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Login succcessful");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("userData");
      expect(response.body.data.userData).toHaveProperty("first_name", "test");
      expect(response.body.data.userData).toHaveProperty("last_name", "test");
      expect(response.body).toHaveProperty("token");
    });
});
  
