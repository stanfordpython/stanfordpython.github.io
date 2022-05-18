import Papa from "papaparse";
import moment, { Moment } from 'moment';

interface AssignmentRow {
  title: string;
  due: Moment | null;
  type: string;
  visible: boolean;
  highlighted: boolean;
  materials: {
    title: string,
    link: string
  }[]
}

function parseMaterials(d: any): AssignmentRow {
  // move the material columns into a list of materials
  let out: any = { materials: [] };
  const materialRe = /^material([^_]+)$/g;

  for (const k of Object.keys(d)) {
    if (!d[k]) continue; // ignore blank columns
    const m = k.matchAll(materialRe);

    // Iterate through the matches
    let match = null;
    // @ts-ignore
    for (match of m) { }

    if (match != null) {
      // this is a material column
      const idx = match[1];
      out.materials.push({
        title: d[k],
        link: d[`material${idx}_link`]
      })
    } else {
      if (k.startsWith('material')) continue; // material_link columns

      // this is a normal column
      out[k] = d[k];
    }
  }

  return out;
}

export default async function getAssignmentData() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/15zzAg-WnE-tZpxHGCOdUNhGzZ2J_2T_TouClrWcwfMM/pub?output=csv');
  const rawData = Papa.parse(await res.text(), { header: true });

  const out = rawData.data
    .map(
      (row: any) => ({
        ...row,
        visible: row.visible === 'TRUE',
        highlighted: row.highlighted === 'TRUE'
      })
    )
    .filter(d => d.visible)
    .map(parseMaterials)
    .map(row => ({
      ...row,
      due: row.due ? moment(row.due, "YYYY-MM-DD HH:mm:ss Z", false) : null,
    }));
  
  return out;
}

export type { AssignmentRow };