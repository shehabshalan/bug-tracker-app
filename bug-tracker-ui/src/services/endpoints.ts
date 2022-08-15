export class Endpoints {
  public static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  public static login = Endpoints.baseUrl + "sessions";
  public static adminSignUp = Endpoints.baseUrl + "admin";
  public static createMember = Endpoints.baseUrl + "members";
  public static getSessions = Endpoints.baseUrl + "sessions";
}
