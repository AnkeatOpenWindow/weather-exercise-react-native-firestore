import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from './ReadingCard'
import { getAllDays } from '../services/FirestoreServices'

const ReadingScreen = ({ navigation }) => {

  // Get all Days
  var dummyReading = { name: "Monday", icon: "sun", id: "123456789" }

  useEffect(() => {
    handelGettingDays()
  }, [])// <-- running the get here so that it gets called when our screen loads
  const [days, setDays] = useState([])

  const handelGettingDays = async () => {
    console.log("running get days on home...")
    var daysData = await getAllDays()
    setDays(daysData) //<-- setting out useState equal to the data we get from firebase
  }

  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />
      {/* SELF: Get all the days and display them here using the reading card (doesn't includ the readings data)*/}


      {
        days.map((day) => {
          return <ReadingCard day={day} key={day.id} />;
        })
      }




    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})