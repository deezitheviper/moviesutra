import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import {compare} from 'bcrypt';

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import prismadb from "../../../lib/prismadb";

import {PrismaAdapter} from '@next-auth/prisma-adapter';


export default NextAuth ( {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET ||''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email or password required");
                } 
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if(!user || !user.hashedPassword){
                    throw new Error("Email does not exist")
                } 

                const passwordCorrect = await compare(credentials.password, user.hashedPassword)
                if(!passwordCorrect) throw new Error("Incorrect password")
                return user
            }
        })
    ],
    pages:{
        signIn: '/Access',
    },
    debug: true,
    adapter: PrismaAdapter(prismadb),
    callbacks: {
        async signIn(
            user:Record<string, unknown>,
            account: Record<string, unknown>,
            profile: Record<string, unknown>,
            provider: { id: string }
        ) {
            if (provider.id === 'github') {
                await prismadb.user.update({
                    where: {email: user.email},
                    data: {emailVerified: true}
                })
    }
}
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})