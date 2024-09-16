import 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from "./src/screens/SignupScreen";
import CustomDrawer from './src/components/CustomDrawer';

import { useDispatch, Provider, useSelector } from 'react-redux';
import { store } from "./src/redux/store";
import { supabase } from "./src/supabase";
import HomeStack from './src/navigation/HomeStack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
    const isSignedIn  = useSelector(state => state.session.isSignedIn)

    const dispatch = useDispatch();

    useEffect(() => {

        const disableSounds = async () => {
            await Audio.setAudioModeAsync({
                isMuted : true,
            })
        const checkLogin  = async () => {
            const {data : {session}} = await supabase.auth.getSession()
            if(session){
                dispatch({type : 'hasSignedIn'})
            }
        }

        disableSounds()

        checkLogin()

    }
    }, [isSignedIn]);

    const screenOptions={
        headerShown: false,
        drawerStyle: {
            backgroundColor: 'white',
            width: 240,
        },
    }
    return (
    <NavigationContainer>
        {isSignedIn ? (
            <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} 
            />}>
                <Drawer.Screen 
                name=" " 
                component={HomeStack} 
                />
            </Drawer.Navigator>
        ) : (
            <Stack.Navigator initialRouteName='Signin'>
                <Stack.Screen name='Signin'  component={SigninScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='Signup' component={SignupScreen} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )}
        
    </NavigationContainer>
    )

};


export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
