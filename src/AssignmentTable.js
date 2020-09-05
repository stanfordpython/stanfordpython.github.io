import React, { Component } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

function Assignment({title, assignmentNumber, spec, starterCode, due, 
                     visible, highlight}) {
    
    // Check date for row highlighting
    let rowStyle;
    if (highlight) {
        rowStyle={
            backgroundColor: "#e6e0f3",
            fontWeight: "bold"
        }
    }
    else {
        rowStyle={
            backgroundColor: "white"
        };
    }

    if (!visible) {
        return null;
    }
    
    // Is there code?
    let starterCodeLink;
    if (!starterCode || starterCode === "#") {
        starterCodeLink = null;
    } else {
        starterCodeLink = (<a href={starterCode}>Starter Code</a>);
    }

    // How many days from now is it due?
    const dueFromNow = moment(due, "YYYY-MM-DD HH:mm:ss A").fromNow();
    const formattedDate = moment(due, "YYYY-MM-DD HH:mm:ss A")
                          .format("MMMM Do YYYY @ h:mma"); 
    
    return (
          <tr style={rowStyle}>
            <td><a href={spec}>Assignment {assignmentNumber}: {title}</a></td>
            <td>{starterCodeLink}</td>
            <td>{formattedDate} ({dueFromNow})</td>
          </tr>
    );
}

export class AssignmentData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlight: 0
        }
    }

    componentDidMount() {
        const assignmentData = require("./assignments.json");

        let i;
        for (i = 0; i < assignmentData.length; i++) {
            const due = moment(assignmentData[i]["due"], 
                               "YYYY-MM-DD HH:mm:ss A");
            if (moment() < due) {
                break;
            }
        }

        this.setState({ assignmentData, highlight: i });
    }

    render () {
        const assignmentData = this.state.assignmentData;
        if (!assignmentData) {
            return null
        }

        return (
            <div className="assignmentdata-container">
            <Table bordered hover className="scheduleTable">
            <tbody>
            <tr style={{fontWeight: "bold"}}>
                <td>Title</td>
                <td>Starter Code</td>
                <td>Due</td>
            </tr>
                {
                    assignmentData.map((assignmentData, index) =>
                    (
                        <Assignment
                            key={index}
                            assignmentNumber={index}
                            title={assignmentData.title}
                            spec={assignmentData.spec}
                            starterCode={assignmentData.starter_code}
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