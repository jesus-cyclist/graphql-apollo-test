import { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://graphqlzero.almansi.me/api',
    cache: new InMemoryCache()
})

export const WithApollo = ({ children }: { children: ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
