import { CalendarProps } from "react-native-calendars";

interface CustomCalendarProps extends CalendarProps {
    hasRange?: boolean;
    nextActiveDays?: number;
    todayTextColor?:string;
    disableWeekends?:boolean;
    disablePrevDates?:boolean;
    rangeDateColor?:string;
    selectedColor?:string;
    startingDayColor?:string;
    endingDayColor?:string;
}

interface MarkedDates {
    [date: string]: {
        selected: boolean;
        startingDay?: boolean;
        endingDay?: boolean;
        color: string;
        textColor?: string; 
        disableTouchEvent?: boolean;
    };
}