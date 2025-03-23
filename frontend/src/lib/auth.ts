import { User, usersGetMyUser } from "@/gen";

export type Auth = {
  getCurrentUser(): Promise<User | undefined>;
};

export const auth: Auth = {
  getCurrentUser: async () => {
    try {
      return await usersGetMyUser();
    } catch {
      return undefined;
    }
  },
};
