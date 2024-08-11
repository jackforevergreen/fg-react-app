import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
} from "@/api/social"; // Adjust the import path as needed
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { getAuth } from "firebase/auth";
import BackButton from "@/components/BackButton";
import Icon from "react-native-vector-icons/FontAwesome";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const FriendsScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { uid, name, type } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(type);
  const auth = getAuth();

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFollowers = async () => {
    try {
      if (typeof uid === "string") {
        const followersList = await getUserFollowers(uid);
        setFollowers(followersList as any);
      } else {
        console.error("Invalid uid:", uid);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      if (typeof uid === "string") {
        const followingList = await getUserFollowing(uid);
        setFollowing(followingList as any);
      } else {
        console.error("Invalid uid:", uid);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const handleFollow = async (followerId: string) => {
    try {
      await followUser(followerId);
      // Update the local state
      setFollowing((prevFollowing: any) =>
        prevFollowing.map((user: { id: string }) =>
          user.id === followerId ? { ...user, isFollowing: true } : user
        )
      );
      setFollowers((prevFollowers: any) =>
        prevFollowers.map((user: { id: string }) =>
          user.id === followerId ? { ...user, isFollowing: true } : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (followerId: string) => {
    try {
      await unfollowUser(followerId);
      // Update the local state
      setFollowing((prevFollowing: any) =>
        prevFollowing.map((user: { id: string; followers: number }) =>
          user.id === followerId
            ? { ...user, followers: user.followers - 1, isFollowing: false }
            : user
        )
      );
      setFollowers((prevFollowers: any) =>
        prevFollowers.map((user: { id: string }) =>
          user.id === followerId ? { ...user, isFollowing: false } : user
        )
      );
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const renderFollowItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.followerItem}
      onPress={() =>
        router.push({ pathname: "/profile/[uid]", params: { uid: item.id } })
      }
    >
      {item.photoURL ? (
        <Image
          source={{ uri: item.photoURL }}
          placeholder={blurhash}
          contentFit={"cover"}
          style={styles.avatar}
        />
      ) : (
        <Image
          source={{ blurhash }}
          contentFit={"cover"}
          style={styles.avatar}
        />
      )}
      <View style={styles.followerInfo}>
        <Text style={styles.followerName}>{item.name}</Text>
        <Text style={styles.followerStats}>
          {item.following} Following | {item.followers} Followers
        </Text>
      </View>
      {item.id === auth.currentUser?.uid ? null : item.isFollowing ? (
        <TouchableOpacity
          style={styles.smallActionButton}
          onPress={() => handleUnfollow(item.id)}
        >
          <Icon name="minus" size={15} color="#fff" />
          <Text style={styles.smallActionButtonText}>Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.smallActionButton}
          onPress={() => handleFollow(item.id)}
        >
          <Icon name="plus" size={15} color="#fff" />
          <Text style={styles.smallActionButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const isOwnProfile = auth.currentUser?.uid === uid ? true : false;
  const displayName = name;

  const renderContent = () => {
    if (activeTab === "Followers") {
      // If the active tab is Followers
      if (followers.length === 0) {
        // If this user has no followers
        if (isOwnProfile) {
          // If this is your profile
          return (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>No Followers Yet 😔</Text>
              <Text style={styles.emptyStateText}>
                It looks like you don't have any followers at the moment. Start
                connecting with others to grow your network!
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="plus" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Add Friends</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          // If this is not your profile
          return (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>
                Be the first to follow!
              </Text>
              <Text style={styles.emptyStateText}>
                {displayName} is just getting started on this platform. Be the
                first to show your support and follow our account.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="plus" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          );
        }
      } else {
        // If this user has followers
        return (
          <FlatList
            data={followers}
            renderItem={renderFollowItem}
            keyExtractor={(item) => item.id}
          />
        );
      }
    } else {
      // If the active tab is Following
      if (following.length === 0) {
        // If this user is not following anyone
        if (isOwnProfile) {
          // If this is your profile
          return (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>
                You're not following anyone yet.
              </Text>
              <Text style={styles.emptyStateText}>
                It looks like you're not following anyone at the moment. Start
                connecting with others to grow your network.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="plus" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Add Friends</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          // If this is not your profile
          return (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>
                {displayName} is not following anyone yet 😔
              </Text>
              <Text style={styles.emptyStateText}>
                It looks like {displayName} is not following anyone. Follow them
                to see their posts and discover new content.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="plus" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          );
        }
      } else {
        // If this user is following someone
        return (
          <FlatList
            data={following}
            renderItem={renderFollowItem}
            keyExtractor={(item) => item.id}
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>
        {isOwnProfile ? "Your" : `${displayName}'s`} Friends
      </Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Followers" && styles.activeTab]}
          onPress={() => setActiveTab("Followers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Followers" && styles.activeTabText,
            ]}
          >
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Following" && styles.activeTab]}
          onPress={() => setActiveTab("Following")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Following" && styles.activeTabText,
            ]}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 20,
    marginHorizontal: "auto",
    maxWidth: "50%",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 36,
    marginHorizontal: 36,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  tabText: {
    fontSize: 20,
    color: "#888",
  },
  activeTabText: {
    color: "green",
    fontWeight: "bold",
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  followerInfo: {
    flex: 1,
  },
  followerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  followerStats: {
    fontSize: 16,
    color: "#626262",
  },
  emptyStateContainer: {
    display: "flex",
    borderRadius: 10,
    borderColor: "#A3A3A3",
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 20,
  },
  actionButton: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginHorizontal: "auto",
    backgroundColor: "#409858",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  actionButtonText: {
    color: "white",
    fontSize: 24,
  },
  smallActionButton: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginHorizontal: "auto",
    backgroundColor: "#409858",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  smallActionButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default FriendsScreen;
