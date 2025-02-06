import { CalendarProps } from "react-native-calendars";

interface CustomCalendarProps extends CalendarProps {
    hasRange?: boolean;
    nextActiveDays?: number;
    todayTextColor?: string;
    disableWeekends?: boolean;
    disablePrevDates?: boolean;
    rangeDateColor?: string;
    selectedColor?: string;
    startingDayColor?: string;
    endingDayColor?: string;
    dayNamesColor?:string;
    weekendDaysColor?:string;
    headerTittleColor?:string;
    headerIconColor?:string;
    getStartDate?: (startDate: string) => void;
    getEndDate?: (endDate: string) => void;
    getRange?: (dates: string[]) => void;
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