# @us3r-network/data-model-provider

## Usage

### demo with S3Profile

```tsx

import S3ProfileModel from '@us3r-network/data-model-profile'
import S3DataModelProvider, { useS3DataModelContext } from '@us3r-network/data-model-provider'

const CERAMIC_HOST = process.env.CERAMIC_HOST

const s3Profile = new S3ProfileModel(CERAMIC_HOST)

function AuthWrap() {
    const { authModelWithSess } = useS3DataModelContext()

    const { sess } = /* */

    const authAction = useCallback(() => {
        authModelWithSess(sess)
    }, [sess])

    return (
        <div>
            <button onClick={authAction}> auth</button>
        </div>
    )
}

export default function App() {
    return (
        <S3DataModelProvider models={[s3Profile]}>
            <AuthWrap />
        </S3DataModelProvider>
    )
}

```