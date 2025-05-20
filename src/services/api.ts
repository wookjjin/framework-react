/* eslint-disable prettier/prettier */
import { createApi } from '@reduxjs/toolkit/query/react'

import { supabase } from './supabase'

// 타입 정의
export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

// API 요청 파라미터 타입 정의
interface ApiRequest {
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: Omit<User, 'id' | 'created_at'>
}

// 커스텀 baseQuery 생성
const supabaseBaseQuery = () => async ({ url, method, body }: ApiRequest) => {
  try {
    let result

    switch (method) {
      case 'GET':
        if (url.includes('/')) {
          // 단일 사용자 조회
          const id = url.split('/')[1]
          result = await supabase.from('users').select('*').eq('id', id).single()
        } else {
          // 모든 사용자 조회
          result = await supabase.from('users').select('*')
        }
        break
      case 'POST':
        result = await supabase.from('users').insert(body).select()
        break
      case 'PATCH': {
        // 사용자 업데이트
        const id = url.split('/')[1]
        result = await supabase.from('users').update(body).eq('id', id).select()
        break
      }
      case 'DELETE': {
        // 사용자 삭제
        const userId = url.split('/')[1]
        result = await supabase.from('users').delete().eq('id', userId)
        break
      }
      default:
        throw new Error(`지원하지 않는 메서드: ${method}`)
    }

    if (result.error) throw result.error

    return { data: result.data }
  } catch (error) {
    return { error }
  }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: supabaseBaseQuery(),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: '', method: 'GET' }),
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, number>({
      query: id => ({ url: `/${id}`, method: 'GET' }),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    addUser: builder.mutation<User, CreateUserRequest>({
      query: user => ({
        url: '',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch as Omit<User, 'id' | 'created_at'>,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api
