import axios from "axios";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (token.accessToken) {
        try {
          const response = await axios.get(
            "https://graph.microsoft.com/v1.0/me?$select=jobTitle",
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );
          session.user.jobTitle = response.data.jobTitle;
        } catch (error) {
          console.error(
            "Error fetching job title from Microsoft Graph API:",
            error
          );
        }
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
