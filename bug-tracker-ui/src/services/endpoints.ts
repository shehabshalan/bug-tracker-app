export class Endpoints {
  public static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  public static login = Endpoints.baseUrl + "sessions";
  public static adminSignUp = Endpoints.baseUrl + "admin";
  public static createMember = Endpoints.baseUrl + "members";
  public static getSessions = Endpoints.baseUrl + "sessions";
  public static verifySession = Endpoints.baseUrl + "sessions/verify";
  public static getProjects = Endpoints.baseUrl + "projects";
  public static getTopFourProjectsWithMostMembers =
    Endpoints.baseUrl + "projects-overview";

  public static accountStats = Endpoints.baseUrl + "stats";
}
