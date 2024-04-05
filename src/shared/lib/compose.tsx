import { JSXElementConstructor, PropsWithChildren, ReactNode } from 'react'

interface Props {
    components: Array<JSXElementConstructor<PropsWithChildren<unknown>>>
    children: ReactNode
}

export function Compose(props: Props) {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}
