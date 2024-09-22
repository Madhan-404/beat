import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ethereum: {
    usd: number;
  };
};

const COINGECKO_KEY = process.env.COINGECKO_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) {
  try {
    const options = { method: "GET" };
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?x-cg-pro-api-key${COINGECKO_KEY}=%0A&ids=ethereum&vs_currencies=usd`,
      options,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
}
