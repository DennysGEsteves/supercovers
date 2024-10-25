const envs = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  apiBaseUrlProtocol: process.env.NEXT_PUBLIC_BASE_URL_PROTOCOL,
  authGoogleId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
  authGoogleSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET,
  authFacebookId: process.env.NEXT_PUBLIC_AUTH_FB_ID,
  authFacebookSecret: process.env.NEXT_PUBLIC_AUTH_FB_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  environment: process.env.NEXT_PUBLIC_ENV_TYPE,
  gTagId: process.env.NEXT_PUBLIC_GTAG_ID,
};

export default envs;
