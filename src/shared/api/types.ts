/* eslint-disable no-unused-vars */

export type TTodo = {
    id: string
    title: string
    completed: boolean
    user?: TUser
}

export type TUser = {
    id: string
    name: string
    username: string
    email: string
    address: TAddress
    phone: string
    website: string
    company: TCompany
    posts: (options: TPageQueryOptions) => TPostsPage
    albums: (options: TPageQueryOptions) => TAlbumsPage
    todos: (options: TPageQueryOptions) => TTodosPage
}

export type TAddress = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: TGeo
}

export type TGeo = {
    lat: number
    lng: number
}

export type TCompany = {
    name: string
    catchPhrase: string
    bs: string
}

export type TPageQueryOptions = {}

export type TPostsPage = {}

export type TAlbumsPage = {}

export type TTodosPage = {}
