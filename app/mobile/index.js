import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Root } from 'native-base'

import Homepage from '../screens/Homepage'
import Gameplay from '../screens/Gameplay'
import Result from '../screens/Result'
 
export default () => {

    const Stack = createStackNavigator()

    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Homepage" component={ Homepage } />
            <Stack.Screen name="Gameplay" component={ Gameplay } />
            <Stack.Screen name="Result" component={ Result } />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )

}
