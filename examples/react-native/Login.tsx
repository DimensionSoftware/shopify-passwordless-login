import React, { useState } from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
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
      if (!url && !url.length) return // guard
      const { path, queryParams } = Linking.parse(url)
      alert(
        `Linked to app with path: ${path} and data: ${JSON.stringify(
          queryParams
        )}`
      )
    }

  // listen for open url via custom linking scheme
  Linking.addEventListener('url', handleRedirect)
  Linking.getInitialURL().then((url: string) => handleRedirect(url))

  // render
  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.bg}>
      <Text style={styles.h1}>PASSWORDLESS LOGIN</Text>
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
      <TouchableOpacity style={styles.button} onPress={doLogin}>
        <Text style={styles.buttonText}>LOGIN or SIGN UP</Text>
      </TouchableOpacity>
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
    color: 'rgba(255,255,255,.95)',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: -175
  },
  button: {},
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffc600'
  },
  email: {
    height: 60,
    fontSize: 17,
    marginBottom: 25,
    width: 300,
    textAlign: 'center',
    color: '#333',
    fontWeight: '400',
    backgroundColor: 'rgba(255,255,255,.95)',
    borderRadius: 4
  }
})
