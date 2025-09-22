import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { register } from '@/service/AuthService';

export default function SignupScreenToDo() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#34D399', backgroundColor: '#ECFDF5', borderRadius: 12, marginHorizontal: 12 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#065F46' }}
        text2Style={{ fontSize: 14, color: '#047857' }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#F87171', backgroundColor: '#FEF2F2', borderRadius: 12, marginHorizontal: 12 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#7F1D1D' }}
        text2Style={{ fontSize: 14, color: '#B91C1C' }}
      />
    ),
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Toast.show({ type: 'error', text1: 'Missing Fields', text2: 'Please fill in all fields', position: 'top', topOffset: 50, visibilityTime: 3000 });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Password Mismatch', text2: 'Passwords do not match', position: 'top', topOffset: 50, visibilityTime: 3000 });
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, fullName);
      Toast.show({ type: 'success', text1: 'Account Created', text2: 'Welcome aboard!', position: 'top', topOffset: 50, visibilityTime: 3000 });
      router.push('/(auth)/login');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Signup Failed', text2: 'Something went wrong. Try again.', position: 'top', topOffset: 50, visibilityTime: 3000 });
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#FFF5F7' }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F7" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <LinearGradient
          colors={['#FFE4E6', '#E0F2FE', '#F5F3FF']}
          style={{
            width: '90%',
            maxWidth: 400,
            borderRadius: 30,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#8B5CF6', textAlign: 'center', marginBottom: 6 }}>
            Create Account
          </Text>
          <Text style={{ fontSize: 14, color: '#374151', textAlign: 'center', marginBottom: 20 }}>
            Sign up to get started
          </Text>

          {/* Form Fields */}
          <View style={{ gap: 12 }}>
            {/* Full Name */}
            <View>
              <Text style={{ color: '#374151', fontSize: 14, marginBottom: 4 }}>Full Name</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#D8B4FE', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}>
                <MaterialCommunityIcons name="account-outline" size={22} color="#8B5CF6" style={{ marginRight: 8 }} />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  style={{ flex: 1, color: '#374151' }}
                />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text style={{ color: '#374151', fontSize: 14, marginBottom: 4 }}>Email</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#D8B4FE', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#8B5CF6" style={{ marginRight: 8 }} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ flex: 1, color: '#374151' }}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text style={{ color: '#374151', fontSize: 14, marginBottom: 4 }}>Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#D8B4FE', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}>
                <MaterialCommunityIcons name="lock-outline" size={22} color="#8B5CF6" style={{ marginRight: 8 }} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  autoCapitalize="none"
                  style={{ flex: 1, color: '#374151' }}
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View>
              <Text style={{ color: '#374151', fontSize: 14, marginBottom: 4 }}>Confirm Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#D8B4FE', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}>
                <MaterialCommunityIcons name="lock-check-outline" size={22} color="#8B5CF6" style={{ marginRight: 8 }} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  autoCapitalize="none"
                  style={{ flex: 1, color: '#374151' }}
                />
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity onPress={handleSignup} disabled={isLoading}>
              <LinearGradient colors={['#C4B5FD', '#A78BFA']} style={{ paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 16 }}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
              <Text style={{ color: '#6B7280', fontSize: 14 }}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text style={{ color: '#8B5CF6', fontWeight: '600' }}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
}
