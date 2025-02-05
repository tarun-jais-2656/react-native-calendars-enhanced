import React, { useMemo, useRef, useState } from 'react';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import styles from './styles';
import CustomModal from './component/modal';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/icons';
import { dayNames, months, years } from '../../utils/calendarUtils';
import { CustomCalendarProps, MarkedDates } from './@types';

const MyCalendar: React.FC<CustomCalendarProps> = ({
    hasRange,
    nextActiveDays,
    todayTextColor = '#00adf5',
    disableWeekends = false,
    disablePrevDates = false,
    rangeDateColor = 'lightgreen',
    selectedColor,
    startingDayColor = 'green',
    endingDayColor = 'green',
    ...props
}) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string>('');
    const [selectedEndDate, setSelectedEndDate] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const INITIAL_DATE = new Date().toISOString().split('T')[0];
    const customHeaderProps: any = useRef();

    const toggleCalendar = () => {
        setIsVisible((prev) => !prev);
    };

    const formatMonth = (date: string) => {
        const month = new Date(date);
        const monthString = months[month.getMonth()];
        const year = month.getFullYear();
        return `${monthString}-${year}`;
    };

    const [currentMonth, setCurrentMonth] = useState(formatMonth(INITIAL_DATE));


    const getDate = (count: number | undefined) => {
        const date = new Date(INITIAL_DATE);
        const newDate = count != undefined ? date.setDate(date.getDate() + count) : '';
        return CalendarUtils.getCalendarDateString(newDate);
    };
    const str = nextActiveDays != undefined ? getDate(nextActiveDays) : '';

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
            marked[selectedStartDate] = { selected: true, startingDay: true, color: startingDayColor };
        }
        if (selectedEndDate) {
            marked[selectedEndDate] = { selected: true, endingDay: true, color: endingDayColor };
        }
        if (selectedStartDate && selectedEndDate) {
            const datesInRange = getDatesInRange(selectedStartDate, selectedEndDate);
            datesInRange.forEach((date) => {
                if (date !== selectedStartDate && date !== selectedEndDate) {
                    marked[date] = { selected: true, color: rangeDateColor };
                }
            });
        }
        return marked;
    }, [selectedStartDate, selectedEndDate]);


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
    const openYear = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const getMonthNumber = (monthString: string) => {
        console.log(monthString)
        return months.indexOf(monthString);
    };
    const [currentMonthStr, currentYearStr] = currentMonth.split('-');
    const selectMonth = (item: string) => {
        const currentMonthNumber = getMonthNumber(currentMonthStr);
        const currentYearNumber = parseInt(currentYearStr, 10);
        if (item.length == 3) {
            const target = getMonthNumber(item);
            let monthDifference = target - currentMonthNumber;
            if (monthDifference < 0) {
                setCustomHeaderNewMonth(false, Math.abs(monthDifference));
            } else {
                setCustomHeaderNewMonth(true, monthDifference);
            }
            setDropdownVisible(false);
        } else {
            const target = parseInt(item);
            let yearDifference = target - currentYearNumber;
            if (yearDifference < 0) {
                setCustomHeaderNewMonth(false, 12 * Math.abs(yearDifference));
            } else {
                setCustomHeaderNewMonth(true, 12 * yearDifference);
            }
            setDropdownVisible1(false);
        }
    };

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
                        <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalendar}>
                            <View style={styles.selectDateView}>
                                <Text style={styles.txt}>From</Text>
                                {selectedStartDate === '' ? (
                                    <Text style={styles.txt1}>Select date</Text>
                                ) : (
                                    <Text style={styles.txt1}>{selectedStartDate}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalendar}>
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
                    <TouchableOpacity style={styles.selectDateViewSize} onPress={toggleCalendar}>
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
                        maxDate={str}
                        minDate={disablePrevDates ? INITIAL_DATE : ''}
                        theme={{
                            calendarBackground: '#ffffff',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: todayTextColor,
                        }}
                        firstDay={1}
                        disabledByWeekDays={disableWeekends ? [6, 0] : []}
                        disableAllTouchEventsForDisabledDays
                        {...props}
                    />
                ) : (
                    <Calendar
                        markedDates={{
                            [selectedStartDate]: { selected: true, selectedColor: selectedColor, disableTouchEvent: true }
                        }}
                        onDayPress={sigleDayPress}
                        style={styles.calView}
                        enableSwipeMonths
                        customHeader={CustomHeader}
                        maxDate={str}
                        minDate={disablePrevDates ? INITIAL_DATE : ''}
                        theme={{
                            calendarBackground: '#ffffff',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: todayTextColor,
                        }}
                        firstDay={1}
                        disabledByWeekDays={disableWeekends ? [6, 0] : []}
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
export default MyCalendar;
