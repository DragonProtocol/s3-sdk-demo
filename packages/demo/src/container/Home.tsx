import { useS3Context } from "@us3r/js-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";

import shortPubKey from "../utils/shortPubKey";

export default function Home() {
  // const { post, } = usePost();
  const { getAllPost, createNewPost, createNewComment } = useS3Context();
  const [post, setPost] = useState<Array<any>>([]);
  useEffect(() => {
    if (getAllPost) {
      getAllPost()
        .then((data) => {
          console.log(data);
          setPost(data.edges);
        })
        .catch(console.error);
    }
  }, [getAllPost]);

  return (
    <div>
      <CreatePostCard />
      {post.map((item) => {
        return (
          <PostCard key={item.node.id}>
            <div className="title">
              <h3>{item.node.title}</h3>

              <Author did={item.node.author.id} />
              <span>{item.node.date}</span>
            </div>
            <div>{item.node.text}</div>
            <SubmitComment postId={item.node.id} />
            <div>
              <p>commentCount: {item.node.commentsCount}</p>
              <div className="comments">
                {item.node.comments.edges.map((item: any) => {
                  return (
                    <CommentCard key={item.node.id}>
                      <Author did={item.node.author.id} />
                      <div className="comment">{item.node.text}</div>
                    </CommentCard>
                  );
                })}
              </div>
            </div>
          </PostCard>
        );
      })}
    </div>
  );
}

function CreatePostCard() {
  const { getAllPost, createNewPost, createNewComment } = useS3Context();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  return (
    <CreatePostCardBox>
      <h3>NewPost</h3>
      <input
        title="post title"
        placeholder="post title"
        value={postTitle}
        onChange={(e) => {
          setPostTitle(e.target.value);
        }}
      />
      <textarea
        title="post content"
        placeholder="post content"
        id=""
        value={postContent}
        onChange={(e) => {
          setPostContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createNewPost && createNewPost(postTitle, postContent);
        }}
      >
        createNewPost
      </button>
    </CreatePostCardBox>
  );
}

const CreatePostCardBox = styled.div`
  border: 1px solid gray;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const PostCard = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid gray;
  h3 {
    margin: 0;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .comments {
    margin-left: 1rem;
    > textarea {
      width: 100%;
      height: 100px;
    }
  }

  .submit-area {
    margin: 1rem 0;
  }
`;

const CommentCard = styled.div`
  border: 1px dotted gray;
  margin: 1rem;
  .comment {
    margin-left: 1rem;
  }
`;

function Author({ did }: { did: string }) {
  const { getProfileWithDid } = useS3Context();
  const [didProfile, setDidProfile] = useState<{
    genericProfile?: {
      name: string;
    };
  }>();
  useEffect(() => {
    if (getProfileWithDid) {
      getProfileWithDid(did)
        .then((data) => {
          setDidProfile(data);
        })
        .catch(console.error);
    }
  }, [did, getProfileWithDid]);

  //   console.log("didProfile", did, didProfile?.genericProfile.name);

  return (
    <div>
      <span>author:</span> <span>{didProfile?.genericProfile?.name}</span>
      <span style={{ marginLeft: "2px" }}>@{shortPubKey(did)}</span>
    </div>
  );
}

function SubmitComment({ postId }: { postId: string }) {
  const { getAllPost, createNewPost, createNewComment } = useS3Context();
  const [text, setText] = useState("");
  return (
    <div className="submit-area">
      <textarea
        title="comment"
        id=""
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          createNewComment && createNewComment(postId, text);
        }}
      >
        submit comment
      </button>
    </div>
  );
}
