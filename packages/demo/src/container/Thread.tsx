import { Thread, useUs3rThreadContext, VoteType } from "@us3r-network/thread";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Author from "../components/Author";

export default function ThreadPage() {
  const { streamId } = useParams();
  const {
    getThreadInfo,
    createNewComment,
    createNewFavor,
    createNewVote,
    createNewScore,
  } = useUs3rThreadContext()!;
  const [threadInfo, setThreadInfo] = useState<Thread>();

  const submitNewComment = useCallback(async () => {
    if (!streamId) return;
    await createNewComment({ text: "hahah", threadId: streamId });
  }, [createNewComment, streamId]);

  const submitNewFavor = useCallback(async () => {
    if (!streamId) return;
    await createNewFavor({ threadId: streamId });
  }, [createNewFavor, streamId]);

  const submitNewScore = useCallback(async () => {
    if (!streamId) return;
    await createNewScore({ threadId: streamId, text: "hehe", value: 10 });
  }, [createNewScore, streamId]);

  const submitNewVote = useCallback(async () => {
    if (!streamId) return;
    await createNewVote({ threadId: streamId, type: VoteType.UP_VOTE });
  }, [createNewVote, streamId]);

  useEffect(() => {
    if (!streamId) return;
    getThreadInfo(streamId)
      .then((data) => {
        setThreadInfo(data);
      })
      .catch(console.error);
  }, [getThreadInfo, streamId]);

  return (
    <div className="container max-w-5xl mx-auto mt-5 px-5">
      <div>
        {threadInfo?.creator.id && <Author did={threadInfo.creator.id} />}
      </div>
      <div>{threadInfo?.date}</div>
      <div>{threadInfo?.url}</div>

      <div className="flex gap-5 mt-5">
        <button
          onClick={submitNewFavor}
          className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="mr-1">{threadInfo?.favorsCount}</span>
          favor
        </button>
        <button
          onClick={submitNewComment}
          className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="mr-1">{threadInfo?.commentsCount}</span>
          comment
        </button>
        <button
          onClick={submitNewScore}
          className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="mr-1">{threadInfo?.scoresCount}</span>
          Score
        </button>
        <button
          onClick={submitNewVote}
          className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="mr-1">{threadInfo?.votesCount}</span>
          Vote
        </button>
      </div>
    </div>
  );
}
