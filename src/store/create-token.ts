import { create } from "zustand";

export interface ICreateTokenStore {
    name: string;
    symbol: string;
    supply: string;
    chains: string[]
    setName: (name: string) => void;
    setSymbol: (symbol: string) => void;
    setSupply: (supply: string) => void;
    setChains: (chains: string[]) => void;
}

const useCreateTokenStore = create<ICreateTokenStore>((set) => ({
    name: "",
    symbol: "",
    supply: "",
    chains: [],
    setName: (name) => set({ name: name }),
    setSymbol: (symbol) => set({ symbol: symbol }),
    setSupply: (supply) => set({ supply: supply }),
    setChains: (chains) => set({ chains: chains })
}));

export default useCreateTokenStore;