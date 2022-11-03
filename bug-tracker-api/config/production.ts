require("dotenv").config();

export default {
  port: process.env.PORT || 4000,
  mongoURI: process.env.DB_CONNECTION_URI,
  saltWorkFactor: 10,
  accessTokenTtl: "1d",
  refreshTokenTtl: "1y",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
