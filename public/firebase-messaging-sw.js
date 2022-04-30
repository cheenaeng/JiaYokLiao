// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Replace the values with yours
const firebaseConfig = {
  apiKey: "AIzaSyA5UvElGUj9orm_W-J15iXzYLQFyKMl710",
  authDomain: "project4-jyl.firebaseapp.com",
  projectId: "project4-jyl",
  storageBucket: "project4-jyl.appspot.com",
  messagingSenderId: "36032499854",
  appId: "1:36032499854:web:748c4736edccefcdbc79df",
  measurementId: "G-JHGZGFMDEJ"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
    if (!pathname) return
    const url = new URL(pathname, self.location.origin).href

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientsArr) => {
                const hadWindowToFocus = clientsArr.some((windowClient) =>
                    windowClient.url === url ? (windowClient.focus(), true) : false
                )

                if (!hadWindowToFocus)
                    self.clients
                        .openWindow(url)
                        .then((windowClient) =>
                            windowClient ? windowClient.focus() : null
                        )
            })
    )
})