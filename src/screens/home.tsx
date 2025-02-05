import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import MyCalendar from '../components/calendar'

const Home = () => {
  return (
    <SafeAreaView>
      <MyCalendar
      hasRange
      // nextActiveDays={15}
      // todayTextColor='red'
      // disableWeekends
      // disablePrevDates
      // rangeDateColor='red'
      // selectedColor='red'
      // startingDayColor='red'
      // endingDayColor='blue'
      // hideExtraDays
      />
    </SafeAreaView>
  )
}

export default Home
