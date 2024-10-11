import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Task = ({ route }) => {
    const { task } = route.params
    const [deadLine, setDeadLine] = useState('')
    const [formatedDate, setFormatedDate] = useState('')

    useEffect(() => {
        const configure = () => {
            const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }
            const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true }

            const formattedDate = new Date(task.date).toLocaleDateString('en-US', optionsDate)
            const formattedTime = new Date(task.date).toLocaleTimeString('en-US', optionsTime)

            setFormatedDate(`Assigned ${formattedDate} at ${formattedTime}`)

            const dueDate = new Date(new Date(task.date).setDate(new Date(task.date).getDate() + 6))
            const currentDate = new Date()
            const dueMs = dueDate - currentDate

            const msInDay = 24 * 60 * 60 * 1000
            const msInHour = 60 * 60 * 1000

            const days = Math.floor(dueMs / msInDay)
            const hours = Math.floor((dueMs % msInDay) / msInHour)

            setDeadLine(days ? `${days}d ${hours}h` : `${hours}h`)
        }

        configure()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{task.title}</Text>
                    <Text style={styles.status}>{task.status_name}</Text>
                </View>
            </View>
            <View style={styles.taskInfo}>
                <Text style={styles.description}>
                    {task.description === "" ? 'No description available' : task.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.date}>{formatedDate}</Text>
                    <Text style={styles.deadline}>Due in {deadLine}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#f8f9fa', // Light background color
    },
    header: {
        backgroundColor: '#007bff', // Primary color
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8, // Rounded corners
        marginBottom: 15,
    },
    headerContent: {
        flexDirection: 'column', // Stack title and status vertically
        width: '100%', // Ensure it takes full width
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        flexWrap: 'wrap', // Wrap long titles
    },
    status: {
        fontSize: 16,
        color: '#fff',
        fontStyle: 'italic',
        marginTop: 5, // Space between title and status
    },
    taskInfo: {
        flex: 0.4,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff', // White background for task info
        borderRadius: 8, // Rounded corners
        shadowColor: '#000', // Shadow for elevation
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Elevation for Android
        justifyContent: 'space-between', // Space between description and footer
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    footer: {
        alignItems: 'flex-start', // Align footer content to the left
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    deadline: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d9534f', // Red color for deadline
    }
})

export default Task
