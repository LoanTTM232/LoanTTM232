import { CalendarUtils } from 'react-native-calendars';

export const convertSecondsToMMSS = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

export const compareDateWithToday = (date: Date): number => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate.getTime() < today.getTime()) {
    return -1;
  } else if (targetDate.getTime() > today.getTime()) {
    return 1;
  } else {
    return 0;
  }
};

export function getCurrentTimeWithOffset() {
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const offsetSign = offsetMinutes <= 0 ? '+' : '-';

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  return (
    now.getFullYear() +
    '-' +
    pad(now.getMonth() + 1) +
    '-' +
    pad(now.getDate()) +
    'T' +
    pad(now.getHours()) +
    ':' +
    pad(now.getMinutes()) +
    ':' +
    pad(now.getSeconds()) +
    offsetSign +
    pad(offsetHours) +
    ':' +
    pad(offsetMins)
  );
}
