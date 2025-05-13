const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  // Setting Phase
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD;
  console.log(`isDev:${isDev}  isProd:${isProd}`);

  const reactStrictMode = true;

  // UNCONFIGURED HOST + REMOTE PATTERNS: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
  const images = {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.bbci.co.uk",
      },
      {
        protocol: "https",
        hostname: "**.abc-cdn.net.au",
      },
    ],
  };

  // const env = {
  //   SERVER_NAME: (() => {
  //     if (isDev) return "http://localhost:3000/";
  //     if (isProd) return "https://weatherly-e6lu.onrender.com/";
  //   })(),
  // };

  // Next.config returns an object
  return {
    reactStrictMode,
    images,
    // env,
  };
};
