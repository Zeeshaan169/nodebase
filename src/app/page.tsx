import { getQueryClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
const Page = async () => {
  const queryClient = getQueryClient();

  // Prefetch on the server so the client hydrates with data
  await queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<p>loading...</p>}>
        <Client />
        </Suspense> 
      </HydrationBoundary>
    </div>
  );
};

export default Page;