import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import {Cadastro} from '../src/components/patterns/Cadastro';
import { HomeScreen } from './screens';

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Login" component={Login} options={{ headerShown: false }}/> */}
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="Principal" component={HomeScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}