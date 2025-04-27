import React, { FC, useContext, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TimelineEventProps, TimelineList, TimelineProps } from 'react-native-calendars';

import TimelineDay from '@/components/booking/Timeline';
import { DISABLE_COLOR, IColorScheme } from '@/constants';
import { ThemeContext } from '@/contexts/theme';
import { hp } from '@/helpers/dimensions';
import { numberTimeToDateTime } from '@/helpers/function';

type Props = {
  events: { [date: string]: TimelineEventProps[] };
  unavailableHours: { start: number; end: number }[];
};

const Timelines: FC<Props> = ({ events, unavailableHours }) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  useEffect(() => {
    console.log('events:', events);
  }, [events]);

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onEventPress: (event: TimelineEventProps) => {
      console.log('TimelineSelector onEventPress: ', event);
    },
    scrollToNow: true,
    unavailableHours: unavailableHours,
    unavailableHoursColor: DISABLE_COLOR,
  };

  const handleAddNewEvent = (startTime: number, endTime: number) => {
    console.log('New event added from Timelines:', startTime, endTime);
  };

  const initialTime = useMemo(() => {
    const startTime = numberTimeToDateTime(unavailableHours[0]?.end);
    return {
      hour: startTime.getHours(),
      minutes: startTime.getMinutes(),
    };
  }, [unavailableHours]);

  return (
    <View style={styles.container}>
      <TimelineList
        events={events}
        timelineProps={timelineProps}
        showNowIndicator
        initialTime={initialTime}
        scrollToNow
        renderItem={(props: TimelineProps) => (
          <TimelineDay
            {...props}
            key={props.date as string}
            onAddNewEvent={handleAddNewEvent}
          />
        )}
      />
    </View>
  );
};

const createStyles = (theme: IColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: hp(65),
      backgroundColor: theme.backgroundLight,
      overflow: 'hidden',
    },
  });

export default React.memo(Timelines);
