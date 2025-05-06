import { TAuthConfig } from "react-oauth2-code-pkce";

export const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationEndpoint: 'https://ims.bentley.com/connect/authorize',
  tokenEndpoint: 'https://ims.bentley.com/connect/token',
  redirectUri: 'http://localhost:5173/signin-oidc',
  scope: 'openid email evo.discovery evo.workspace evo.file evo.object',
  autoLogin: false,
  onRefreshTokenExpire: (event) => event.logIn(undefined, undefined, "popup"),
};