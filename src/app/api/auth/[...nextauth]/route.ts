import NextAuth, { AuthOptions } from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

const authOptions: AuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...(session.user ?? {}),
        id: (token.userId ?? token.sub ?? '') as string,
      };
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export const { GET, POST } = handler;

// 캐싱 문제 방지용 옵션
export const dynamic = 'force-dynamic';
