import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/DashboardScreen'
import AddGroupScreen from '../screens/AddGroupScreen'
import GroupScreen from '../screens/GroupScreen'
import RoleSelectorScreen from '../screens/RoleSelectorScreen'
import AddInfoScreen from '../screens/AddInfoScreen'
import AddUserScreen from '../screens/AddUserScreen'
import AddTaskScreen from '../screens/AddTaskScreen'
import StudentDashboard from '../screens/StudentDashboard'
import AssignTaskScreen from '../screens/AssignTaskScreen'
import Task from '../screens/Task'
import { useSelector, useDispatch } from 'react-redux'
import { userHasRole } from '../models/user'

const Stack = createNativeStackNavigator()

const HomeStack = () => {

  const dispatch = useDispatch()

  const roleHasBeenSelected = useSelector(state => state.session.roleHasBeenSelected)
  const role = useSelector(state => state.session.role)


  useEffect( () => {
      const fetchRole = async () => {
          try {
                const roleSelected = await userHasRole()
                if (roleSelected.role === undefined) {
                    dispatch({ type: 'roleNotSelected' })
                } else {
                    dispatch({ type: 'setRole', payload: { role: roleSelected.role } })
                    dispatch({ type: 'roleSelected' })
                }
          } catch (error) {
              console.error("Error fetching role:", error)
          }
        }

      fetchRole()
  }, [roleHasBeenSelected])


  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {roleHasBeenSelected ? (
        <>
          {role === 'manager' ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AddGroup" component={AddGroupScreen} />
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="AddUser" component={AddUserScreen}/>
            <Stack.Screen name="AddTask" component={AddTaskScreen}/>
            <Stack.Screen name="AssignTask" component={AssignTaskScreen}/>
          </>
          )
          : (
            <>
              <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
              <Stack.Screen name='Task' component={Task} />
            </>
            )}

        </>
      ) : (
        <>
          <Stack.Screen name="AddInfo" component={AddInfoScreen} />
          <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />
        </>
     
      )}

      </Stack.Navigator>

  )
}

export default HomeStack
