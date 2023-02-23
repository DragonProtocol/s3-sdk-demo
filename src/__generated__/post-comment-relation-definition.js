// This is an auto-generated file, do not edit manually
export const definition = {
  "models": {
    "Comment": {
      "id": "kjzl6hvfrbw6c9kjluv1q2f0j0ymmex2r0evfz64ic83o7xxkhfsaomec8lpgm1",
      "accountRelation": { "type": "list" },
    },
    "Post": {
      "id": "kjzl6hvfrbw6c6v5021mgrovg3mdrut7v0984mlk91a28dkssohmksmw9myzie0",
      "accountRelation": { "type": "list" },
    },
  },
  "objects": {
    "Comment": {
      "text": { "type": "string", "required": true },
      "postID": { "type": "streamid", "required": true },
      "post": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "document",
          "model":
            "kjzl6hvfrbw6c6v5021mgrovg3mdrut7v0984mlk91a28dkssohmksmw9myzie0",
          "property": "postID",
        },
      },
      "author": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
    },
    "Post": {
      "date": { "type": "datetime", "required": false },
      "text": { "type": "string", "required": true },
      "title": { "type": "string", "required": true },
      "author": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
      "commentsCount": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryCount",
          "model":
            "kjzl6hvfrbw6c9kjluv1q2f0j0ymmex2r0evfz64ic83o7xxkhfsaomec8lpgm1",
          "property": "postID",
        },
      },
      "comments": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryConnection",
          "model":
            "kjzl6hvfrbw6c9kjluv1q2f0j0ymmex2r0evfz64ic83o7xxkhfsaomec8lpgm1",
          "property": "postID",
        },
      },
    },
  },
  "enums": {},
  "accountData": {
    "commentList": { "type": "connection", "name": "Comment" },
    "postList": { "type": "connection", "name": "Post" },
  },
};
