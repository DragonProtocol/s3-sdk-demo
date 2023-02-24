import React, { useCallback } from "react";
import { createContext, useContext } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { definition as profileDefinition } from "./__generated__/profile-definition";
import { definition as postCommentDefinition } from "./__generated__/post-comment-relation-definition";
export { authWithEthereum, authWithPhantom } from "./utils/auth";

const CeramicContext = createContext<{
  ceramic?: CeramicClient;
  profileComposeClient?: ComposeClient;
  postCommentComposeClient?: ComposeClient;
  getPersonalProfile?: () => Promise<any>;
  updatePersonalProfile?: (name: string) => Promise<void>;
  getProfileWithDid?: (did: string) => Promise<any>;
  getAllPost?: () => Promise<any>;
  getPersonalPost?: () => Promise<any>;
  getPersonalComment?: () => Promise<any>;
  createNewComment?: (postId: string, text: string) => Promise<void>;
  createNewPost?: (title: string, text: string) => Promise<void>;
}>({});

export const S3Provider = ({
  ceramicHost,
  children,
}: React.PropsWithChildren & {
  ceramicHost: string;
}) => {
  const ceramic = new CeramicClient(ceramicHost);
  const profileComposeClient = new ComposeClient({
    ceramic: ceramicHost,
    definition: profileDefinition as RuntimeCompositeDefinition,
  });

  const postCommentComposeClient = new ComposeClient({
    ceramic: ceramicHost,
    definition: postCommentDefinition as RuntimeCompositeDefinition,
  });

  const getPersonalProfile = useCallback(async () => {
    if (!profileComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }
    const profile = await profileComposeClient.executeQuery(`
      query {
        viewer {
          genericProfile {
            id
            name
            image {
              original {
                src
                mimeType
                width 
              }
            }
          }
        }
      }
    `);

    if (profile.errors) {
      throw profile.errors;
    }
    return (profile?.data?.viewer as any)?.genericProfile;
  }, [profileComposeClient]);

  const updatePersonalProfile = useCallback(
    async (name: string) => {
      if (!profileComposeClient.context.isAuthenticated) {
        throw new Error("authorized with wallet first");
      }
      const query = `
        mutation($input: CreateGenericProfileInput!) {
            createGenericProfile(input: $input) {
                document {
                    id
                    name
                }
            }
        }
        `;
      const update = await profileComposeClient.executeQuery(query, {
        input: {
          content: {
            name,
          },
        },
      });

      if (update.errors) {
        throw update.errors;
      }
    },
    [profileComposeClient]
  );

  const getProfileWithDid = useCallback(
    async (did: string) => {
      const createPostMutation = `
        query ($id: ID!) {
          node(id: $id) {
            ...on CeramicAccount {
              id
              genericProfile {
                id
                name
              }
            }
          }
        }
      `;
      const res = await profileComposeClient.executeQuery(createPostMutation, {
        id: did,
      });

      if (res.errors) {
        throw res.errors;
      }
      return res?.data?.node as any;
    },
    [profileComposeClient]
  );

  const getAllPost = useCallback(async () => {
    if (!postCommentComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }
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
      throw res.errors;
    }
    // console.log("getAllPost", (res.data as any).postIndex);
    // const { pageInfo, edges } = ;
    return (res.data as any).postIndex;
  }, [postCommentComposeClient]);

  const getPersonalPost = useCallback(async () => {
    if (!postCommentComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }
    const res = await postCommentComposeClient.executeQuery(`
      query {
        viewer {
          postList(first: 5) {
            edges {
              node {
                id
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
          }
        }
      }
    `);
    if (res.errors) {
      throw res.errors;
    }
    return (res.data?.viewer as any).postList;
  }, [postCommentComposeClient]);

  const getPersonalComment = useCallback(async () => {
    if (!postCommentComposeClient.context.isAuthenticated) {
      throw new Error("authorized with wallet first");
    }
    const res = await postCommentComposeClient.executeQuery(`
      query {
        viewer {
          commentList(first: 5) {
            edges {
              node {
                id
                text
                postID
              }
            }
          }
        }
      }
    `);
    if (res.errors) {
      throw res.errors;
    }
    return res.data?.viewer;
  }, [postCommentComposeClient]);

  const createNewPost = useCallback(
    async (title: string, text: string) => {
      if (!postCommentComposeClient.context.isAuthenticated) {
        throw new Error("authorized with wallet first");
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
        throw res.errors;
      }
    },
    [postCommentComposeClient]
  );

  const createNewComment = useCallback(
    async (postId: string, text: string) => {
      if (!postCommentComposeClient.context.isAuthenticated) {
        throw new Error("authorized with wallet first");
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
        throw res.errors;
      }
    },
    [postCommentComposeClient]
  );

  return (
    <CeramicContext.Provider
      value={{
        ceramic,
        profileComposeClient,
        postCommentComposeClient,
        getPersonalProfile,
        updatePersonalProfile,
        getProfileWithDid,
        getAllPost,
        getPersonalComment,
        getPersonalPost,
        createNewComment,
        createNewPost,
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export const useS3Context = () => useContext(CeramicContext);
