import React, { useState, useRef } from 'react'
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Linking,
  View,
  Modal
} from 'react-native'
import { login } from 'shopify-passwordless-login' // TODO pull types in and use
import { WebView } from 'react-native-webview'

const store = 'dimensionsoftware', // YOUR-STORE.myshopify.com
  { passwordless, social } = login(store),
  { height, width } = Dimensions.get('window')

export default function Login() {
  const [email, setEmail] = useState<string>(''),
    [socialUri, setSocialUri] = useState<string>(''),
    webView = useRef(null),
    doLogin = async () => {
      // initiate passwordless email login
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
    doSocialLogin = async (network: string) => {
      // initiate social login
      setSocialUri(social(network))
    },
    emailChanged = (v: string) => {
      setEmail(v)
    },
    SocialButton = ({ network }) => (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.socialButton}
        onPress={_ => doSocialLogin(network)}
      >
        <Text style={styles.socialButtonText}>{capitalize(network)}</Text>
      </TouchableOpacity>
    )

  // render
  return (
    <ImageBackground source={require('./assets/bg.png')} style={styles.bg}>
      <StatusBar hidden />
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
      <View style={styles.row}>
        <SocialButton network="facebook" />
        <SocialButton network="twitter" />
        <SocialButton network="google" />
        <SocialButton network="linkedin" />
      </View>
      <Modal visible={!!socialUri} animationType="slide">
        <WebView
          ref={webView}
          source={{
            uri: socialUri
          }}
          onShouldStartLoadWithRequest={e => {
            if (e.url.match(/^passwordless-/)) {
              // success, so--
              setSocialUri('') // reset ui
              Linking.openURL(e.url) // send CustomerAccessToken to app
              webView.current.stopLoading() // halt webView
              return false
            }
            return true
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.webView}
        />
        <TouchableOpacity
          style={styles.closeModal}
          onPress={() => {
            setSocialUri('')
          }}
        >
          <Text>CLOSE</Text>
        </TouchableOpacity>
      </Modal>
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
  row: { flexDirection: 'row' },
  button: {
    height: 60,
    width: 300,
    textAlign: 'center',
    borderRadius: 2,
    backgroundColor: '#96c',
    marginBottom: 50
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
    color: '#fff'
  },
  socialButton: { marginHorizontal: 5 },
  socialButtonText: { fontSize: 17, color: '#96c' },
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
  },
  webView: { backgroundColor: '#fff', flex: 1, height, width },
  closeModal: { position: 'absolute', top: 50, right: 30 }
})

// helper fns
// ---------
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
