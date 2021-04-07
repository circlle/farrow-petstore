import { apiPipeline } from "farrow-api-client";

const HOST = "import.meta.env.FARROW_SERVER_HOST";
const PORT = "import.meta.env.FARROW_SERVER_PORT";
const isProd = "import.meta.env.PROD";
apiPipeline.use(async (request, next) => {
  if (isProd) {
    const rawUrl = request.url;
    const urlObj = new URL(rawUrl);
    urlObj.host = HOST;
    urlObj.port = PORT;
    return next({
      ...request,
      url: urlObj.toString(),
    });
  }
  return next({ ...request });
});