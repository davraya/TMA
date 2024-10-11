import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Spacer from "./Spacer"
import { useNavigation } from "@react-navigation/native"

const NavLink = ({  text, routeName }) => {
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer/>
            <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        marginLeft: 15
    }
})

export default NavLink