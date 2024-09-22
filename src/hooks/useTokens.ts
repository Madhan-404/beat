import { gql } from "@apollo/client";
import { useAutoRefreshQuery } from "../hooks/useAutoRefreshQuery";

const GET_TOKEN_BY_ADDRESS = gql`
  query TokenByAddress($address: String) {
    __typename
    MyOFTFactory_Deploy(where: { addr: { _eq: $address } }) {
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

export interface Token {
  addr: string;
  db_write_timestamp: string;
  name: string;
  owner: string;
  symbol: string;
  id: string;
  imageURI: string;
}

export default function useToken(address: string) {
  console.log("got this address", address);

  const { loading, error, data } = useAutoRefreshQuery(GET_TOKEN_BY_ADDRESS, {
    variables: { address: address },
  });

  const token = data?.MyOFTFactory_Deploy[0] || null;

  return { loading, error, token };
}
