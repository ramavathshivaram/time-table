import React, { memo, useEffect, useState } from "react";
import messageService from "@/services/workflow/message.service";
import { useInView } from "react-intersection-observer";

const InterSections = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: "200px",
    threshold: 0,
  });

  // ✅ initial load
  useEffect(() => {
    const loadInitial = async () => {
      setIsFetching(true);
      const res = await messageService.getAllMessages(1, 10);
      setHasMore(res?.hasMore ?? true);
      setIsFetching(false);
    };

    loadInitial();
  }, []);

  // ✅ trigger next page
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  // ✅ fetch next page
  useEffect(() => {
    if (page === 1) return;

    const loadMore = async () => {
      setIsFetching(true);

      messageService.getAllMessages(page, 10, (hasMoreBool) => {
        setHasMore(hasMoreBool ?? false);
        setIsFetching(false);
      });
    };

    loadMore();
  }, [page]);

  return (
    <div>
      {hasMore ? (
        <div
          ref={ref}
          className="h-10 flex items-center justify-center text-sm text-muted-foreground"
        >
          {isFetching ? "Loading more..." : "Scroll to load more"}
        </div>
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          No more messages
        </div>
      )}
    </div>
  );
};

export default memo(InterSections);
