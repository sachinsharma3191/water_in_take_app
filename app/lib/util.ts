import moment from "moment-timezone";
import { unitOfTime } from "moment/moment";

const DATE_TIME_FORMAT = "DD-MM-YYYY h:mm:ss A";

function convertCurrentUTCTimeToAnotherTimeZone(timezone: string) {
  return convertTimeToTimeZone(currentTimeInUTC(), timezone);
}

function convertCurrentUTCTimeToAnotherTimeZoneInDateTimeFormat(
  timezone: string,
): string {
  return convertCurrentUTCTimeToAnotherTimeZone(timezone).format(
    DATE_TIME_FORMAT,
  );
}

function currentTimeInDateTimeFormat() {
  return currentTimeInUTC().format(DATE_TIME_FORMAT);
}

function currentTimeInUTC() {
  return moment.utc();
}

function convertTimeToTimeZone(time: moment.Moment, timezone: string) {
  return moment.tz(convertMomentToString(time), timezone);
}

function subtractCurrentDateTime(
  amount: number,
  unit: unitOfTime.DurationConstructor,
) {
  return currentTimeInUTC().subtract(amount, unit);
}

function subtractCurrentDateTimeWithTimeZone(
  amount: number,
  unit: unitOfTime.DurationConstructor,
) {
  return subtractCurrentDateTime(amount, unit);
}

export function subtractCurrentDateTimeWithTimeZoneInDateTimeFormat(
  amount: number,
  unit: unitOfTime.DurationConstructor,
  timezone: string,
) {
  return convertTimeToTimeZone(
    subtractCurrentDateTimeWithTimeZone(amount, unit),
    timezone,
  ).format(DATE_TIME_FORMAT);
}

function convertMomentToString(moment: moment.Moment) {
  return moment.toString();
}
