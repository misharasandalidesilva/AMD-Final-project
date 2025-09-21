import { View, Text } from 'react-native'
import React from 'react'
import "./../global.css"
import { Slot } from 'expo-router'
import { LoaderProvider } from '@/context/LoaderContext'
import { AuthProvider } from '@/context/AuthContext'


const Rootlayout = () => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
  )
}

export default Rootlayout