/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')


const firebaseConfig = {
  apiKey: "AIzaSyA5UvElGUj9orm_W-J15iXzYLQFyKMl710",
  authDomain: "project4-jyl.firebaseapp.com",
  projectId: "project4-jyl",
  storageBucket: "project4-jyl.appspot.com",
  messagingSenderId: "36032499854",
  appId: "1:36032499854:web:748c4736edccefcdbc79df",
  measurementId: "G-JHGZGFMDEJ"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action)
  }
  event.notification.close()
})