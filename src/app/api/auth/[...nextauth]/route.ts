import NextAuth from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

const authOptions = {
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

// 캐싱 문제 방지용 옵션
export const dynamic = 'force-dynamic';
