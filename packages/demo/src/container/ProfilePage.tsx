import { useUs3rProfileContext, WalletChainType } from "@us3r-network/profile";
import {
  Thread,
  Comment,
  Vote,
  Score,
  Favor,
  useUs3rThreadContext,
} from "@us3r-network/thread";
import { Profile as ProfileKit } from "@us3r-network/authkit";
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
    updateComment,
    updateScore,
  } = useUs3rThreadContext()!;

  // const [name, setName] = useState("");
  const [threads, setThreads] = useState<Array<Edge<Thread>>>([]);
  const [comments, setComments] = useState<Array<Edge<Comment>>>([]);
  const [scores, setScores] = useState<Array<Edge<Score>>>([]);
  const [votes, setVotes] = useState<Array<Edge<Vote>>>([]);
  const [favors, setFavors] = useState<Array<Edge<Favor>>>([]);
  const [tab, setTab] = useState(Tab.Thread);

  // useEffect(() => {
  //   console.log({ profile });
  //   setName(profile?.name || "");
  // }, [profile]);

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
    <div className="container max-w-5xl mx-auto p-5 flex gap-10">
      <div>{sessId && <ProfileKit did={sessId} />}</div>

      <div>
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

                  <button
                    onClick={() => {
                      if (!item.node.thread?.id) return;
                      updateComment({
                        commentId: item.node.id,
                        threadId: item.node.thread?.id,
                        text: "hahah",
                      });
                    }}
                  >
                    update
                  </button>
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
                  <button
                    onClick={() => {
                      if (!item.node.thread?.id) return;
                      updateScore({
                        scoreId: item.node.id,
                        value: item.node.value,
                        text: item.node.text + " - haha",
                        threadId: item.node.thread.id,
                      });
                    }}
                  >
                    update
                  </button>
                  <br />
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
    </div>
  );
}
