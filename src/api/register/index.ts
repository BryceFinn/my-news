import { request } from '@/utils/service'
import type * as Register from './types/register'

export function registerApi(data: Register.RegisterRequestData) {
  return request<Register.RegisterResponseData>({
    url: 'auth/user',
    method: 'post',
    data
  })
}
