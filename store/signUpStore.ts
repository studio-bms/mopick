import { create } from "zustand";

interface signUpStore {
  user: any;
  actions: {
    setUser: (val: any) => void;
  };
}
const useSignUpStore = create<signUpStore>((set) => ({
  user: {
    managerName: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    companyRegistrationNumber: "",
  },
  actions: {
    setUser: (val) => set((state) => ({ user: state.user })),
  },
}));

export const getSignUpUser = () => useSignUpStore((state) => state.user);
export const signUpactions = () => useSignUpStore((state) => state.actions);
