import { Stack } from 'expo-router';
import React from 'react';

function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: true }} />
    </Stack>
  );
}

export default TabLayout;
