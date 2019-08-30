import React, { useState } from 'react'
import {
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native'
import { Linking } from 'expo'
import { login } from 'shopify-passwordless-login'

const store = 'dimensionsoftware', // YOUR-STORE.myshopify.com
  { passwordless } = login(store)

export default function Login() {
  const [email, setEmail] = useState(''),
    doLogin = async () => {
      const r = await passwordless({ email })
      // console.warn(r)
      alert(
        r.success
          ? 'Check your email for a login link!'
          : 'Please reenter your email address.'
      )
    },
    emailChanged = (v: string) => {
      setEmail(v)
    },
    handleRedirect = (url: string) => {
      const { path, queryParams } = Linking.parse(url)
      alert(
        `Linked to app with path: ${path} and data: ${JSON.stringify(
          queryParams
        )}`
      )
    }

  // listen for open via custom linking scheme
  Linking.addEventListener('url', handleRedirect)

  // render
  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.bg}>
      <Text style={styles.h1}>Passwordless Demo</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        keyboardAppearance="dark"
        keyboardType="email-address"
        placeholder="your@email.com"
        onChangeText={emailChanged}
        style={styles.email}
        value={email}
      />
      <Button title="LOGIN" color="#fff" onPress={doLogin} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  h1: {
    color: 'rgba(255,255,255,.75)',
    fontSize: 18,
    marginBottom: 25,
    marginTop: -75
  },
  email: {
    height: 50,
    fontSize: 17,
    marginBottom: 25,
    width: 250,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(100,100,100,.95)'
  }
})
