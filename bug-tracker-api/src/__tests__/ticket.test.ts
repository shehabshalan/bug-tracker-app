import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/createServer";
import { signJwt } from "../utils/jwt";
import { userPayload, ticketPayload } from "../utils/payloads";
import config from "config";

const MONGODB_URI = config.get<string>("mongoURI");

let createdTicketId = "";

const app = createServer();

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tickets", () => {
  describe("Get Tickets --> /api/tickets", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).get(`/api/tickets`);
        expect(res.status).toBe(401);
      });
    });
    describe("given a user is logged in", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/tickets`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("Create Ticket --> /api/tickets", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app)
          .post(`/api/tickets`)
          .send(ticketPayload);

        expect(res.status).toBe(401);
      });
    });
    describe("given missing required fields", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/tickets`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "Test Ticket",
          });

        expect(res.status).toBe(400);
      });
    });

    describe("given a user is logged in", () => {
      it("should return 201", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .post(`/api/tickets`)
          .set("Authorization", `Bearer ${token}`)
          .send(ticketPayload);
        expect(res.status).toBe(201);
        createdTicketId = res.body._id;
      });
    });
  });
  describe("Get Ticket By Id --> /api/tickets/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).get(`/api/tickets/${createdTicketId}`);
        expect(res.status).toBe(401);
      });
    });
    describe("given a ticket id is not valid", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/tickets/123`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
      });
    });
    describe("given a ticket doesn't exist", () => {
      it("should return 404", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/tickets/123456789012345678901234`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
      });
    });
    describe("given a ticket exists", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .get(`/api/tickets/${createdTicketId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("Update Ticket --> /api/tickets/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app)
          .put(`/api/tickets/${createdTicketId}`)
          .send(ticketPayload);
        expect(res.status).toBe(401);
      });
    });
    describe("given a ticket id is not valid", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .put(`/api/tickets/123`)
          .set("Authorization", `Bearer ${token}`)
          .send(ticketPayload);
        expect(res.status).toBe(400);
      });
    });
    describe("given a ticket doesn't exist", () => {
      it("should return 404", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .put(`/api/tickets/123456789012345678901234`)
          .set("Authorization", `Bearer ${token}`)
          .send(ticketPayload);
        expect(res.status).toBe(404);
      });
    });
    describe("given a ticket exists", () => {
      it("should return 203", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .put(`/api/tickets/${createdTicketId}`)
          .set("Authorization", `Bearer ${token}`)
          .send(ticketPayload);
        expect(res.status).toBe(203);
      });
    });
  });

  describe("Delete Ticket --> /api/tickets/:id", () => {
    describe("given a user not logged in", () => {
      it("should return 401", async () => {
        const res = await supertest(app).delete(
          `/api/tickets/${createdTicketId}`
        );
        expect(res.status).toBe(401);
      });
    });
    describe("given a ticket id is not valid", () => {
      it("should return 400", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .delete(`/api/tickets/123`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(400);
      });
    });
    describe("given a ticket doesn't exist", () => {
      it("should return 404", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .delete(`/api/tickets/123456789012345678901234`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(404);
      });
    });
    describe("given a ticket exists", () => {
      it("should return 200", async () => {
        const token = signJwt(userPayload);
        const res = await supertest(app)
          .delete(`/api/tickets/${createdTicketId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });
  });
});
