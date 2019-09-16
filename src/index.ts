// ts definitions
export type SocialParams = 'google' | 'facebook' | 'twitter' | 'linkedin'
export interface UserParams {
  email: string
}
export interface Login {
  social: (socialParams: SocialParams) => string
  passwordless: (userParams: UserParams) => Promise<void>
}

export { login } from './api'
