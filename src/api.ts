import fetch from 'node-fetch'
import * as queryString from 'query-string'
import * as pwless from './index'

export const login = (store: string): pwless.Login => {
  return {
    // kick-off $social flow
    social: (social: pwless.SocialParams) => {
      // a real WebBrowser must make this request so redirects happen
      return `https://${shopifyDomainFrom(
        store
      )}/apps/dimensionauth/${social}/1?native=1`
    },
    // kick-off passwordless email flow
    passwordless: async (params: pwless.UserParams) => {
      const email = params.email,
        code = `${pair()} ${pair()} ${Math.floor(Math.random() * 10)}`
      if (email && email.length > 5 && email.indexOf('@') > -1) {
        const res = await fetch(
            `https://${shopifyDomainFrom(
              store
            )}/apps/dimensionauth/passwordless?${queryString.stringify({
              email,
              code,
              native: 1
            })}`
          ),
          json = await res.json()
        return json
      }
      return { success: false }
    }
  }
}

// helper fns
// --------
function shopifyDomainFrom(domain: string) {
  if (domain.indexOf('myshopify.com') >= 0) {
    return domain
  } else {
    return domain.indexOf('.') === -1 ? `${domain}.myshopify.com` : domain // should be a shopify stores' full domain
  }
}

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
