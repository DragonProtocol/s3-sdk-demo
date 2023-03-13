import { Edge, PageInfo } from "@ceramicnetwork/common";
import { useUs3rThreadContext, Thread } from "@us3r-network/thread";
import { useCallback, useEffect, useState } from "react";
import ThreadCard from "../components/ThreadCard";

const PageSize = 2;

export default function Home() {
  const { getThreadListDesc } = useUs3rThreadContext()!;

  const [threads, setThreads] = useState<Array<Edge<Thread>>>([]);
  const [threadPageInfo, setThreadPageInfo] = useState<PageInfo>();

  const loadThreadList = useCallback(async () => {
    try {
      const data = await getThreadListDesc({
        last: PageSize,
      });
      setThreads(data.edges.reverse());
      setThreadPageInfo(data.pageInfo);
    } catch (error) {
      console.log(error);
      alert((error as any).message);
    }
  }, [getThreadListDesc]);

  const loadMoreThread = useCallback(async () => {
    try {
      const data = await getThreadListDesc({
        last: PageSize,
        before: threadPageInfo?.startCursor,
      });
      setThreads([...threads, ...data.edges.reverse()]);
      setThreadPageInfo(data.pageInfo);
    } catch (error) {
      console.log(error);
      alert((error as any).message);
    }
  }, [threads, getThreadListDesc, threadPageInfo]);

  useEffect(() => {
    loadThreadList();
  }, [loadThreadList]);

  return (
    <div className="container max-w-5xl mx-auto px-5 mt-5">
      <div className="flex  flex-col gap-5">
        {threads.map((item) => {
          return (
            <ThreadCard
              id={item.node.id}
              key={item.node.id}
              url={item.node.url}
              creator={item.node.creator.id}
              date={item.node.date}
              type={item.node.type}
              favorsCount={item.node.favorsCount}
              commentsCount={item.node.commentsCount}
              votesCount={item.node.votesCount}
              scoresCount={item.node.scoresCount}
            />
          );
        })}
      </div>
      {threadPageInfo?.hasPreviousPage && (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMoreThread}
            type="submit"
            className="mt-10 flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            loadMore
          </button>
        </div>
      )}
    </div>
  );
}
