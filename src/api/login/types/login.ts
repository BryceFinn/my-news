/**
 * LoginRequestData 接口定义了登录请求需要的数据结构。
 * 注意：在实际应用中，为了保证数据安全，密码应该在客户端先进行哈希处理，
 * 并且邮箱和验证码应该通过安全的HTTPS协议进行传输。
 */
export interface LoginRequestData {
  /**
   * 用户邮箱，应进行前端和后端的格式校验。
   * 格式校验正则表达式：/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
   */
  username: 'admin' | 'editor'

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

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
