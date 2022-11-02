import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/createServer";
import { signJwt } from "../utils/jwt";
import { userPayload, projectPayload } from "../utils/payloads";
import config from "config";

const projectId = "6359baed64ae90e8680b48ae";
const MONGODB_URI = config.get<string>("mongoURI");

const app = createServer();

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Projects", () => {
  describe("Get Projects --> /api/projects", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).get(`/api/projects`);
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/projects`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });
  describe("Get Project By Id --> /api/projects/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).get(`/api/projects/${projectId}`);
        expect(res.status).toBe(401);
      });
    });
    describe("given a project id is not valid", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/projects/123`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
      });
    });
    describe("given a project doesn't exist", () => {
      it("should return 404", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/projects/123456789012345678901234`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/projects/${projectId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("Create Project --> /api/projects", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).post(`/api/projects`);
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in but project payload is missing", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/projects`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
      });
    });

    describe("given a user is logged in", () => {
      it("should create project and return 201", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/projects`)
          .set("Authorization", `Bearer ${token}`)
          .send(projectPayload);
        expect(res.status).toBe(201);
      });
    });
  });
});
