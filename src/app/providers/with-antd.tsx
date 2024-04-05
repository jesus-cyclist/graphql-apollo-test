import { ConfigProvider, theme } from 'antd'
import { ReactNode } from 'react'

export const WithAntd = ({ children }: { children: ReactNode }) => {
    return (
        <ConfigProvider
            theme={
                {
                    //  algorithm: theme.darkAlgorithm
                }
            }
        >
            {children}
        </ConfigProvider>
    )
}
