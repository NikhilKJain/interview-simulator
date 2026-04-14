"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoadingStateProps {
  type: "generating" | "evaluating";
}

export function LoadingState({ type }: LoadingStateProps) {
  if (type === "generating") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Generating a tailored interview question...
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mt-2" />
            <Skeleton className="h-4 w-3/5 mt-2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">
          Analyzing your answer with AI feedback...
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="w-28 h-28 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
          <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
