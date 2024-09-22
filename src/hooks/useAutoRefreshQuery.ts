import { DocumentNode, TypedDocumentNode, useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";

export function useAutoRefreshQuery(
  query: DocumentNode | TypedDocumentNode,
  options = {},
  refreshInterval = 5000,
) {
  const { refetch, ...result } = useQuery(query, options);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      refetch();
    }, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetch, refreshInterval]);

  return result;
}
