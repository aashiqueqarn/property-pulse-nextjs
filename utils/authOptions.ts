import type { Account, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }: { profile?: any; user?: any; account?: Account | null; email?: any; credentials?: Record<string, any> }) {
            await connectDB();
            const userExist = await User.findOne({ email: profile.email });
            if (!userExist) {
                const userName = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username: userName,
                    image: profile.picture,
                });
                console.log("New user created:", profile.email);
            }
            return true;
        },
        async session({ session }: { session: any; token?: any; user?: any }) {
            const user = await User.findOne({ email: session.user.email });
            if (user) {
                session.user.id = user._id.toString();
            }   
            return session;
        },
    }
}