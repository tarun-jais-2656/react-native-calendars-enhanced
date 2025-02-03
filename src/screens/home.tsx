import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Calender from '../components/calender'

const Home = () => {
  return (
    <SafeAreaView>
      <Calender
        hasRange
      // nextActiveDays={15}
      // todayTextColor='red'
      // disableWeekDays
      // disableOldDates
      />
    </SafeAreaView>
  )
}

export default Home
