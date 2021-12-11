const nextTranslate = require("next-translate");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const env = {
    STORE_ENVIRONMENT: isDev ? "local" : "production",
    SERVER_HOST: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID:
      "675169183319-tsdgjhbkssnvg3ncmutgm9b80a6t1vdn.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    MONGO_USER: "Wlloa",
    MONGO_PASS: "MnzQ9YSuy45paMU",
    MONGO_DB: "cluster0.hvbn2.mongodb.net",
  };

  let nextJsConfig = {
    reactStrictMode: true,
    env,
  };
  return nextTranslate(nextJsConfig);
};

// module.exports = nextTranslate({
//   reactStrictMode: true,
// });
