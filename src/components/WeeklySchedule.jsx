import React from 'react';
import {
  format, compareAsc, setDay,
} from 'date-fns';
import { Grid, GridItem, Heading } from '@chakra-ui/react';

function WeeklySchedule() {
  // get the dates of the current week and store in an array

  const datesInWeek = [];
  const daysSpelled = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const todayDate = new Date();

  for (let i = 0; i < 7; i += 1) {
    const date = setDay(todayDate, i);
    datesInWeek.push(date);
  }

  const daysDate = datesInWeek.map((date) => (<GridItem rowSpan={1} colSpan={1} textAlign="center">{date.getDate()}</GridItem>));
  const days = daysSpelled.map((day) => (
    <GridItem rowSpan={1} colSpan={1} textAlign="center">
      {day}
    </GridItem>
  ));

  const monthToday = format(todayDate, 'MMMM');
  const yearToday = format(todayDate, 'yyyy');

  return (
    <>
      <Heading as="h1" size="2xl">
        {monthToday}
        {' '}
        {yearToday}
      </Heading>
      <Grid templateColumns="repeat(7,1fr)" templateRows="repeat(2,1fr)">
        {daysDate}
        {days}
      </Grid>

      <Heading as="h2" size="xl"> Today X medications</Heading>
    </>
  );
}

export default WeeklySchedule;
