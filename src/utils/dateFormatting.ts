import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const parseDateFromDb = (date: string): Dayjs =>
  dayjs(date, "DD.MM.YYYY");

export const formatDateForDb = (date: Dayjs): string =>
  date.format("DD.MM.YYYY");

export const formatCompletedAtForDb = (date: Dayjs): number => date.valueOf();

export const parseDateFromInput = (date: string): Dayjs =>
  dayjs(date, "YYYY-MM-DD");

export const formatDateForInput = (date: Dayjs): string =>
  date.format("YYYY-MM-DD");

export const formatDateForInputLabel = (date: Dayjs): string =>
  date.format("ddd, D MMM YYYY");

export const formatDateForHeader = (date: Dayjs): string =>
  date.format("MMM YYYY");

export const formatDateForPlansList = (date: Dayjs): string =>
  date.format("DD.MM");

export const formatWeekdayForPlansList = (date: Dayjs): string =>
  date.format("ddd");
