import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginUser,  getCurrentUser } from "@/services/user";
import { LoginDTO } from "@/types/auth";
import { TokenPayload } from "@/types/token";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error";

interface AuthState {
  user: TokenPayload | null;
  status: AuthStatus;
  login: (body: LoginDTO) => Promise<boolean>;
  // logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: "idle",

      login: async (body) => {
        set({ status: "loading" });
        try {
          await loginUser(body);
          const { data } = await getCurrentUser();
          set({ user: data, status: "authenticated" });
          return true;
        } catch {
          set({ user: null, status: "error" });
          return false;
        }
      },

      /* logout: async () => {
        await logoutUser();
        set({ user: null, status: "unauthenticated" });
      }, */

      checkAuth: async () => {
        set({ status: "loading" });
        try {
          const { data } = await getCurrentUser();
          set({ user: data, status: "authenticated" });
        } catch {
          set({ user: null, status: "unauthenticated" });
        }
      },
    }),
    {
      name: "auth", // name in the localStorage
      partialize: (state) => ({
        user: state.user, // Only persist the user.exp
      }),
    }
  )
);
