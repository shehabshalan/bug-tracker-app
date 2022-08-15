export class Endpoints {
  public static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  public static uploadFiles = Endpoints.baseUrl + "files";
  public static getFiles = Endpoints.baseUrl + "files";
  public static getFileById = Endpoints.baseUrl + "files";
  public static createSharedFile = Endpoints.baseUrl + "sharefile";
  public static getSharedFileById = Endpoints.baseUrl + "sharefile/";
  public static updateDownloads = Endpoints.baseUrl + "files";
}
