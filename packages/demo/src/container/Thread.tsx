import { Thread, useUs3rThreadContext, VoteType } from "@us3r-network/thread";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { CommentList } from "@us3r-network/authkit";
import { useParams } from "react-router-dom";
import Author from "../components/Author";

export default function ThreadPage() {
  const { streamId } = useParams();
  const { getThreadInfo } = useUs3rThreadContext()!;
  const [threadInfo, setThreadInfo] = useState<Thread>();

  useEffect(() => {
    if (!streamId) return;
    getThreadInfo(streamId)
      .then((data) => {
        setThreadInfo(data);
      })
      .catch(console.error);
  }, [getThreadInfo, streamId]);

  return (
    <div>
      <div className="container max-w-5xl mx-auto p-5  bg-[#14171A]">
        <div>
          {threadInfo?.creator.id && <Author did={threadInfo.creator.id} />}
        </div>
        <div>
          {threadInfo?.date &&
            dayjs(threadInfo!.date).format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <div>{threadInfo?.url}</div>
      </div>

      {streamId && <CommentList threadId={streamId} />}
    </div>
  );
}
