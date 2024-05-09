'use server'
import { prisma } from "@/app/lib/prisma";

interface UserData {
  id: number;
  identify: string;
  password: string;
}

interface UserResponse {
  data?: UserData;
  err?: string;
}

export const findUserById = async (identify: string): Promise<UserResponse> => {
  try {
    const res = await prisma.user.findFirstOrThrow({
      where: {
        identify: identify
      }
    });

    if (!res) {
      return { err: JSON.parse(JSON.stringify("Can not find user")) };
    }

    const data: UserData = {
      id: res.id,
      identify: res.identify,
      password: res.password
    };

    return { data };
  } catch (err: any) {
    return { err };
  }
};
    
  