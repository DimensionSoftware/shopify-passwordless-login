// Type definitions for shopify-passwordless-login
// Project: https://github.com/DimensionSoftware/shopify-passwordless-login
// Definitions by: Team Dimension <https://github.com/DimensionSoftware>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type SocialParams = 'google' | 'facebook' | 'twitter' | 'linkedin'

interface PasswordlessUserParams {
  email: string
}

interface PasswordlessParams extends PasswordlessUserParams {
  native: number
  code: string
}

export interface Login {
  social: (socialParams: SocialParams) => string
  passwordless: (userParams: PasswordlessUserParams) => Promise<void>
}

export function login(store: string): Login
