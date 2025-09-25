import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    photos: number;
    followers: number;
    following: number;
  };
}

export default function ProfileScreen() {
  const [showGallery, setShowGallery] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Mishara ',
    email: 'mishara@gmail.com',
    bio: '📸 Photography enthusiast | 🌍 Travel lover | ✨ Creating memories one photo at a time',
    location: 'Matara, Sri Lanka',
    joinDate: 'January 2023',
    avatar: 'https://picsum.photos/150/150?random=person',
    stats: {
      photos: 24,
      followers: 1250,
      following: 340
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setShowEditProfile(false);
    Alert.alert('Success!', 'Your profile has been updated successfully! 🎉');
  };

  const renderEditProfileModal = () => (
    <Modal
      visible={showEditProfile}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <View className="pt-16 px-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity
              onPress={() => setShowEditProfile(false)}
              className="p-3 rounded-full bg-white/20"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-bold text-white">Edit Profile</Text>
            
            <TouchableOpacity
              onPress={handleSaveProfile}
              className="px-4 py-2 bg-white/20 rounded-2xl"
            >
              <Text className="text-white font-semibold">Save</Text>
            </TouchableOpacity>
          </View>

          {/* Edit Form */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="space-y-6">
              {/* Avatar */}
              <View className="items-center mb-6">
                <View className="relative">
                  <Image
                    source={{ uri: editedProfile.avatar }}
                    className="w-24 h-24 rounded-full bg-white/20"
                  />
                  <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                    <Ionicons name="camera" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name */}
              <View>
                <Text className="text-white font-semibold mb-2">Name</Text>
                <TextInput
                  value={editedProfile.name}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, name: text }))}
                  className="bg-white/20 rounded-2xl p-4 text-white text-lg"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
              </View>

              {/* Bio */}
              <View>
                <Text className="text-white font-semibold mb-2">Bio</Text>
                <TextInput
                  value={editedProfile.bio}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, bio: text }))}
                  className="bg-white/20 rounded-2xl p-4 text-white h-24"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {/* Location */}
              <View>
                <Text className="text-white font-semibold mb-2">Location</Text>
                <TextInput
                  value={editedProfile.location}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, location: text }))}
                  className="bg-white/20 rounded-2xl p-4 text-white text-lg"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </Modal>
  );

  if (showGallery) {
    return (
      <View className="flex-1">
        {/* <ProfileGallery userProfile={profile} /> */}
        <View className="absolute top-16 left-4 z-10">
          <TouchableOpacity
            onPress={() => setShowGallery(false)}
            className="p-3 rounded-full bg-black/30"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-16 pb-8"
      >
        <View className="px-6">
          {/* Profile Header */}
          <View className="items-center mb-6">
            <View className="relative mb-4">
              <Image
                source={{ uri: profile.avatar }}
                className="w-24 h-24 rounded-full border-4 border-white/30"
              />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white items-center justify-center">
                <View className="w-3 h-3 bg-white rounded-full" />
              </View>
            </View>
            
            <Text className="text-3xl font-bold text-white mb-2">{profile.name}</Text>
            <Text className="text-white/80 text-lg mb-1">{profile.email}</Text>
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
              <Text className="text-white/80 ml-1">{profile.location}</Text>
            </View>
          </View>

          {/* Stats
          <View className="flex-row justify-around bg-white/20 rounded-2xl p-4 mb-6">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">{profile.stats.photos}</Text>
              <Text className="text-white/80">Photos</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">{profile.stats.followers}</Text>
              <Text className="text-white/80">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">{profile.stats.following}</Text>
              <Text className="text-white/80">Following</Text>
            </View>
          </View> */}

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setShowEditProfile(true)}
              className="flex-1 bg-white/20 rounded-2xl p-3 flex-row items-center justify-center"
            >
              <Ionicons name="create" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setShowGallery(true)}
              className="flex-1 bg-white/20 rounded-2xl p-3 flex-row items-center justify-center"
            >
              <Ionicons name="images" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Profile Content */}
      <View className="px-6 py-6">
        {/* Bio Section
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-3">
            <Ionicons name="person-circle" size={24} color="#667eea" />
            <Text className="text-xl font-bold text-gray-800 ml-2">About</Text>
          </View>
          <Text className="text-gray-600 leading-6">{profile.bio}</Text>
        </View> */}

        {/* Quick Actions */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="flash" size={24} color="#667eea" />
            <Text className="text-xl font-bold text-gray-800 ml-2">Quick Actions</Text>
          </View>
          
          <View className="space-y-3">
            <TouchableOpacity 
              onPress={() => setShowGallery(true)}
              className="flex-row items-center p-3 bg-blue-50 rounded-xl"
            >
              <Ionicons name="images" size={20} color="#3b82f6" />
              <Text className="ml-3 text-blue-600 font-semibold flex-1">View My Gallery</Text>
              <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center p-3 bg-purple-50 rounded-xl">
              <Ionicons name="share-social" size={20} color="#8b5cf6" />
              <Text className="ml-3 text-purple-600 font-semibold flex-1">Share Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#8b5cf6" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center p-3 bg-green-50 rounded-xl">
              <Ionicons name="settings" size={20} color="#10b981" />
              <Text className="ml-3 text-green-600 font-semibold flex-1">Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#10b981" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Member Since */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={20} color="#9ca3af" />
            <Text className="text-gray-500 ml-2">Member since {profile.joinDate}</Text>
          </View>
        </View>
      </View>

      {renderEditProfileModal()}
    </ScrollView>
  );
}