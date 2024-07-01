import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import RoleSelectorScreen from "./src/screens/RoleSelectorScreen";
import AddGroupScreen from "./src/screens/AddGroupScreen";
import GroupScreen from "./src/screens/GroupScreen";
import CustomDrawer from './src/components/CustomDrawer';
import { userHasRole } from "./src/util/user";
import { useDispatch, Provider, useSelector } from 'react-redux';
import { store } from "./src/redux/store";
import { supabase } from "./src/supabase";

const Stack = createNativeStackNavigator();
const Switch = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
    const roleHasBeenSelected  = useSelector(state => state.session.roleHasBeenSelected)
    const isSignedIn  = useSelector(state => state.session.isSignedIn)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    const roleSelected = await userHasRole();
                    if (!roleSelected) {
                        dispatch({ type: 'roleNotSelected' });
                    }
                }
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };

        const checkLogin  = async () => {
            const {data : {session}} = await supabase.auth.getSession()
            if(session){
                dispatch({type : 'hasSignedIn'})
            }
        }
        checkLogin()
        fetchRole();
    }, [isSignedIn, roleHasBeenSelected]);


    return (
    <NavigationContainer>
        <Switch.Navigator screenOptions={{ headerShown: false }}>
            { isSignedIn? 
                <Stack.Screen 
                    name={'Main'} 
                    component={MainStack} 
                /> 
                : 
                <Stack.Screen 
                    name={'Auth'} 
                    component={AuthStack}
                />
            }
            
            
        </Switch.Navigator>
    </NavigationContainer>
    )

};

const MainStack = () => {

    const roleHasBeenSelected  = useSelector(state => state.session.roleHasBeenSelected)

    return(
    <Stack.Navigator initialRouteName="Dashboard" >
        {roleHasBeenSelected?
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="AddGroup" component={AddGroupScreen} />
                <Stack.Screen name="Group" component={GroupScreen} />
              </>
              :
              
              <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />

        }
 
    </Stack.Navigator>
  )

}

const AuthStack = () => {
    return(
    <Stack.Navigator initialRouteName='Signin'>
        <Stack.Screen name='Signin' component={SigninScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
)}

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
