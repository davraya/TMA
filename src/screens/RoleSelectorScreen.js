import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button, Input, Icon } from '@rneui/base';
import Spacer from "../components/Spacer";
import { supabase } from "../supabase";
import { useSelector, useDispatch } from "react-redux";
import { getUserUid } from "../util/user";
import { addUserToGroup } from "../../models/insert";

const RoleSelectorScreen = ({ navigation }) => {
    const role = useSelector((state) => state.roleHasBeenSelected)
    const dispatch = useDispatch()


    const [selectedRole, setSelectedRole] = useState('');
    const [groupCode, setGroupCode] = useState('');


    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    const  handleFinalizeSelection = async () => {
        const user_uid = await getUserUid()
        try{
            await addUserToGroup(selectedRole, user_uid, groupCode)

        }catch(e){
            Alert.alert(e.message)
        }
    
        dispatch({ type: 'roleSelected'})
    }



    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Select a role</Text>
            </Spacer>

            <Button
                title='Manager'
                onPress={() => handleRoleSelection('manager')}
                buttonStyle={[styles.button, selectedRole === 'manager' && styles.selectedButton]}
            />
            <Spacer/>
            <Button
                title='Student'
                onPress={() => handleRoleSelection('student')}
                buttonStyle={[styles.button, selectedRole === 'student' && styles.selectedButton]}
            />
            {selectedRole === 'student'? 
            <Input 
                placeholder='Enter Group Code' 
                leftIcon={<Icon name='group'/>}
                value={groupCode}
                onChangeText={setGroupCode}
            /> : null}
            <Spacer/>
            <Button
                title='Accept'
                onPress={handleFinalizeSelection}
                disabled={!selectedRole || (selectedRole === 'student' && !groupCode)}
            />
        </View>
    );
};

RoleSelectorScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        marginBottom: 10,
    },
    selectedButton: {
        backgroundColor: 'lightblue', // Change the background color of the selected button
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 5
    }
});

export default RoleSelectorScreen;
