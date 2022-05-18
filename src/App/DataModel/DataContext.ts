import { createContext } from "react";
import { AssignmentRow } from "./AssignmentData";
import { LectureRow } from "./LectureData";
import { ScheduleRow } from "./ScheduleData";

interface UniversalData {
  schedule: ScheduleRow[],
  lecture: LectureRow[],
  assignment: AssignmentRow[]
}

const DataContext = createContext<UniversalData | null>(null);

export default DataContext;
export type { UniversalData };