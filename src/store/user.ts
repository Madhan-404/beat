import { create } from "zustand";

export interface IUserStore {
    user: any;
    address: string | null;
    setUser: (user: any) => void;
    setAddress: (address: string) => void
}

const useUserStore = create<IUserStore>((set) => ({
    user: null,
    address: null,
    setUser: (user: any) => set({ user: user }),
    setAddress: (address: string) => set({ address: address })
}));

export default useUserStore;