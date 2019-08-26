import fetch from 'node-fetch'
import * as queryString from 'query-string'
import { SocialParams, PasswordlessUserParams, Login } from './types'

export const login = (store: string): Login => {
  return {
    // kick-off $social flow
    social: (social: SocialParams) => {
      // TODO a real WebBrowser must make this request
      return `https://${store}.myshopify.com/apps/dimensionauth/${social}/1?native=1`
    },
    // kick-off passwordless email flow
    passwordless: async (params: PasswordlessUserParams) => {
      const res = await fetch(
        `https://${store}.myshopify.com/apps/dimensionauth/passwordless?${queryString.stringify(
          {
            email: params.email,
            native: 1,
            code: `${pair()} &nbsp; ${pair()} &nbsp; ${Math.floor(
              Math.random() * 10
            )}`
          }
        )}`
      )
      return res.json()
    }
  }
}

// helper fns
// --------
function pair(): string {
  const vowels = ['a', 'e', 'i', 'o', 'u'],
    consonants = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'q',
      'r',
      's',
      't',
      'v',
      'w',
      'x',
      'y',
      'z'
    ]
  return (
    consonants[Math.floor(Math.random() * consonants.length)] +
    vowels[Math.floor(Math.random() * vowels.length)]
  )
}
