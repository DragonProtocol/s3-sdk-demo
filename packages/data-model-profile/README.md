# @us3r-network/data-model-profile

## Usage

### Init Profile instance

```ts
...

import S3ProfileModel from '@us3r-network/data-model-profile'

const CERAMIC_HOST = process.env.CERAMIC_HOST

const s3Profile = new S3ProfileModel(CERAMIC_HOST)
...

```

### Auth Profile instance with did-session

```ts
const didSession = '...'
s3Profile.authModelWithSess(didSession)
```

