import {SafeAreaView } from 'react-native'
import React from 'react'
import MyCalendar from '../calendar';

const Example = () => {
  return (
    <SafeAreaView>
      <MyCalendar
        hasRange
        // nextActiveDays={15}
        // todayTextColor='red'
        // disableWeekends
        // disablePrevDates
        // rangeDateColor='red'
        selectedColor='green'
        // startingDayColor='red'
        // endingDayColor='blue'
        // hideExtraDays
        // dayNamesColor='blue'
        // weekendDaysColor='red'
        // headerTittleColor='red'
        // headerIconColor='red'
        getStartDate={(startDate) => {
          console.log("Selected start date:", startDate);
        }}
        getEndDate={(endDate) => {
          console.log("Selected end date:", endDate);
        }}
        getRange={(dates) => {
          console.log("Selected date range:", dates);
        }}
      />
    </SafeAreaView>
  )
}

export default Example
