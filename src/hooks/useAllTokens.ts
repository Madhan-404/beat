import { gql } from "@apollo/client";
import { useAutoRefreshQuery } from "../hooks/useAutoRefreshQuery";
import { defaultHead } from "next/head";

const GET_ALL_TOKENS = gql`
  query AllTokens {
    __typename
    MyOFTFactory_Deploy {
      addr
      db_write_timestamp
      name
      owner
      symbol
      id
      imageURI
    }
  }
`;

export default function useAllTokens() {
  const { loading, error, data } = useAutoRefreshQuery(GET_ALL_TOKENS);

  return { loading, error, data };
}
