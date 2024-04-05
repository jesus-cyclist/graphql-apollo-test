import { CREATE_TODO, GET_TODOS } from '@/shared'
import { TodosList } from '@/widgets'
import { useMutation, useQuery } from '@apollo/client'
import { Col, Input, Layout, Pagination, Row, Typography } from 'antd'
import { useMemo, useState } from 'react'
import s from './page.module.scss'

const { Content } = Layout
const { Search } = Input
const { Text } = Typography

export const Main = () => {
    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [createTodoValue, setCreateTodoValue] = useState('')
    const {
        loading,
        error,
        data: todosData
    } = useQuery(GET_TODOS, {
        variables: {
            options: {
                search: {
                    q: searchValue
                },
                sort: { field: 'title', order: 'ASC' },
                paginate: { page: page, limit: 10 }
            }
        }
    })

    const [createTodo] = useMutation(CREATE_TODO, {
        update(cache, { data: { createTodo } }) {
            cache.modify({
                fields: {
                    todos(currentTodos = []) {
                        return {
                            ...currentTodos,
                            data: [createTodo, ...currentTodos.data],
                            meta: {
                                ...currentTodos,
                                totalCount: currentTodos.meta.totalCount + 1
                            }
                        }
                    }
                }
            })
        }
    })

    const sortedData = useMemo(() => {
        if (todosData) {
            return todosData?.todos?.data.reduce(
                (acc: any, item: any) => {
                    item.completed
                        ? acc.completed.push(item)
                        : acc.uncompleted.push(item)
                    return acc
                },
                { completed: [], uncompleted: [] }
            )
        }
        return []
    }, [todosData])

    const onCreateTodo = () => {
        if (createTodoValue) {
            createTodo({
                variables: {
                    title: createTodoValue,
                    completed: false
                }
            })
        }
    }

    return (
        <Layout className={s.layout}>
            <Content className={s.content}>
                <Search
                    value={createTodoValue}
                    onChange={e => {
                        setCreateTodoValue(e.target.value)
                    }}
                    className={s.input}
                    placeholder='create new todo'
                    enterButton='Add'
                    onSearch={onCreateTodo}
                />
                <Search
                    value={searchValue}
                    onChange={e => {
                        setSearchValue(e.target.value)
                        setPage(1)
                    }}
                    className={s.input}
                    placeholder='input search text'
                    enterButton='Search'
                    loading={loading}
                />
                <Row
                    className={s.container}
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    justify={'center'}
                >
                    <Col className={s.column} span={12}>
                        <Text type='warning'>In process</Text>
                        <TodosList
                            list={sortedData.uncompleted}
                            isError={error?.message}
                            isLoading={loading}
                        />
                    </Col>
                    <Col className={s.column} span={12}>
                        <Text type='success'>Completed</Text>
                        <TodosList
                            list={sortedData.completed}
                            isError={error?.message}
                            isLoading={loading}
                        />
                    </Col>
                </Row>
                <Pagination
                    current={page}
                    total={todosData?.todos.meta.totalCount}
                    showSizeChanger={false}
                    onChange={page => setPage(page)}
                />
            </Content>
        </Layout>
    )
}
