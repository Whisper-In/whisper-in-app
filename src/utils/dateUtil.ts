export function formatDateTimeTo12HoursTimeString(sentDateTime: any) {
  if (!(sentDateTime instanceof Date)) {
    sentDateTime = new Date(sentDateTime);    
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(sentDateTime);
}
