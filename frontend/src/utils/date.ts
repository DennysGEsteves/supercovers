import { intervalToDuration, format } from 'date-fns';

const basicFmt = 'dd/MM/yyyy';
export class DateUtil {
  static secondsToMinutesString(seconds: number): string {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

    duration.minutes = (duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes) as number;
    duration.seconds = (duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds) as number;

    return `${duration.minutes}:${duration.seconds}`;
  }

  static stringToDate(string: string, fmt = basicFmt) {
    return format(new Date(string), fmt);
  }
}
