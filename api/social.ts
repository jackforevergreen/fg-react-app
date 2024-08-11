import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  increment,
  runTransaction,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Follow a user
export const followUser = async (targetUserId: string) => {
  const db = getFirestore();
  const auth = getAuth();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const currentUserId = currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  try {
    await runTransaction(db, async (transaction) => {
      const currentUserDoc = await transaction.get(currentUserRef);
      const targetUserDoc = await transaction.get(targetUserRef);

      if (!currentUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("User document not found");
      }

      const currentUserFollowing = currentUserDoc.data()?.following || [];

      if (!currentUserFollowing.includes(targetUserId)) {
        transaction.update(currentUserRef, {
          following: arrayUnion(targetUserId),
          followingCount: increment(1),
        });

        transaction.update(targetUserRef, {
          followers: arrayUnion(currentUserId),
          followerCount: increment(1),
        });
      }
    });

    console.log("Successfully followed user");
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (targetUserId: string) => {
  const db = getFirestore();
  const auth = getAuth();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const currentUserId = currentUser.uid;
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  try {
    await runTransaction(db, async (transaction) => {
      const currentUserDoc = await transaction.get(currentUserRef);
      const targetUserDoc = await transaction.get(targetUserRef);

      if (!currentUserDoc.exists() || !targetUserDoc.exists()) {
        throw new Error("User document not found");
      }

      transaction.update(currentUserRef, {
        following: arrayRemove(targetUserId),
        followingCount: increment(-1),
      });

      transaction.update(targetUserRef, {
        followers: arrayRemove(currentUserId),
        followerCount: increment(-1),
      });
    });

    console.log("Successfully unfollowed user");
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

// Get a user's follower and following counts
export const getUserFollowCounts = async (userId: string) => {
  const db = getFirestore();

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { followerCount, followingCount } = userDoc.data();
      return { followerCount, followingCount };
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user follow counts:", error);
    return null;
  }
};

// Get a user's followers
export const getUserFollowers = async (userId: string) => {
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { followers } = userDoc.data();

      // Get the current user's following list
      const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
      const currentUserFollowing = currentUserDoc.exists()
        ? currentUserDoc.data().following || []
        : [];

      // Fetch full profile information for each followed user
      const followersProfiles = await Promise.all(
        followers.map(async (followerUserId: string) => {
          const followedUserDoc = await getDoc(
            doc(db, "users", followerUserId)
          );
          if (followedUserDoc.exists()) {
            const userData = followedUserDoc.data();
            return {
              id: followerUserId,
              name: userData.name,
              photoURL: userData.photoURL,
              followers: userData.followerCount || 0,
              following: userData.followingCount || 0,
              isFollowing: currentUserFollowing.includes(followerUserId),
              // Add any other fields you need
            };
          }
          return null;
        })
      );

      return followersProfiles.filter((profile) => profile !== null);
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user followers:", error);
    return null;
  }
};

// Get a user's following
export const getUserFollowing = async (userId: string) => {
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { following } = userDoc.data();

      // Get the current user's following list
      const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
      const currentUserFollowing = currentUserDoc.exists()
        ? currentUserDoc.data().following || []
        : [];

      // Fetch full profile information for each followed user
      const followingProfiles = await Promise.all(
        following.map(async (followedUserId: string) => {
          const followedUserDoc = await getDoc(
            doc(db, "users", followedUserId)
          );
          if (followedUserDoc.exists()) {
            const userData = followedUserDoc.data();
            return {
              id: followedUserId,
              name: userData.name,
              photoURL: userData.photoURL,
              followers: userData.followerCount || 0,
              following: userData.followingCount || 0,
              isFollowing: currentUserFollowing.includes(followedUserId),
              // Add any other fields you need
            };
          }
          return null;
        })
      );

      return followingProfiles.filter((profile) => profile !== null);
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user following:", error);
    return null;
  }
};

export const getUserProfile = async (userId: string) => {
  const db = getFirestore();
  const auth = getAuth();

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const currentUserId = currentUser.uid;

  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const currentUserDoc = await getDoc(currentUserRef);

    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const { name, photoURL, followerCount, followingCount } = userDoc.data();

      // Check if the current user is following this profile
      const currentUserFollowing = currentUserDoc.data()?.following || [];
      const isFollowing = currentUserFollowing.includes(userId);

      return {
        name,
        photoURL,
        followerCount,
        followingCount,
        isFollowing, // Add this boolean to the returned object
      };
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
