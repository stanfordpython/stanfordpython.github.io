import Papa from "papaparse";

interface ScheduleRow {
  week: number;
  title1: string;
  desc1: string;
  title2: string;
  desc2: string;
  assignment: string;
  visible: boolean;
}

export default async function getScheduleData() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/180A54pOmH97o3UPZ9P49x068LfHfp8ERNhxdKx_TgRA/pub?output=csv');
  const rawData = Papa.parse(await res.text(), { header: true })
  
  return rawData.data
    .map(
      (row: any) => ({
        ...row,
        visible: row.visible === 'TRUE'
      } as ScheduleRow)
    )
}

export type { ScheduleRow };