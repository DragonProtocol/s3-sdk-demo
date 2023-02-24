// This is an auto-generated file, do not edit manually
export const definition = {
  "models": {
    "GenericProfile": {
      "id": "kjzl6hvfrbw6c8x4i9yelbeutwk0ertaamllzfgtfykbfelavpwy6cpuimlopko",
      "accountRelation": { "type": "single" },
    },
  },
  "objects": {
    "GenericProfileImageMetadata": {
      "src": { "type": "string", "required": true },
      "size": { "type": "integer", "required": false },
      "width": { "type": "integer", "required": true },
      "height": { "type": "integer", "required": true },
      "mimeType": { "type": "string", "required": true },
    },
    "GenericProfileImageSources": {
      "original": {
        "type": "reference",
        "refType": "object",
        "refName": "GenericProfileImageMetadata",
        "required": true,
      },
      "alternatives": {
        "type": "list",
        "required": false,
        "item": {
          "type": "reference",
          "refType": "object",
          "refName": "GenericProfileImageMetadata",
          "required": false,
        },
      },
    },
    "GenericProfile": {
      "name": { "type": "string", "required": false },
      "image": {
        "type": "reference",
        "refType": "object",
        "refName": "GenericProfileImageSources",
        "required": false,
      },
    },
  },
  "enums": {},
  "accountData": {
    "genericProfile": { "type": "node", "name": "GenericProfile" },
  },
};
