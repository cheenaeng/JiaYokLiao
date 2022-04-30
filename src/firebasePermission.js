import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
import 'regenerator-runtime/runtime'

const firebaseConfig = {
  apiKey: "AIzaSyA5UvElGUj9orm_W-J15iXzYLQFyKMl710",
  authDomain: "project4-jyl.firebaseapp.com",
  projectId: "project4-jyl",
  storageBucket: "project4-jyl.appspot.com",
  messagingSenderId: "36032499854",
  appId: "1:36032499854:web:748c4736edccefcdbc79df",
  measurementId: "G-JHGZGFMDEJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();

export async function getFCMToken() {
    try {
        // Don't forget to paste your VAPID key here
		// (you can find it in the Console too)
        const token = await getToken(messaging, { vapidKey:'BPo0Dv-gHXRlg9TMOOTaVdt8z0EHe4FXtJR7xaQI1PIIHFngPmEycMwidTdTPMD991vVqCpebBJPr_Xwxg-ThDU'});

        return token;
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}

