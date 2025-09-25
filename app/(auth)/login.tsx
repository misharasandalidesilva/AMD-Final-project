import React, { use, useState } from "react";
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
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { login } from "@/service/AuthService";  
import { useRouter } from "expo-router";


export default function LoginScreenToDo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#34D399",
          backgroundColor: "#ECFDF5",
          borderRadius: 12,
          marginHorizontal: 12,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#065F46" }}
        text2Style={{ fontSize: 14, color: "#047857" }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#F87171",
          backgroundColor: "#FEF2F2",
          borderRadius: 12,
          marginHorizontal: 12,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#7F1D1D" }}
        text2Style={{ fontSize: 14, color: "#B91C1C" }}
      />
    ),
  };

  const handleLogin = async () => {
    console.log("Login button pressed");
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
       router.push("/(dashboard)/homePage")
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back 👋",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid email or password",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
      setIsLoading(false);
      return;
    }
   

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FFF5F7" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F7" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <LinearGradient
            colors={["#FFE4E6", "#E0F2FE", "#F5F3FF"]}
            style={{
              borderRadius: 30,
              padding: 24,
              width: "90%",
              maxWidth: 400,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 23, fontWeight: "800", color: "#8B5CF6", textAlign: "center", marginBottom: 6 }}>
              Welcome to TaskMaster ✨
            </Text>
            <Text style={{ fontSize: 15, color: "#374151", textAlign: "center", marginBottom: 20 }}>
              Organize your tasks and boost your productivity
            </Text>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#374151", fontSize: 14, marginBottom: 4 }}>Email</Text>
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F3E8FF", borderWidth: 1, borderColor: "#D8B4FE", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 }}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#8B5CF6" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                  style={{ flex: 1, color: "#374151" }}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ color: "#374151", fontSize: 14, marginBottom: 4 }}>Password</Text>
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F3E8FF", borderWidth: 1, borderColor: "#D8B4FE", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 }}>
                <MaterialCommunityIcons name="lock-outline" size={22} color="#8B5CF6" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                  style={{ flex: 1, color: "#374151" }}
                />
              </View>
            </View>

            <TouchableOpacity onPress={handleLogin} style={{ marginBottom: 16 }}>
              <LinearGradient colors={["#C4B5FD", "#A78BFA"]} style={{ paddingVertical: 8, borderRadius: 12, alignItems: "center" }}>
                <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 16 }}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
              <Text style={{ marginHorizontal: 8, color: "#9CA3AF", fontSize: 12 }}>Or continue with</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
            </View>

            {/* Social Buttons with original logos */}
            <View style={{ gap: 12 }}>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E5E7EB", paddingVertical: 8, borderRadius: 12, backgroundColor: "#FFFFFF" }}>
                <Image source={require('../../assets/images/image.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
                <Text style={{ color: "#374151", fontWeight: "500" }}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E5E7EB", paddingVertical: 8, borderRadius: 12, backgroundColor: "#FFFFFF" }}>
                <Image source={require('../../assets/images/png-apple-logo-9711.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
                <Text style={{ color: "#374151", fontWeight: "500" }}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
              <Text style={{ color: "#6B7280", fontSize: 14 }}>Don't have an account? </Text>
              <Pressable onPress={() => router.push("/(auth)/signup")}>
                <Text style={{ color: "#8B5CF6", fontWeight: "600" }}>Sign Up</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
}
