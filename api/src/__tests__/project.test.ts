import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/createServer";
import { signJwt } from "../utils/jwt";
import { userPayload, projectPayload } from "./__mocks__/mocks";
import config from "config";

let createdProjectId = "";
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

  describe("Create Project --> /api/projects", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app)
          .post(`/api/projects`)
          .send(projectPayload);

        expect(res.status).toBe(401);
      });
    });
    describe("given missing required fields", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/projects`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "Test Project",
          });

        expect(res.status).toBe(400);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 201", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/projects`)
          .set("Authorization", `Bearer ${token}`)
          .send(projectPayload);

        expect(res.status).toBe(201);
        createdProjectId = res.body._id;
      });
    });
  });

  describe("Get Project By Id --> /api/projects/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).get(
          `/api/projects/${createdProjectId}`
        );
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/projects/${createdProjectId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("Update Project By Id --> /api/projects/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app)
          .put(`/api/projects/${createdProjectId}`)
          .send(projectPayload);
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 203", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .put(`/api/projects/${createdProjectId}`)
          .set("Authorization", `Bearer ${token}`)
          .send(projectPayload);
        expect(res.status).toBe(203);
      });
    });
  });

  describe("Delete Project By Id --> /api/projects/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).delete(
          `/api/projects/${createdProjectId}`
        );
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .delete(`/api/projects/${createdProjectId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });
});
