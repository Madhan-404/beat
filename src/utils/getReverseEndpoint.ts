import React from 'react'
import { baseSepolia } from 'viem/chains';

export default function getReverseEndpoint(chainId: number) {
    if (chainId === baseSepolia.id) {
        return 40232
    } else {
        return 40245
    }
}
