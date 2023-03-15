// This is an auto-generated file, do not edit manually
export const definition = {
  "models": {
    "Favor": {
      "id": "kjzl6hvfrbw6c9fw4oqt1bfx8fl8uybv6j8dfhdq64bfu1a8xaibhxs7n6b4m55",
      "accountRelation": { "type": "list" },
    },
    "Score": {
      "id": "kjzl6hvfrbw6ca3tvfxyy22cz61tjy1vw3mshgadcpuqz1vcmkozn6rqkblaulc",
      "accountRelation": { "type": "list" },
    },
    "Vote": {
      "id": "kjzl6hvfrbw6ca6non5g02fc4qenz35u4b9u9tfdsdpwi37kpguj0up8w4aezmm",
      "accountRelation": { "type": "list" },
    },
    "Thread": {
      "id": "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
      "accountRelation": { "type": "list" },
    },
    "Comment": {
      "id": "kjzl6hvfrbw6cbchl36pvl4sd4g6rcbqjz0lfwtznd3eip3pp8r7gd3lycmf9ii",
      "accountRelation": { "type": "list" },
    },
  },
  "objects": {
    "Favor": {
      "threadID": { "type": "streamid", "required": true },
      "thread": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "document",
          "model":
            "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
          "property": "threadID",
        },
      },
      "creator": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
    },
    "Score": {
      "text": { "type": "string", "required": true },
      "value": { "type": "integer", "required": true },
      "threadID": { "type": "streamid", "required": true },
      "thread": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "document",
          "model":
            "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
          "property": "threadID",
        },
      },
      "creator": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
    },
    "Vote": {
      "type": {
        "type": "reference",
        "refType": "enum",
        "refName": "VoteType",
        "required": false,
      },
      "threadID": { "type": "streamid", "required": true },
      "thread": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "document",
          "model":
            "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
          "property": "threadID",
        },
      },
      "creator": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
    },
    "Thread": {
      "url": { "type": "string", "required": true },
      "date": { "type": "datetime", "required": false },
      "type": { "type": "string", "required": true },
      "creator": { "type": "view", "viewType": "documentAccount" },
      "votesCount": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryCount",
          "model":
            "kjzl6hvfrbw6ca6non5g02fc4qenz35u4b9u9tfdsdpwi37kpguj0up8w4aezmm",
          "property": "threadID",
        },
      },
      "votes": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryConnection",
          "model":
            "kjzl6hvfrbw6ca6non5g02fc4qenz35u4b9u9tfdsdpwi37kpguj0up8w4aezmm",
          "property": "threadID",
        },
      },
      "commentsCount": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryCount",
          "model":
            "kjzl6hvfrbw6cbchl36pvl4sd4g6rcbqjz0lfwtznd3eip3pp8r7gd3lycmf9ii",
          "property": "threadID",
        },
      },
      "comments": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryConnection",
          "model":
            "kjzl6hvfrbw6cbchl36pvl4sd4g6rcbqjz0lfwtznd3eip3pp8r7gd3lycmf9ii",
          "property": "threadID",
        },
      },
      "favorsCount": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryCount",
          "model":
            "kjzl6hvfrbw6c9fw4oqt1bfx8fl8uybv6j8dfhdq64bfu1a8xaibhxs7n6b4m55",
          "property": "threadID",
        },
      },
      "favors": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryConnection",
          "model":
            "kjzl6hvfrbw6c9fw4oqt1bfx8fl8uybv6j8dfhdq64bfu1a8xaibhxs7n6b4m55",
          "property": "threadID",
        },
      },
      "scoresCount": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryCount",
          "model":
            "kjzl6hvfrbw6ca3tvfxyy22cz61tjy1vw3mshgadcpuqz1vcmkozn6rqkblaulc",
          "property": "threadID",
        },
      },
      "scores": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "queryConnection",
          "model":
            "kjzl6hvfrbw6ca3tvfxyy22cz61tjy1vw3mshgadcpuqz1vcmkozn6rqkblaulc",
          "property": "threadID",
        },
      },
    },
    "Comment": {
      "text": { "type": "string", "required": true },
      "threadID": { "type": "streamid", "required": true },
      "thread": {
        "type": "view",
        "viewType": "relation",
        "relation": {
          "source": "document",
          "model":
            "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
          "property": "threadID",
        },
      },
      "creator": { "type": "view", "viewType": "documentAccount" },
      "version": { "type": "view", "viewType": "documentVersion" },
    },
  },
  "enums": { "VoteType": ["UP_VOTE", "DOWN_VOTE"] },
  "accountData": {
    "favorList": { "type": "connection", "name": "Favor" },
    "scoreList": { "type": "connection", "name": "Score" },
    "voteList": { "type": "connection", "name": "Vote" },
    "threadList": { "type": "connection", "name": "Thread" },
    "commentList": { "type": "connection", "name": "Comment" },
  },
};
