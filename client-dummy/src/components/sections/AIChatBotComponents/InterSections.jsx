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

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  useEffect(() => {
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
      {hasMore && (
        <div
          ref={ref}
          className="h-10 flex items-center justify-center text-sm text-muted-foreground"
        >
          {isFetching ? "Loading more..." : "Scroll to load more"}
        </div>
      )}
    </div>
  );
};

export default memo(InterSections);
