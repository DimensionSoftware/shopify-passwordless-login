<p align="center">

# Shopify Passwordless Login

[![Dimension Software][html5-image]][ds-link]
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/DimensionSoftware/shopify-passwordless-login/issues)
[![HitCount](http://hits.dwyl.io/DimensionSoftware/shopify-passwordless-login.svg)](http://hits.dwyl.io/DimensionSoftware/shopify-passwordless-login)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)][ds-link]

</p>

## Native iOS + Android Support

[Login to Shopify, Passwordlessly][pw-link] using this example React Native codebase, no native modules to link & [Expo friendly!][expo-link]
<br />
<br />

[![Shopify Passwordless Login for React Native Apps][ss-image]][pw-link]


## Quick Start

```
$ yarn add shopify-passwordless-login
```

<br />

#### *Step 1* &nbsp; // &nbsp; [Create a Storefront Access Token][sat-link]
Navigate to Passwordless Social Login in your Shopify Apps settings and scroll to Optional Install Instructions -> Native Apps.   Paste the created token into this setting, allowing us to generate a CustomerAccessToken for Step 2.

Mailing a [secure login link](https://github.com/DimensionSoftware/shopify-passwordless-login/blob/master/examples/react-native/Login.tsx#L26-L39) or [logging in socially](https://github.com/DimensionSoftware/shopify-passwordless-login/blob/master/examples/react-native/Login.tsx#L92-L111) is simple:

```
import { login } from 'shopify-passwordless-login'

const
  store                    = 'dimensionsoftware', // YOUR-STORE.myshopify.com
  email                    = 'test@email.com',    // magic link destnation
  { passwordless, social } = login(store)

// initiate passwordless email
const r = await passwordless({ email })
if (r.success) {
  // login link successfully mailed
  alert(`Please check ${email} for a Login Link and Security Code matching ${r.code}`)
} else {
  // error
  console.warn(r.error)
}

// or, initiate passwordless social
// SocialParams is one of:  'facebook', 'linkedin', 'twitter', 'google'
const uri = social('facebook')
// uri can then be used as:
//   - the source for a <WebView />
//   - or, to kick-off OAuth, eg. with Google
```

<br />

#### *Step 2* &nbsp; // &nbsp; [Handle your Custom URI Scheme][custom-link]
Native Apps must respond to a custom URI scheme containing a Shopify CustomerAccessToken which we generate from your Storefront Access Token.  [First edit your app.json](https://github.com/DimensionSoftware/shopify-passwordless-login/blob/master/examples/react-native/app.json#L5) and the rest is simple:

```
import { Linking } from 'react-native'

// listen for open url via custom linking scheme
const handleRedirect = url => {
  if (!url && !url.length) return // guard
  const { path, queryParams } = Linking.parse(url)
  // path contains your CustomerAccessToken
  if (path.length)
    alert(
      `Linked to app with path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    )
}
Linking.addEventListener('url', handleRedirect)          // app running in background
Linking.getInitialURL().then(url => handleRedirect(url)) // app launched

```

<br />

#### Optional *Step 3* &nbsp; // &nbsp; [Cart Checkout and Payment][checkout-link]
Customers love your fast & secure Passwordless flow, loaded their cart up with goods and are ready to checkout!  Passing the CustomerAccessToken through as a header to the webUrl from Shopify's Storefront API Checkout allows for a smooth Payment Gateway transition:

```
import { WebView } from 'react-native-webview'

<WebView
  style={{ flex: 1 }}
  source={{
    uri: webUrl, // from Shopify's Storefront API Checkout object
    headers: {   // from handleRedirect, above
      'X-Shopify-Customer-Access-Token': customerAccessToken
    }
  }}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
/>
```

<br />
<br />
<br />
<p align="center">

[![Fresh Software by Dimension][ds-image]][ds-link]

</p>

[checkout-link]: https://help.shopify.com/en/api/storefront-api/reference/object/checkout
[custom-link]: https://blog.gisspan.com/2017/02/Implementing-OAuth-on-mobile-Facebook-login-as-example.html
[sat-link]: https://help.shopify.com/en/api/storefront-api/getting-started
[pw-link]: https://login.dimensionsoftware.com
[ds-link]: https://dimensionsoftware.com
[expo-link]: https://expo.io
[ss-image]: ./examples/react-native/assets/screenshot.png
[is-image]: https://dimensionsoftware.com/static/images/layout/dimension_icon.png
[html5-image]: http://img.shields.io/badge/HTML-5-blue.svg?style=flat
[ds-image]: https://dimensionsoftware.com/static/images/github/software_by.png
