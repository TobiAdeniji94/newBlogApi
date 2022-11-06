const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./../app");
const User = require("./../models/user.model");
const Blog = require("./../models/blog.model");

require('dotenv').config()

jest.setTimeout(20000);

describe("Blog routes", () => {
    let author;
    let token;
    let testBlog;
    beforeAll(async () => {
        await mongoose
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
        const user = await User.create({
            first_name: "test",
            last_name: "test",
            email: "test2@gmail.com",
            password: "testtesttest",
        });
        author = user;
        const loginResponse = await supertest(app)
        .post("/auth/login")
        .send({ email: "test2@gmail.com", password: "testtesttest" });
        token = loginResponse.body.token;
    });
    beforeEach(async () => {
        const blog = await Blog.create({
            title: "test",
            description: "test",
            author: "author test",
            state: "published",
            tags: ["test"],
            body: "test",
        });
      testBlog = blog;
    });
  
    afterEach(async () => {
        await Blog.deleteMany();
    });
    afterAll(async () => {
        await User.deleteMany();
        await Blog.deleteMany();
        
        await mongoose.connection.close();
    });
    it("Get all blogs from the database", async () => {
        const response = await supertest(app).get("/blogs/");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toStrictEqual("Blogs successfully fetched");
    });
    it("Get all blogs from the database and filter by author", async () => {
        const response = await supertest(app).get(
            `/blogs/?author=author test`
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toStrictEqual("Blogs successfully fetched");
    });
    it("Get all blogs from the database and filter by tags", async () => {
        const response = await supertest(app).get(`/blogs/?tags=test`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toStrictEqual("Blogs successfully fetched");
    });
    it("Get all blogs from the database and filter by state", async () => {
        const response = await supertest(app).get(`/blogs/?state=published`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toStrictEqual("Blogs successfully fetched"); 
    });
    it("Get one blogs by id from the database", async () => {
        const response = await supertest(app).get(`/blogs/${testBlog.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toStrictEqual("Blog successfully fetched");
    });
    it("Only update blog when owner is requesting", async () => {
        const response = await supertest(app)
        .patch(`/blogs/${testBlog.id}/update`)
        .set("Authorization", `${token}`)
        .send({ state: "draft" });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toStrictEqual("Blog successfully updated");
    });
    it("Only create blog when user is logged in", async () => {
      const response = await supertest(app)
        .post(`/blogs/create`)
        .set("Authorization", `${token}`)
        .send({
          title: "test2",
          description: "test",
          state: "draft",
          author: "author test",
          tags: ["test"],
          body: "test",
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toStrictEqual("Blog created successfully");
      expect(response.body.data.title).toBe("test2");
    });
    it("Delete blog if owner is requesting", async () => {
        const response = await supertest(app)
        .delete(`/blogs/${testBlog.id}/delete`)
        .set("Authorization", `${token}`)
        expect(response.statusCode).toBe(200);
    });
    // it("Get owner blogs", async () => {
    //     const response = await supertest(app)
    //     .get(`/blogs/${author.id}/user-posts'`)
    //     .set("Authorization", `${token}`)
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.status).toStrictEqual("Blogs successfully fetched");
    // });
});