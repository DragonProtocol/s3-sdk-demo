// This is an auto-generated file, do not edit manually
export const definition = {
  "models": {
    "Thread": {
      "id": "kjzl6hvfrbw6cafpnfd031iecghmu2bfuhmm38jzf2pywnr3fsp8sh8ow93oihs",
      "accountRelation": { "type": "list" },
    },
  },
  "objects": {
    "Thread": {
      "url": { "type": "string", "required": true },
      "date": { "type": "datetime", "required": false },
      "type": { "type": "string", "required": true },
      "creator": { "type": "view", "viewType": "documentAccount" },
    },
  },
  "enums": {},
  "accountData": { "threadList": { "type": "connection", "name": "Thread" } },
};
