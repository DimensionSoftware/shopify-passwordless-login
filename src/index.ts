// ts definitions
export type SocialParams = 'google' | 'facebook' | 'twitter' | 'linkedin'
export interface UserParams {
  email: string
  lng?: number
  lat?: number
}
export interface LoginResponse {
  readonly success: boolean
  readonly error?: string
  readonly code?: string
}
export interface Login {
  social: (socialParams: SocialParams) => string
  passwordless: (userParams: UserParams) => Promise<LoginResponse>
}

export { login } from './api'
