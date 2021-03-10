import React, { FunctionComponent, Component, CSSProperties } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

interface AssignmentRowProps {
    title: string,
    assignmentNumber: number,
    spec: string,
    starterCode: string,
    due: moment.Moment,
    visible: boolean,
    highlight?: boolean
}

const Assignment: FunctionComponent<AssignmentRowProps> =
    ({title, assignmentNumber, spec, starterCode, due, visible, highlight}: AssignmentRowProps) => {
    
    if (!visible) {
        return null;
    }

    // Check date for row highlighting
    let rowStyle: CSSProperties = {};
    if (highlight) {
        rowStyle={
            backgroundColor: "#e6e0f3",
            fontWeight: "bold"
        }
    }
    
    // Is there code?
    let starterCodeLink: JSX.Element | null;
    if (!starterCode || starterCode === "#") {
        starterCodeLink = <div>N/A</div>;
    } else {
        starterCodeLink = (<a href={starterCode}>Starter Code</a>);
    }

    // Only add a hyperlink if there's an assignment spec linked
    let specLink: JSX.Element | null;
    if (!spec || spec === "#") {
        specLink = <div>Assignment {assignmentNumber}: {title}</div>;
    } else {
        specLink = <a href={spec}>Assignment {assignmentNumber}: {title}</a>;
    }

    // How many days from now is it due?
    const dueFromNow: string = due.fromNow();
    const formattedDate: string = due.format("MMMM Do YYYY @ h:mma");
    
    const localDate: string = due.local().format("MMMM Do YYYY @ h:mma z");
    
    return (
          <tr style={rowStyle}>
            <td>{specLink}</td>
            <td>{starterCodeLink}</td>
            <td>{formattedDate} {<b>PST</b>} ({dueFromNow})<br></br>
                {localDate}
            </td>

          </tr>
    );
}

interface AssignmentDataState {
    highlight: number,
    assignmentData?: Array<AssignmentRowProps>
}

export class AssignmentData extends Component<{}, AssignmentDataState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            highlight: -1
        }
    }

    componentDidMount() {
        let assignmentData = require("../res/assignments.json");
        assignmentData = assignmentData.map(
            <AssignmentRowProps,> ({ due, ...v }: {due: string}) => {
            return {
                due: moment(due, "YYYY-MM-DD HH:mm:ss A"),
                ...v
            }
        })

        let i;
        for (i = 0; i < assignmentData.length; i++) {
            const due = assignmentData[i].due;
            if (moment() < due) {
                break;
            }
        }

        // Only highlight first row if date is less than two weeks away
        if (i === 0 && moment().diff(assignmentData[i].due, "days") <= -14) {
            this.setState({ assignmentData });
        }
        else {
            this.setState({ assignmentData, highlight: i });
        }

    }

    render () {
        const assignmentData = this.state.assignmentData;
        if (!assignmentData) {
            return null
        }

        return (
            <div className="assignmentdata-container">
            <Table bordered hover className="scheduleTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Starter Code</th>
                        <th>Due</th>
                    </tr>
                </thead>
            <tbody>
                {
                    assignmentData.map((assignmentData, index) =>
                    (
                        <Assignment
                            key={index}
                            assignmentNumber={index}
                            title={assignmentData.title}
                            spec={assignmentData.spec}
                            starterCode={assignmentData.starterCode}
                            due={assignmentData.due}
                            visible={assignmentData.visible}
                            highlight={index === this.state.highlight}
                        />    
                    ))
                }
                </tbody>
                </Table>
              </div>
          );
        }
}