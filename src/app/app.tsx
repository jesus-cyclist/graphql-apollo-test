import { Main } from '@/pages'
import { Compose } from '@/shared'
import '@/shared/styles/base.scss'
import { WithAntd, WithApollo } from './providers'

export const App = () => {
    return (
        <Compose components={[WithApollo, WithAntd]}>
            <Main />
        </Compose>
    )
}
