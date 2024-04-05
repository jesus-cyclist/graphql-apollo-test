import { DELETE_TODO, TOGGLE_TODO, type TTodo } from '@/shared'
import s from './todos-list.module.scss'
import { Alert, Button, List, Spin } from 'antd'
import { useMutation } from '@apollo/client'

type Props = {
    list: Array<TTodo>
    isError: string
    isLoading: boolean
}

export const TodosList = (props: Props) => {
    const { list, isError, isLoading } = props
    const [toggleTodo] = useMutation(TOGGLE_TODO)
    const [deleteTodo] = useMutation(DELETE_TODO)

    if (isError) {
        return <Alert message={isError} type='error' closable />
    }

    if (isLoading) {
        return <Spin />
    }

    const onToggleTodo = (
        id: any,
        { title, completed }: { title: any; completed: any }
    ) => {
        toggleTodo({
            variables: {
                id,
                title,
                completed
            }
        })
    }

    const onDeleteTodo = (id: any) => {
        deleteTodo({
            variables: {
                id
            }
        })
    }

    return (
        <List
            className={s.list}
            itemLayout='horizontal'
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Button
                            key='list-toggle-complete'
                            onClick={() =>
                                onToggleTodo(item.id, {
                                    title: item.title,
                                    completed: !item.completed
                                })
                            }
                        >
                            toggle complete
                        </Button>,
                        <Button
                            key='list-delete-item'
                            onClick={() => onDeleteTodo(item.id)}
                        >
                            delete
                        </Button>
                    ]}
                >
                    <List.Item.Meta title={item.title} />
                </List.Item>
            )}
        />
    )
}
