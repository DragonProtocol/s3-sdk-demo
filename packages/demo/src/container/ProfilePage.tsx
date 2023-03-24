import { useUs3rProfileContext } from "@us3r-network/profile";
import {
  Thread,
  Comment,
  Vote,
  Score,
  Favor,
  useUs3rThreadContext,
} from "@us3r-network/thread";
import { Edge, PageInfo } from "@ceramicnetwork/common";
import { useCallback, useEffect, useState } from "react";
import shortPubKey from "../utils/shortPubKey";

enum Tab {
  Thread = "Thread",
  Comment = "Comment",
  Favor = "Favor",
  Score = "Score",
  Vote = "Vote",
}

export default function Profile() {
  const { sessId, profile, updateProfile, us3rAuthValid } =
    useUs3rProfileContext()!;
  const {
    relationsComposeClient,
    getPersonalThreadList,
    getPersonalFavorList,
    getPersonalCommentList,
    getPersonalScoreList,
    getPersonalVoteList,
  } = useUs3rThreadContext()!;

  const [name, setName] = useState("");
  const [threads, setThreads] = useState<Array<Edge<Thread>>>([]);
  const [comments, setComments] = useState<Array<Edge<Comment>>>([]);
  const [scores, setScores] = useState<Array<Edge<Score>>>([]);
  const [votes, setVotes] = useState<Array<Edge<Vote>>>([]);
  const [favors, setFavors] = useState<Array<Edge<Favor>>>([]);
  const [tab, setTab] = useState(Tab.Thread);

  const updateProfileAction = useCallback(async () => {
    await updateProfile(name);
  }, [name, updateProfile]);

  useEffect(() => {
    setName(profile?.name || "");
  }, [profile]);

  useEffect(() => {
    if (relationsComposeClient.context.isAuthenticated() && us3rAuthValid) {
      getPersonalThreadList({})
        .then((data) => {
          setThreads(data.edges);
        })
        .catch(console.error);

      getPersonalFavorList({})
        .then((data) => {
          if (data) setFavors(data.edges);
        })
        .catch(console.error);
      getPersonalCommentList({})
        .then((data) => {
          setComments(data.edges);
        })
        .catch(console.error);
      getPersonalScoreList({})
        .then((data) => {
          if (data) setScores(data.edges);
        })
        .catch(console.error);
      getPersonalVoteList({})
        .then((data) => {
          if (data) setVotes(data.edges);
        })
        .catch(console.error);
    }
  }, [
    us3rAuthValid,
    getPersonalThreadList,
    getPersonalFavorList,
    getPersonalCommentList,
    getPersonalScoreList,
    getPersonalVoteList,
    relationsComposeClient.context,
  ]);

  return (
    <div className="container max-w-5xl mx-auto p-5">
      <div>
        <p>{shortPubKey(sessId)}</p>
        <input title="name" type="text" />
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <div className="relative rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">name：</span>
            </div>
            <input
              type="text"
              title="name"
              className="block rounded-md border-0 py-1.5 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          onClick={updateProfileAction}
          className="rounded-md border border-transparent bg-indigo-600 p-2  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          updateProfile
        </button>
      </div>

      <div className="mt-5 flex gap-5 shadow-sm">
        {Object.values(Tab).map((item) => {
          return (
            <div
              key={item.toString()}
              className={`${
                tab === item ? "border-indigo-500" : "border-white"
              } border-b-2 px-2 cursor-pointer`}
              onClick={() => {
                setTab(item as Tab);
              }}
            >
              <span>{item}</span>
            </div>
          );
        })}
      </div>

      {tab === Tab.Thread && (
        <div>
          {threads.map((item) => {
            return <div key={item.node.id}>{item.node.url}</div>;
          })}
        </div>
      )}

      {tab === Tab.Comment && (
        <div>
          {comments.map((item) => {
            return (
              <div key={item.node.id}>
                {item.node.text}
                <div>{item.node.thread?.url}</div>
              </div>
            );
          })}
        </div>
      )}

      {tab === Tab.Favor && (
        <div>
          {favors.map((item) => {
            return <div key={item.node.id}>{item.node.thread?.url}</div>;
          })}
        </div>
      )}

      {tab === Tab.Score && (
        <div>
          {scores.map((item) => {
            return (
              <div key={item.node.id}>
                {item.node.text}
                <p>{item.node.thread?.url}</p>
              </div>
            );
          })}
        </div>
      )}

      {tab === Tab.Vote && (
        <div>
          {votes.map((item) => {
            return (
              <div key={item.node.id}>
                {item.node.type}
                <p>{item.node.thread?.url}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
