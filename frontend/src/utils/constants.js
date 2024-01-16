const env = import.meta.env.VITE_ENV;
const deployedApiURl = import.meta.env.VITE_DEPLOYED_API_URL;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;

export const apiUrl = env === "PROD" ? deployedApiURl : localApiUrl;
