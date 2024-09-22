import { Actions } from "@/components/Actions";
import { History } from "@/components/History";
import DetailCard from "@/components/cards/DetailCard";
import BlurFade from "@/components/magicui/blur-fade";
import { usePathname } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

const BLUR_FADE_DELAY = 0.04;

export default function TokenPage() {
  const path = usePathname();
  const { chainId } = useAccount();
  const contractAddress =
    path && path != null ? (path?.split("/")[1] as `0x${string}`) : "0x00";

  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <BlurFade
          delay={BLUR_FADE_DELAY * 2}
          inView
          className="order-last md:order-first col-span-12 md:col-span-6 lg:col-span-8"
        >
          <History contractAddress={contractAddress} />
        </BlurFade>
        <BlurFade
          delay={BLUR_FADE_DELAY + 0.5}
          inView
          className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4"
        >
          <Actions contractAddress={contractAddress} />
          <DetailCard />
        </BlurFade>
      </div>
    </section>
  );
}
