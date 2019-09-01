import React, { useState } from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import { login } from 'shopify-passwordless-login'

const store = 'dimensionsoftware', // YOUR-STORE.myshopify.com
  { passwordless } = login(store)

export default function Login() {
  const [email, setEmail] = useState(''),
    doLogin = async () => {
      // initiate passwordless
      const r = await passwordless({ email })
      if (r.error && r.error.indexOf('GraphQL'))
        console.warn(
          'Set your Customer Access Token in the Passwordless Shopify Admin -> Native Apps!'
        )
      // ui feedback
      alert(
        r.success
          ? 'Check your email for a login link!'
          : 'Please reenter your email address.'
      )
    },
    emailChanged = (v: string) => {
      setEmail(v)
    }

  // render
  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.bg}>
      <Image
        source={require('./assets/dimension_icon_square.png')}
        resizeMode={'contain'}
        style={styles.icon}
      />
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
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={doLogin}
      >
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
  icon: { marginTop: -250, height: 50 },
  h1: {
    color: 'rgba(255,255,255,.95)',
    fontSize: 17,
    marginBottom: 50,
    marginTop: 50
  },
  button: {
    height: 60,
    width: 300,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#96c'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
    color: '#fff'
  },
  email: {
    height: 60,
    fontSize: 17,
    marginBottom: 15,
    width: 300,
    textAlign: 'center',
    color: '#333',
    fontWeight: '400',
    backgroundColor: 'rgba(255,255,255,.95)',
    borderRadius: 4
  }
})
