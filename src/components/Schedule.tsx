import React, { FunctionComponent, Component, CSSProperties } from "react";
import moment from "moment";

import Table from "react-bootstrap/Table";

interface ScheduleCellProps {
    title: string,
    description: string,
    highlight?: boolean
}

const ScheduleCell: FunctionComponent<ScheduleCellProps> = 
    ({ title, description, highlight }: ScheduleCellProps) => {
    
    let cellStyle: CSSProperties = {};
    if (highlight) {
        cellStyle={
            backgroundColor: "#e6e0f3",
        }
    }

    return (
          <td style={cellStyle} valign="top">
              <b>{title}</b>
              <br></br>
              {description}
          </td>
  );
}

interface ScheduleDay {
    title: string,
    date: moment.Moment,
    active: boolean,
    description: string
}

interface ScheduleRow {
    num: number,
    title: string,
    visible: boolean,
    days: Array<ScheduleDay>,
    dates: {
        start: moment.Moment,
        end: moment.Moment
    }
}

// @ts-ignore
const ScheduleRow: FunctionComponent<ScheduleRow> = 
    ({ num, title, visible, days, dates }: ScheduleRow) => {
    
    // If not visible, return
    if (!visible) {
        return null;
    }

    // If we're between the dates, highlight
    let highlight = false;
    if (moment() >= dates.start &&  moment() <= dates.end) {
        highlight = true;
    }

    // Generate the two columns and their information 
    // using the ScheduleCall function
    // Here it's num+1 because the quarter starts in Week 1, not Week 0
    return (
        <tr>
            <td>{num+1}</td>
            {
                days.map((day: ScheduleDay, index: number) => (
                    <ScheduleCell
                        key={`ScheduleCell-${index}`}
                        title={day.title}
                        description={day.description}
                        highlight={highlight}
                    />
                ))
            }
        </tr>
    );
}

interface ScheduleState {
    scheduleData?: Array<ScheduleRow>
}

export class Schedule extends Component<{}, ScheduleState> {
    constructor(props: {}) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        let dirtyScheduleData = require("../res/schedule.json");
        const scheduleData: Array<ScheduleRow> = dirtyScheduleData.map(
            ({ days, dates, ...v }: { 
                days: Array<{ 
                    title: string, 
                    active: boolean, 
                    description: string, 
                    date: string
                }>, 
                dates: { start: string, end: string} 
            }) => {
                // Convert the array of days to ScheduleDays
                interface DirtyScheduleDate extends Omit<ScheduleDay, 'date'> { 
                    date: string 
                };

                const momentDays: Array<ScheduleDay> = days.map(
                    ({ date, ...p }: DirtyScheduleDate) => {
                        return {
                            date: moment(date, "YYYY-MM-DD"),
                            ...p
                        }
                    }
                )

                // Individually convert the start and end date
                return {
                    days: momentDays,
                    dates: {
                        start: moment(dates.start, "YYYY-MM-DD"),
                        end: moment(dates.end, "YYYY-MM-DD")
                    },
                    ...v
                }
            }
        )

        this.setState({ scheduleData });
    }

    render () {
        // @ts-ignore
        let scheduleData = this.state.scheduleData;
        if (!scheduleData) {
            return null
        }

        return (
            <div className="scheduledata-container">
            <h2>Course Schedule</h2>
            <Table bordered hover className="scheduleTable">
            <tbody>
            <tr style={{fontWeight: "bold"}}>
                <td>Week</td>
                <td>Tuesday</td>
                <td>Thursday</td>
            </tr>
                {
                    // @ts-ignore
                    scheduleData.map((scheduleData, index) =>
                    (
                        <ScheduleRow
                            key={index}
                            num={index}
                            title={scheduleData.title}
                            visible={scheduleData.visible}
                            days={scheduleData.days}
                            dates={scheduleData.dates}
                        />    
                    ))
                }
                </tbody>
            </Table>
            </div>
          );
        }
}