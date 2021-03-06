import path from "path";
import { Http, Response } from "farrow-http";
import { vite } from "farrow-vite";

import { services } from "./api";
import { providers } from "./hooks";

// create http server
const http = Http();

providers.forEach((provider) => http.use(provider()));

// attach service for api
http.use(services);

// attach vite or assets for page
if (process.env.NODE_ENV === "development") {
  // enable vite-dev-server when development
  http.use(vite());
} else {
  // enable vite-bundle-output when production
  http.serve("/", path.join(__dirname, "../dist/client"));
  // default match
  http.use(() => Response.file(path.join(__dirname, "../dist/client/index.html")))
}

// start listening
http.listen(3003, () => {
  console.log("server started at http://localhost:3003");
});
