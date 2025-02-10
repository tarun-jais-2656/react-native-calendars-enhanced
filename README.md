# React Native Calendar Enhanced 📅

## A customizable React Native calendar component for iOS and Android.

[![Version](https://img.shields.io/npm/v/react-native-calendars-enhanced.svg)](https://www.npmjs.com/package/react-native-calendars-enhanced)
[![Build status](https://badge.buildkite.com/your-badge.svg)](https://buildkite.com/your-buildkite)

This module provides a customizable **React Native** calendar component with additional features like range selection, custom styling and month-year jump through list.

The package is compatible with both **Android** and **iOS**.

> ### **Official documentation**
>
> This README provides basic examples of how to get started with `react-native-calendars-enhanced`. For detailed information, refer to the [react-native-calendars-enhanced](https://github.com/tarun-jais-2656/react-native-calendars-enhanced).

## Features ✨

- Pure JS/TS. No Native code required
- Date marking with custom styles
- Range selection support
- Customizable header and appearance
- Swipeable calendar with flexible custom rendering
- Accessibility support
- Month-year jump through list
## Try it out ⚡

You can run a sample module using these steps:
bash
$ git clone git@github.com:tarun-jais-2656/react-native-calendars-enhanced.git
$ cd react-native-calendars-enhanced
$ yarn install
$ cd ios && pod install && cd ..
$ react-native run-ios

## Getting Started 🔧

Here's how to get started with `react-native-calendars-enhanced` in your React Native project:

### Install the package:

```bash
$ yarn add react-native-calendars-enhanced
```

**This package is implemented in JavaScript/Typescript, so no native module linking is required.**

## Usage 🚀

Basic usage examples of the library

### Importing the `MyCalendar` component

```javascript
import MyCalendar from 'react-native-calendars-enhanced';
```

### Use the `MyCalendar` component in your app:

```javascript
import React from 'react';
import MyCalendar from 'react-native-calendars-enhanced';

const App = () => {
  return (
    <MyCalendar
        hasRange
        nextActiveDays={15}
        todayTextColor='red'
        disableWeekends
        disablePrevDates
        rangeDateColor='red'
        selectedColor='red'
        startingDayColor='red'
        endingDayColor='blue'
        hideExtraDays
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
  );
};

export default App;
```

## Custom Props

### `CustomCalendarProps`

```typescript
interface CustomCalendarProps extends CalendarProps {
    hasRange?: boolean; // Enables range selection mode
    nextActiveDays?: number; // Number of days from today that are selectable
    todayTextColor?: string; // Color for today's date text
    disableWeekends?: boolean; // Disables selection of weekends
    disablePrevDates?: boolean; // Disables selection of past dates
    rangeDateColor?: string; // Color for dates within the selected range
    selectedColor?: string; // Color for the selected date
    startingDayColor?: string; // Color for the starting day of the range
    endingDayColor?: string; // Color for the ending day of the range
    dayNamesColor?:string; // Color for the day names   
    weekendDaysColor?:string; // Color for the weekend days
    headerTittleColor?:string; // Color for the header title
    headerIconColor?:string; // Color for the header icon
    getStartDate?: (startDate: string) => void; // Callback for when a start date is selected
    getEndDate?: (endDate: string) => void; // Callback for when an end date is selected
    getRange?: (dates: string[]) => void; // Callback for when a date range is selected
}
```

### Prop Descriptions

- **hasRange**: A boolean that, when true, enables the range selection feature, allowing users to select a start and end date.
- **nextActiveDays**: Specifies the number of days from the current date that are selectable. If not provided, all future dates are selectable.
- **todayTextColor**: Sets the text color for today's date on the calendar.
- **disableWeekends**: A boolean that, when true, disables the selection of weekend dates.
- **disablePrevDates**: A boolean that, when true, prevents the selection of dates before the current date.
- **rangeDateColor**: Defines the color for dates that fall within the selected range.
- **selectedColor**: Sets the color for the currently selected date.
- **startingDayColor**: Specifies the color for the starting day of a selected range.
- **endingDayColor**: Specifies the color for the ending day of a selected range.
- **dayNamesColor**: Color for the day names
- **weekendDaysColor**: Color for the weekend days
- **headerTittleColor**: Color for the header title
- **headerIconColor**: Color for the header icon
- **getStartDate**: A callback function that is triggered when a start date is selected, receiving the selected start date as a string.
- **getEndDate**: A callback function that is triggered when an end date is selected, receiving the selected end date as a string.
- **getRange**: A callback function that is triggered when a date range is selected, receiving an array of strings representing the selected dates.

### `CalendarProps`

Refer to the [react-native-calendars documentation](https://wix.github.io/react-native-calendars/docs/Intro) for detailed information on `CalendarProps`.

## Examples

### Creating a basic calendar with range selection:

```javascript
import React from 'react';
import MyCalendar from 'react-native-calendars-enhanced';

const App = () => {
  return (
    <MyCalendar
      hasRange={true}
      rangeDateColor='red'
      selectedColor='red'
      startingDayColor='red'
      endingDayColor='blue'
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
  );
};

export default App;
```

### Customize the appearance of the calendar:

```javascript
<MyCalendar
  style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 350
  }}
  theme={{
    calendarBackground: '#ffffff',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
  }}
/>
```

## License

Your package is ISC licensed.
