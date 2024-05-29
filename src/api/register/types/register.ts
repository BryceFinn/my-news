import { UserData } from '@/api/login/types/user'

export interface RegisterRequestData {
  alias: string
  /**
   * 用户邮箱，应进行前端和后端的格式校验。
   * 格式校验正则表达式：/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
   */
  username: string

  /**
   * 用户密码，客户端应先对密码进行哈希处理，服务端再进行验证。
   * 注意：实际传输中应避免明文密码，使用加密方式传输。
   */
  password: string

  /**
   * 验证码，用于验证用户身份。
   * 注意：验证码应通过安全的方式传输，且服务端应校验验证码的有效性、过期时间等。
   */
  captcha: string
}

export interface RegisterFormData {
  alias: string
  /**
   * 用户邮箱，应进行前端和后端的格式校验。
   * 格式校验正则表达式：/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
   */
  username: string

  /**
   * 用户密码，客户端应先对密码进行哈希处理，服务端再进行验证。
   * 注意：实际传输中应避免明文密码，使用加密方式传输。
   */
  password_input: string

  password_check: string

  /**
   * 验证码，用于验证用户身份。
   * 注意：验证码应通过安全的方式传输，且服务端应校验验证码的有效性、过期时间等。
   */
  captcha: string
}

export type RegisterResponseData = ApiResponseData<UserData>
