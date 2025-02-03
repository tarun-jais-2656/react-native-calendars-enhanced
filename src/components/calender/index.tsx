import React, { useMemo, useRef, useState } from 'react';
import { Calendar, CalendarProps, CalendarUtils } from 'react-native-calendars';
import styles from './styles';
import CustomModal from './component/modal';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons';

interface CustomCalenderProps extends CalendarProps {
    hasRange?: boolean;
    nextActiveDays?: number;
    todayTextColor?:string;
    disableWeekDays?:boolean;
    disableOldDates?:boolean;
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

const Calender: React.FC<CustomCalenderProps> = ({ hasRange, nextActiveDays,todayTextColor='#00adf5',disableWeekDays=false,disableOldDates=false,...props }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string>('');
    const [selectedEndDate, setSelectedEndDate] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const months = [
        "01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"
    ];
    const years = [
        "2015", "2016", "2017", "2018", "2019", "2020",
        "2021", "2022", "2023", "2024", "2025", "2026",
        "2027", "2028", "2029", "2030", "2031", "2032",
        "2033", "2034", "2035",
    ];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];

    const toggleCalender = () => {
        setIsVisible((prev) => !prev);
    };

    const rangeDayPress = (day: { dateString: string }) => {
        if (selectedStartDate && selectedEndDate) {
            setSelectedStartDate(day.dateString);
            setSelectedEndDate('');
        } else if (selectedStartDate) {
            if (selectedStartDate < day.dateString) {
                setSelectedEndDate(day.dateString);
            }
        } else {
            setSelectedStartDate(day.dateString);
        }
    };

    const sigleDayPress = (day: { dateString: string }) => {
        setSelectedStartDate(day.dateString);
    };



    const getDatesInRange = (startDate: string, endDate: string): string[] => {
        const dates: string[] = [];
        const currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dates.push(CalendarUtils.getCalendarDateString(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const markedDates: MarkedDates = useMemo(() => {
        const marked: MarkedDates = {};

        if (selectedStartDate) {
            marked[selectedStartDate] = { selected: true, startingDay: true, color: 'green' };
        }

        if (selectedEndDate) {
            marked[selectedEndDate] = { selected: true, endingDay: true, color: 'green' };
        }

        if (selectedStartDate && selectedEndDate) {
            const datesInRange = getDatesInRange(selectedStartDate, selectedEndDate);
            datesInRange.forEach((date) => {
                if (date !== selectedStartDate && date !== selectedEndDate) {
                    marked[date] = { selected: true, color: 'lightgreen' };
                }
            });
        }
        return marked;
    }, [selectedStartDate, selectedEndDate]);


    const formatMonth = (date: string) => {
        const month = new Date(date);
        const monthString = (month.getMonth() + 1).toString().padStart(2, '0');
        const year = month.getFullYear();
        return `${monthString}-${year}`;
    };

    const INITIAL_DATE = new Date().toISOString().split('T')[0];
    const [currentMonth, setCurrentMonth] = useState(formatMonth(INITIAL_DATE));
    const customHeaderProps: any = useRef();

    const setCustomHeaderNewMonth = (next = false, num = 1) => {
        const add = next ? num : -num;
        const month = new Date(customHeaderProps?.current?.month);
        month.setDate(1);
        const newMonth = new Date(month.setMonth(month.getMonth() + add));
        customHeaderProps?.current?.addMonth(add);
        setCurrentMonth(formatMonth(newMonth.toISOString().split('T')[0]));
    };
    const moveNext = () => {
        setCustomHeaderNewMonth(true, 1);
    };
    const movePrevious = () => {
        setCustomHeaderNewMonth(false, 1);
    };
    const openMonth = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const [currentMonthStr, currentYearStr] = currentMonth.split('-');
    const selectMonth = (item: string) => {
        const currentMonthNumber = parseInt(currentMonthStr, 10);
        const currentYearNumber = parseInt(currentYearStr, 10);

        const target = parseInt(item);
        let monthDifference = target - currentMonthNumber;
        let yearDifference = target - currentYearNumber;

        if (item.length == 2) {
            if (monthDifference < 0) {
                setCustomHeaderNewMonth(false, Math.abs(monthDifference));
            } else {
                setCustomHeaderNewMonth(true, monthDifference);
            }
            setDropdownVisible(false);
        } else {
            if (yearDifference < 0) {
                setCustomHeaderNewMonth(false, 12 * Math.abs(yearDifference));
            } else {
                setCustomHeaderNewMonth(true, 12 * yearDifference);
            }
            setDropdownVisible1(false);
        }
    };


    const openYear = () => {
        setDropdownVisible1(!dropdownVisible1);
    };
    const getDate = (count: number | undefined) => {
        const date = new Date(INITIAL_DATE);
        const newDate = count != undefined ? date.setDate(date.getDate() + count) : '';
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const str = nextActiveDays != undefined ? getDate(nextActiveDays) : '';


    const CustomHeader = React.forwardRef((props, ref) => {
        customHeaderProps.current = props;

        return (
            // @ts-expect-error
            <View ref={ref} {...props} style={styles.customHeader}>
                <View style={styles.customSubHeader}>
                    <TouchableOpacity onPress={movePrevious}>
                        <Image source={icons.arrowPrev} style={styles.img} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={openMonth}>
                            <Text style={styles.month}>{currentMonthStr}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openYear}>
                            <Text style={styles.month}>-{currentYearStr}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={moveNext}>
                        <Image source={icons.arrowNext} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.customSubHeader}>
                    {dayNames.map((day, index) => (
                        <Text key={index} style={styles.dayName}>{day}</Text>
                    ))}
                </View>
            </View>
        );
    });







    return (
        <View style={styles.container}>
            <View style={styles.selectDateMainView}>
                {hasRange ?
                    <React.Fragment>
                        <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalender}>
                            <View style={styles.selectDateView}>
                                <Text style={styles.txt}>From</Text>
                                {selectedStartDate === '' ? (
                                    <Text style={styles.txt1}>Select date</Text>
                                ) : (
                                    <Text style={styles.txt1}>{selectedStartDate}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalender}>
                            <View style={styles.selectDateView}>
                                <Text style={styles.txt}>To</Text>
                                {selectedEndDate === '' ? (
                                    <Text style={styles.txt1}>Select date</Text>
                                ) : (
                                    <Text style={styles.txt1}>{selectedEndDate}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </React.Fragment>
                    :
                    <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalender}>
                        <View style={styles.selectDateView}>
                            {selectedStartDate === '' ? (
                                <Text style={styles.txt1}>Select date</Text>
                            ) : (
                                <Text style={styles.txt1}>{selectedStartDate}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                }
            </View>
            {isVisible && (
                hasRange ? (
                    <Calendar
                        markingType="period"
                        markedDates={markedDates}
                        onDayPress={rangeDayPress}
                        style={styles.calView}
                        enableSwipeMonths
                        customHeader={CustomHeader}
                        hideExtraDays
                        maxDate={str}
                        minDate={disableOldDates ? INITIAL_DATE:''}
                        theme={{
                            calendarBackground: '#ffffff',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: todayTextColor,
                        }}
                        firstDay={1}
                        disabledByWeekDays={disableWeekDays ? [6,0]:[]}
                        disableAllTouchEventsForDisabledDays
                        {...props}
                    />
                ) : (
                    <Calendar
                        markedDates={{
                            [selectedStartDate]: { selected: true, disableTouchEvent: true }
                        }}
                        onDayPress={sigleDayPress}
                        style={styles.calView}
                        enableSwipeMonths
                        customHeader={CustomHeader}
                        hideExtraDays
                        maxDate={str}
                        minDate={disableOldDates ? INITIAL_DATE:''}
                        theme={{
                            calendarBackground: '#ffffff',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: todayTextColor,
                        }}
                        firstDay={1}
                        disabledByWeekDays={disableWeekDays ? [6,0]:[]}
                        disableAllTouchEventsForDisabledDays
                        {...props}
                    />
                )
            )}
            <CustomModal
                isVisible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
                data={months}
                onSelect={selectMonth}
            />
            <CustomModal
                isVisible={dropdownVisible1}
                onClose={() => setDropdownVisible1(false)}
                data={years}
                onSelect={selectMonth}
            />
        </View>
    );
};

export default Calender;
