import React from 'react';
import {
  format, setDay,
} from 'date-fns';
import {
  Grid, GridItem, Heading, Icon, Flex,
} from '@chakra-ui/react';
import { MdOutlineAdd } from 'react-icons/md';

function WeeklySchedule({ setUserFormView, setDashboardView }) {
  // get the dates of the current week and store in an array

  const datesInWeek = [];
  const daysSpelled = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const todayDate = new Date();

  for (let i = 0; i < 7; i += 1) {
    const date = setDay(todayDate, i);
    datesInWeek.push(date);
  }

  const showTodayDate = todayDate.getDate();
  const showTodayDay = todayDate.getDay();

  const daysDate = datesInWeek.map((date) => (
    <div className="all-dates">
      <GridItem className={`main-page-dates ${showTodayDate === date.getDate() && 'today-date-highlight'}`} rowSpan={1} colSpan={1} textAlign="center">
        {date.getDate()}
      </GridItem>
    </div>

  ));
  const days = daysSpelled.map((day, index) => (
    <div className="all-dates">
      <GridItem className={`main-page-days ${showTodayDay === index && 'today-day-highlight'}`} rowSpan={1} colSpan={1} textAlign="center">
        {day}
      </GridItem>
    </div>

  ));

  const monthToday = format(todayDate, 'MMMM');
  const yearToday = format(todayDate, 'yyyy');
  const seeForm = () => {
    setUserFormView(true);
    setDashboardView(false);
  };

  return (
    <>
      <Flex p={3} justify="end">
        <Icon as={MdOutlineAdd} className="add-button" onClick={seeForm} />
      </Flex>
      <Heading as="h1" size="lg" className="main-page-header" pl={2}>
        {monthToday}
        {' '}
        {yearToday}
      </Heading>
      <Grid templateColumns="repeat(7,1fr)" templateRows="repeat(2,1fr)" className="weekly-view">
        {days}
        {daysDate}
      </Grid>
    </>
  );
}

export default WeeklySchedule;
