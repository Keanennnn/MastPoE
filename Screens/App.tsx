import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import AddMenuItems from './AddMenuItems';
import FilterMenu from './FilterMenu';
import AboutUs from './AboutUs';
import { MenuProvider } from './MenuContext';  // Import MenuProvider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AddMenuItems" component={AddMenuItems} />
          <Stack.Screen name="FilterMenu" component={FilterMenu} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
