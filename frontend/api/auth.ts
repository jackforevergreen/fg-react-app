import { Alert } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import { router } from "expo-router";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchEmissionsData } from "./emissions";
import { sendWelcomeEmail } from "./email";

/* Function to sign up the user with the email and password */
export const onSignup = async (
  email: string,
  password: string,
  name: string
) => {
  const db = getFirestore();
  const auth = getAuth();

  try {
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      // Link anonymous account with email/password
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);

      // Update user profile
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Update user document
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        name: name,
        email: email,
        isAnonymous: false,
      });
    } else {
      // Create new account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        photoURL: null,
        createdAt: serverTimestamp(),
        followers: [],
        following: [],
        followerCount: 0,
        followingCount: 0,
        isAnonymous: false,
      });
    }

    await sendWelcomeEmail(email, name);

    const data = await fetchEmissionsData();
    if (!data) {
      router.replace("/pre-survey");
    } else {
      router.replace("/home");
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
  }
};

export const onGoogleSignUp = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();

    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(user.idToken);

    if (auth.currentUser && auth.currentUser.isAnonymous) {
      // Link anonymous account with Google
      await linkWithCredential(auth.currentUser, credential);
    } else {
      // Sign in with Google
      await signInWithCredential(auth, credential);
    }

    const db = getFirestore();
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          name: user.user.name,
          email: user.user.email,
          photoURL: user.user.photo,
          createdAt: serverTimestamp(),
          followers: [],
          following: [],
          followerCount: 0,
          followingCount: 0,
          isAnonymous: false,
        },
        { merge: true }
      );

      if (user.user.email && user.user.name) {
        await sendWelcomeEmail(user.user.email, user.user.name);
      }

      const data = await fetchEmissionsData();
      if (!data) {
        router.replace("/pre-survey");
      } else {
        router.replace("/home");
      }
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
  }
};

export const onContinueAnonymously = async () => {
  const auth = getAuth();

  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name: "Guest User",
      email: null,
      photoURL: null,
      createdAt: serverTimestamp(),
      followers: [],
      following: [],
      followerCount: 0,
      followingCount: 0,
      isAnonymous: true,
    });

    // Fetch emissions data after creating the user document
    const data = await fetchEmissionsData();
    if (!data) {
      // If no data for the current month, redirect to the carbon calculator
      router.replace("/pre-survey");
    } else {
      // If data exists for the current month, redirect to home
      router.replace("/signup");
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
  }
};

/* Function to sign up the user with the email and password */
export const onLogin = (email: string, password: string) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        fetchEmissionsData().then((data) => {
          if (data) {
            router.replace("/home");
          } else {
            router.replace("/pre-survey");
          }
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
      console.log("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
    });
};

export const onGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();

    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(user.idToken);
    const userCredential = await signInWithCredential(auth, credential);

    const currentUser = userCredential.user;
    if (currentUser) {
      fetchEmissionsData()
        .then((data) => {
          if (data) {
            router.replace("/home");
          } else {
            router.replace("/pre-survey");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(
            "Error",
            `Code: ${errorCode}\nMessage: ${errorMessage}`
          );
        });
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
  }
};

export const handleLogout = () => {
  const auth = getAuth();

  Alert.alert("Logout", "Are you sure you want to logout?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Logout",
      onPress: () => {
        signOut(auth)
          .then(() => {
            router.dismissAll();
          })
          .catch((error) => {
            Alert.alert("Error", "Failed to logout. Please try again.");
          });
      },
    },
  ]);
};

export const handleResetPassword = (email: string) => {
  const auth = getAuth();
  if (email.trim() === "") {
    Alert.alert("Error", "Please enter your email address.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox.",
        [{ text: "OK", onPress: () => router.push("/login") }]
      );
    })
    .catch((error) => {
      const errorMessage = error.message;
      Alert.alert("Error", `Failed to send reset email: ${errorMessage}`);
    });
};
