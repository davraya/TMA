import React, { useState, useEffect } from "react"
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native"
import { Text, Button, Input } from '@rneui/base'
import Spacer from "../components/Spacer"
import NavLink from '../components/NavLink'
import { supabase } from '../supabase'
import { useDispatch } from "react-redux"

const SigninScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    
    useEffect( () =>{
        const checkLogin  = async () => {
            const {data : {session}} = await supabase.auth.getSession()
            if(session){
                dispatch({type: 'hasSignedIn'})
            }
        }

        checkLogin()
        
      }, [])



    return(
        <View style={styles.container}>
            <Spacer>
                <Text style={{fontSize: 30}}>Login</Text>
            </Spacer>
            <Spacer />
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
                <Button title='Sign in' onPress={async () => {
                    setLoading(true)
                    const { data, error} = await supabase.auth.signInWithPassword({ email, password })
                    console.log(supabase)
                    
                    setLoading(false)
                    if(!error){
                        dispatch({ type : 'hasSignedIn'})
                    } else{
                        Alert.alert(error.message)
                    }
                }} />
                {loading ?? <ActivityIndicator/>}
            </Spacer>


            <NavLink
                routeName='Signup'
                text='Do not have an account? Sign up'
             />
        </View>

    )
}

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    }
  }

  const styles = StyleSheet.create({
    container:{
        flex: 1, // fill all vertical space
        justifyContent: "center",
        marginBottom: 200,
        paddingHorizontal: 10,
    },
})


export default SigninScreen