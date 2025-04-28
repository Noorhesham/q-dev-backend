// components/Fetcher.tsx
import React from "react";
import { fetchData } from "../utils/Server";

interface FetcherProps {
  resourceName: "products" | "categories" | "variants"; // Add other resource names as needed
  children: (data: any) => React.ReactNode; // Function to render content
  queryParams?: URLSearchParams;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

const Fetcher = async ({ resourceName, children, queryParams, cache, revalidate, tags }: FetcherProps) => {
  const data = await fetchData({
    resourceName,
    queryParams,
    cache,
    revalidate,
    tags,
  });
  console.log(data);
  return <>{children(data)}</>;
};

export default Fetcher;
