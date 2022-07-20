export function formatReadingTime(minutes: number) {
  let numCups = Math.round(minutes / 5);
  let emoji = "☕️";
  if (numCups > 5) {
    [emoji, numCups] = ["🍱", Math.round(numCups / Math.E)];
  }
  return `${new Array(numCups || 1).fill(emoji).join("")} ${minutes} min read`;
}

export let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  let monthName = months[date.getMonth()];
  let dayOfMonth = date.getDate();
  let fourDigitYear = date.getFullYear();

  return `${monthName} ${dayOfMonth}, ${fourDigitYear}`;
}

import ReactCountryFlag from "react-country-flag";

import { hasFlag } from "country-flag-icons";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

const langMap: { [key: string]: string } = {
  ENG: "GB",
  US: "GB",
  SLO: "SI",
};
function getFlag(str: string): JSX.Element | string {
  let up = str.toUpperCase();
  if (up in langMap) up = langMap[up];
  if (hasFlag(up)) {
    return <ReactCountryFlag countryCode={up} svg />;
  }
  return <>{getUnicodeFlagIcon(up)}</>;
}

const flagPrefix = "lang:";

export const tagComparator = (a:string, b:string) => {
  const aS = a.startsWith(flagPrefix),
  bS = b.startsWith(flagPrefix)
  if (aS==bS) 
    return a.localeCompare(b);
  if(aS) return 1;
  return -1;
}

export function formatTag(tagStr: string): JSX.Element | string {
  const l = tagStr.toLowerCase();
  if (l.startsWith(flagPrefix)) {
    return getFlag(l.substring(flagPrefix.length));
  }
  return tagStr;
}

export function getSequence(endN: number) {
  return Array.from(Array(endN).keys());
}
