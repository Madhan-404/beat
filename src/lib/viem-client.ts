import { createPublicClient, http } from 'viem'
import { baseSepolia, optimismSepolia } from 'viem/chains'

export default function getViemClient(chainId: number) {
    const publicClient = createPublicClient({
        chain: chainId === baseSepolia.id ? baseSepolia : optimismSepolia,
        transport: http()
    })

    return publicClient
}
