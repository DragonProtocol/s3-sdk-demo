import { useCallback, useState } from "react";
import { useCeramicContext } from "../context";

export type Comment = {
  id: string;
  author: { id: string };
  text: string;
};

export type Post = {
  author: { id: string };
  comments: { edges: Array<{ node: Comment }> };
  commentsCount: number;
  id: string;
  title: string;
  text: string;
  date: string | null;
};

export default function usePost() {
  const { ceramic, postCommentComposeClient } = useCeramicContext();

  const [post, setPost] = useState<
    Array<{
      node: Post;
    }>
  >([]);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  }>();

  const getAllPost = useCallback(async () => {
    const res = await postCommentComposeClient.executeQuery(`
    query {
      postIndex(first: 10){
        edges {
          node {
            id
            author {
              id
            }
            date
            title
            text
            commentsCount
            comments(first: 10) {
              edges {
                node {
                  id
                  text
                  author {
                    id
                  }
                }
              }
              pageInfo {
                hasNextPage
                startCursor
                endCursor
              }
            }
          }
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
    
      }
    }
  `);
    if (res.errors) {
      console.error(res.errors[0]);
      return;
    }
    // console.log("getAllPost", (res.data as any).postIndex);
    const { pageInfo, edges } = (res.data as any).postIndex;
    setPageInfo(pageInfo);
    setPost(edges);
  }, [postCommentComposeClient]);

  const createNewPost = useCallback(
    async (title: string, text: string) => {
      console.log("createNewPost");
      if (!postCommentComposeClient.context.authenticated) {
        alert("connect wallet first");
        console.error("postCommentComposeClient not authenticated");
        return;
      }
      const createPostMutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        document {
          id
        }
      }
    }
    `;
      const res = await postCommentComposeClient.executeQuery(
        createPostMutation,
        {
          input: {
            content: { title, text, date: new Date().toISOString() },
          },
        }
      );
      if (res.errors) {
        console.error(res.errors);
        alert("fail");
        return;
      }
      alert("ok");
    },
    [postCommentComposeClient]
  );

  const createComment = useCallback(
    async (postId: string, text: string) => {
      if (!postCommentComposeClient.context.authenticated) {
        alert("connect wallet first");
        console.error("postCommentComposeClient not authenticated");
        return;
      }
      const createCommentMutation = `
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          document {
            id
          }
        }
      }
    `;
      const res = await postCommentComposeClient.executeQuery(
        createCommentMutation,
        {
          input: {
            content: {
              postID: postId,
              text: text,
            },
          },
        }
      );
      if (res.errors) {
        console.error(res.errors);
        return;
      }
      alert("ok");
    },
    [postCommentComposeClient]
  );

  return {
    post,
    getAllPost,
    createNewPost,
    createComment,
  };
}
