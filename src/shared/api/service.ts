import { gql } from '@apollo/client'

export const GET_TODOS = gql`
    query Todos($options: PageQueryOptions) {
        todos(options: $options) {
            data {
                id
                title
                completed
            }
            meta {
                totalCount
            }
        }
    }
`

export const CREATE_TODO = gql`
    mutation CreateTodo($title: String!, $completed: Boolean!) {
        createTodo(input: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`

export const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: ID!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $id, input: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
    }
`
