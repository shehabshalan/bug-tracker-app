export class Endpoints {
  public static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  public static login = Endpoints.baseUrl + "sessions";
  public static adminSignUp = Endpoints.baseUrl + "admin";
  public static createMember = Endpoints.baseUrl + "members";
  public static getSessions = Endpoints.baseUrl + "sessions";
  public static verifySession = Endpoints.baseUrl + "sessions";
  public static getProjects = Endpoints.baseUrl + "projects";
  public static createProject = Endpoints.baseUrl + "projects";
  public static getTopFourProjectsWithMostMembers =
    Endpoints.baseUrl + "projects-overview";
  public static getProjectById = Endpoints.baseUrl + "projects";
  public static updateProjectById = Endpoints.baseUrl + "projects";
  public static accountStats = Endpoints.baseUrl + "stats";
  public static getUserTickets = Endpoints.baseUrl + "user/tickets";
  public static getMembers = Endpoints.baseUrl + "members";
  public static getAllMembers = Endpoints.baseUrl + "allmembers";
  public static createTicket = Endpoints.baseUrl + "tickets";
  public static getProjectTickets = Endpoints.baseUrl + "project/tickets";
  public static getTicketById = Endpoints.baseUrl + "tickets";
  public static updateTicketById = Endpoints.baseUrl + "tickets";
  public static deleteProjectById = Endpoints.baseUrl + "projects";
  public static deleteTicketById = Endpoints.baseUrl + "tickets";
}
