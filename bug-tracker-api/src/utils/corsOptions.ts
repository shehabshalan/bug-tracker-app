import allowedOrigins from "./allowedOrigins";
const corsOptions = {
  origin: (origin: string, callback: any) => {
    // ** origin is a trick to allow undefined origin, remove on production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // ** first param is for error, second is to tell the browser that it's allowed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
