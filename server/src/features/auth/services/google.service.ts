import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client();

export const googleService = {
  async verifyAccessToken(accessToken: string) {
    if (!accessToken) {
      throw new Error("Google access token is required");
    }

    const tokenInfo = await googleClient.getTokenInfo(accessToken);

    return {
      googleId: tokenInfo.sub,
      email: tokenInfo.email,
      scopes: tokenInfo.scopes,
      expiresAt: tokenInfo.expiry_date,
      audience: tokenInfo.aud,
    };
  },
};
