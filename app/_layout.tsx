import { View, Text } from 'react-native'
import React from 'react'
import "./../global.css"
import { Slot } from 'expo-router'
import { LoaderProvider } from '@/context/LoaderContext'


const Rootlayout = () => {
  return (
    <LoaderProvider>
      <Slot />
    </LoaderProvider>
  )
}

export default Rootlayout