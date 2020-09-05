import React, { Component } from 'react';
import Moment from 'moment';
import Table from "react-bootstrap/Table";

function Lab({week, topic, code, solutions, date, visible, highlight}) {
    
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

    // Is it past due date? Then post solutions.
    if (Moment() < Moment(date, "YYYY-MM-DD HH:mm:ss A") ||
        solutions === "#" || solutions === null) {
        solutions = null;
    } else {
        solutions = (<a href={solutions}>Solutions</a>);
    }

    return (
          <tr style={rowStyle}>
            <td>{week}</td>
            <td>{topic}</td>
            <td><a href={code}>Starter Code</a></td>
            <td>{solutions}</td>
          </tr>
    );
}

export class LabData extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.highlight = 0;
    }

    componentDidMount() {
        let labData = require('./labs.json');
        this.setState({ labData });

        let i;
        for (i = 0; i < labData.length; i++) {
            if (Moment() < Moment(labData[i].date, "YYYY-MM-DD HH:mm:ss A")) {
                this.highlight = i;    
                break;
            }
        }
    }

    render () {
        let labData = this.state.labData;
        if (!labData) {
            return null
        }

        return (
            <div className="labdata-container">
            <Table bordered hover className="scheduleTable">
            <tbody>
            <tr style={{fontWeight: "bold"}}>
                <td>Week</td>
                <td>Topic</td>
                <td>Starter Code</td>
                <td>Solutions</td>
            </tr>
                {
                    labData.map((labData, index) =>
                    (
                        <Lab
                            key={index}
                            week={labData.week}
                            topic={labData.topic}
                            code={labData.code}
                            solutions={labData.solutions}
                            date={labData.date}
                            visible={labData.visible}
                            highlight={index === this.highlight}
                        />    
                    ))
                }
                </tbody>
                </Table>
              </div>
          );
        }
}