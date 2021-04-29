import React, { FunctionComponent, Component, CSSProperties } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

interface AssignmentRowProps {
    title: string,
    num: number | null,
    spec: string,
    starterCode: string,
    due: moment.Moment | null,
    visible: boolean,
    highlight?: boolean
}

const Assignment: FunctionComponent<AssignmentRowProps> =
    ({title, num, spec, starterCode, due, visible, highlight}: AssignmentRowProps) => {
    
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
    let assignmentText = num === null ? "" : `Assignment ${num}: `;
    if (!spec || spec === "#") {
        specLink = <div>{assignmentText}{title}</div>;
    } else {
        specLink = <a href={spec}>{assignmentText}{title}</a>;
    }

    return (
        <tr style={rowStyle}>
        <td>{specLink}</td>
        <td>{starterCodeLink}</td>
        {
            due
            ? <td>
                <b>Local Time:</b> {due.local().format("MMMM Do YYYY @ h:mma z")}<br />
                <b>PDT:</b> {due.format("MMMM Do YYYY @ h:mma")}<br />
                ({due.fromNow()})
            </td>
            : <td>Coming soon™</td>
        }
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
                due: due === "#" ? null : moment(due, "YYYY-MM-DD HH:mm:ss A"),
                ...v
            }
        })

        // Find the next assignment that's due
        let i;
        for (i = 0; i < assignmentData.length; i++) {
            const due = assignmentData[i].due;
            if (moment() < due) {
                break;
            }
        }

        // Is it too far away?
        const nearEnough = moment().diff(assignmentData[i].due, "days") >= -14;

        // Only highlight first row if date is less than two weeks away
        if (nearEnough) {
            this.setState({ assignmentData, highlight: i });
        }
        else {
            this.setState({ assignmentData });
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
                            num={assignmentData.num}
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