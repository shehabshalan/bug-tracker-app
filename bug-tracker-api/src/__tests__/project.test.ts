import supertest from "supertest";
import { app } from "../app";
describe("project", () => {
  describe("get project", () => {
    describe("given project doesn't exist", () => {
      it("should return 404", () => {
        // test code
        expect(true).toBe(true);
      });
    });
  });
});
