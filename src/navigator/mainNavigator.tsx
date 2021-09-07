import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react"
import { LoginScreen } from "../pages/loginScreen";


const Stack = createStackNavigator();

export default function MainNavigator() {

  
  return (  
    <Stack.Navigator >       
        <Stack.Screen name="LoginPrincipal" component={LoginScreen} options={{headerShown:false}}/>             
    </Stack.Navigator>
  );
}