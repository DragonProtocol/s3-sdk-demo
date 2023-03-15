import { Thread, useUs3rThreadContext, VoteType } from "@us3r-network/thread";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Author from "../components/Author";
import Comment from "../components/Icons/Comment";
import Favor from "../components/Icons/Favor";

enum Tab {
  Comment = "Comment",
  Favor = "Favor",
  Score = "Score",
  Vote = "Vote",
}

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

  const [tab, setTab] = useState(Tab.Comment.toString());
  const [commentText, setCommentText] = useState("");

  const submitNewComment = useCallback(async () => {
    if (!streamId) return;
    await createNewComment({ text: commentText, threadId: streamId });
    await getThreadInfo(streamId);
  }, [createNewComment, streamId, commentText, getThreadInfo]);

  const submitNewFavor = useCallback(async () => {
    if (!streamId) return;
    await createNewFavor({ threadId: streamId });
    await getThreadInfo(streamId);
  }, [createNewFavor, streamId, getThreadInfo]);

  const submitNewScore = useCallback(async () => {
    if (!streamId) return;
    await createNewScore({ threadId: streamId, text: "hehe", value: 10 });
    await getThreadInfo(streamId);
  }, [createNewScore, streamId, getThreadInfo]);

  const submitNewVote = useCallback(async () => {
    if (!streamId) return;
    await createNewVote({ threadId: streamId, type: VoteType.UP_VOTE });
    await getThreadInfo(streamId);
  }, [createNewVote, streamId, getThreadInfo]);

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
      <div className="container max-w-5xl mx-auto mt-5 px-5">
        <div className="flex justify-evenly items-center py-5">
          <div
            className="flex items-center gap-1 text-sm"
            onClick={submitNewVote}
          >
            <span>👏</span> {threadInfo?.votesCount}
          </div>
          <span>|</span>
          <div className="flex items-center gap-1 text-sm">
            <span>
              <Comment />
            </span>
            {threadInfo?.commentsCount}
          </div>
          <span>|</span>
          <div
            className="flex items-center gap-1 text-sm"
            onClick={submitNewFavor}
          >
            <span>
              <Favor />
            </span>
            {threadInfo?.favorsCount}
          </div>
        </div>

        <hr />

        <div className="flex gap-5 mt-5">
          <div>
            {threadInfo?.comments.edges.map((item) => {
              return (
                <div key={item.node.id} className="p-2 flex flex-col gap-1">
                  <div className="flex justify-between">
                    <Author did={item.node.creator.id} />
                  </div>
                  <p className="text-sm">{item.node.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute w-full bottom-0 flex gap-1 p-5">
        <input
          title="comment"
          type="text"
          placeholder="Give a Comment"
          className="block w-full rounded-md border-1 border-gray-100  bg-inherit p-2"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        />
        <button
          title="send"
          onClick={submitNewComment}
          className="flex items-center justify-center rounded-md border border-transparent p-3  text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

function Send() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2368_13957)">
        <path
          d="M13.8858 9.92897L9.99674 13.8181M10.143 14.084L13.4238 20.6669C13.6816 21.1841 13.8104 21.4427 13.9763 21.5154C14.1203 21.5786 14.2857 21.5704 14.4227 21.4931C14.5804 21.4042 14.6829 21.1341 14.8878 20.5938L21.3871 3.45947C21.5871 2.93212 21.6871 2.66845 21.6296 2.49857C21.5797 2.35098 21.4638 2.23511 21.3162 2.18518C21.1464 2.1277 20.8827 2.22772 20.3553 2.42775L3.21505 8.92928C2.67641 9.13359 2.40709 9.23574 2.31815 9.39325C2.24092 9.53004 2.23246 9.69518 2.29531 9.83914C2.36768 10.0049 2.62515 10.1341 3.14008 10.3924L9.78569 13.7258C9.87413 13.7702 9.91835 13.7923 9.95666 13.822C9.99065 13.8482 10.0211 13.8788 10.0473 13.9128C10.0768 13.9512 10.0989 13.9955 10.143 14.084Z"
          stroke="#718096"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2368_13957">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
