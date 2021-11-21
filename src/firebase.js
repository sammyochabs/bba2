// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import '@firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACpcwOh1a6J8JRxpYubwc44TCV9iKGXZ4',
  authDomain: 'bba-erp.firebaseapp.com',
  projectId: 'bba-erp',
  storageBucket: 'bba-erp.appspot.com',
  messagingSenderId: '980167107299',
  appId: '1:980167107299:web:cb1c5dca982a99524e1bd6',
  measurementId: 'G-SX9G3GED95',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

export const getToken = async () => {
  debugger
  console.log(
    '------------------------------------ here is token ----------------',
  )
  return messaging
    .getToken({
      vapidKey:
        'BCxav5LuJGZhrZoRgrn7I7wF4A8yxEztuy0a2hcBXpHzJwpIRZ3nkNUbMPnYgSV2MqeHQoHFfSVycMTVGObyUjw',
    })
    .then((currentToken) => {
      if (currentToken) {
        debugger
        console.log('current token for client: ', currentToken)
        return currentToken
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        )
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
      // catch error while creating client token
    })
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
