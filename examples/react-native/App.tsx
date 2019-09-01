import React from 'react'
import { StyleSheet, View } from 'react-native'
import Login from './Login'
import { Linking } from 'expo'

// listen for open url via custom linking scheme
const handleRedirect = (url: string) => {
  if (!url && !url.length) return // guard
  const { path, queryParams } = Linking.parse(url)
  if (path.length)
    alert(
      `Linked to app with path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    )
}
Linking.addEventListener('url', handleRedirect) // app running in background
Linking.getInitialURL().then((url: string) => handleRedirect(url)) // app launched

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
