"use client";

import { Skeleton } from "@heroui/react";

export default function AuthSkeleton() {
  return (
    <main className="min-h-screen bg-[#EFF4EF] px-4 py-10">
      <div className="mx-auto max-w-md space-y-6 rounded-xl border border-[#DFE8DF] bg-[#FAFCFA] p-6 sm:p-8">
        <div className="space-y-3">
          <Skeleton className="mx-auto h-8 w-52 rounded-lg" />
          <Skeleton className="mx-auto h-4 w-64 rounded-lg" />
        </div>

        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}

        <Skeleton className="h-10 w-full rounded-lg" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        <Skeleton className="mx-auto h-4 w-48 rounded-lg" />
      </div>
    </main>
  );
}