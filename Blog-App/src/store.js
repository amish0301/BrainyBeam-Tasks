import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// user state
export const userState = atom({
  key: "userState",
  default: {
    user: {},
    auth: {
      isAuthenticated: false,
      token: null,
    },
  },
  effects_UNSTABLE: [persistAtom],
});
