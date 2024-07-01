import React, {useState} from "react";
import { View, StyleSheet, Alert} from "react-native";
import { Text, Button, Input } from '@rneui/base'
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { supabase } from "../supabase";


const SignupScreen = ({ navigation }) => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  return(
    <View style={styles.container}>
        <Spacer>
            <Text h3>Sign up</Text>
        </Spacer>
        <Input 
         label='Email'
         value={email}
         onChangeText={setEmail}
         autoCapitalize="none"
         autoCorrect={false}
         />
        <Spacer />
        <Input 
         secureTextEntry // same as setting it to true
         label='Password' 
         value={password}
         onChangeText={setPassword}
         autoCapitalize="none"
         autoCorrect={false}

         />

        <Spacer>
            <Button title='Sign up' onPress={async () => {
                const { data: { session }, error } = await supabase.auth.signUp({
                  email,
                  password,
                })

                if(!error){
                  if (!session) Alert.alert('Please check your inbox for email verification!')
                  navigation.navigate('Signin')
                } else{
                  Alert.alert(error.message)
                }
            }} />
        </Spacer>

        <NavLink
            routeName='Signin'
            text='Already have an account? Sign in'
         />
    </View>

  )
}

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };


const styles = StyleSheet.create({
    container:{
        flex: 1, // fill all vertical space
        justifyContent: "center",
        marginBottom: 200
    },


})

export default SignupScreen