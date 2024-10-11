import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button } from '@rneui/base'
import {searchUsers} from '../models/fetch'
import {addUserToGroup} from '../models/insert'

const AddUserScreen = ({ navigation, route }) => {
    
    const { params : {groupId, callback}} = route

  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)


  useEffect(() => {
    const configureScreen = async () => {

        const names = await searchUsers(query)
        setFilteredData(names)
      }
    
    configureScreen()
  }, [query])

  const handleAddUser = async () => {
    if (selectedUser) {
      // Handle adding user logic here
      await addUserToGroup( groupId, selectedUser.user_uid)
      // Reset the selection after adding
      setSelectedUser(null)
      setQuery('')
      setFilteredData([])
      navigation.goBack()
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => setSelectedUser(item)}
    >
      <Text style={item === selectedUser ? styles.selectedItem : styles.item}>{item.first_name} {item.last_name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No results found</Text>}
      />
      <Button
        title="Add"
        onPress={handleAddUser}
        disabled={!selectedUser}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,

  },
  itemText: {
    fontSize: 16,
  },
  selectedItem : {
    padding: 10,
    color: 'white',
    backgroundColor: 'green'
  }
})

export default AddUserScreen
