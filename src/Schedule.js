import React, { Component } from 'react';
import Moment from 'moment';

import Table from 'react-bootstrap/Table';

function ScheduleCell(title, description, highlight) {
    let cellStyle;
    if (highlight) {
        cellStyle={
            backgroundColor: "#FFF0F0",
        }
    }
    else {
        cellStyle={};
    }

    return (
          <td style={cellStyle} valign="top">
              <b>{title}</b>
              <br></br>
              {description}
          </td>
  );
}

function ScheduleRow({num, title, visible, days, dates}) {
    
    // If not visible, return
    if (!visible) {
        return null;
    }

    // If we're between the dates, highlight
    let highlight = false;
    if (Moment() >= Moment(dates.start, "YYYY-MM-DD") && 
        Moment() <= Moment(dates.end, "YYYY-MM-DD")) {
            highlight = true;
    }

    // Generate the two columns and their information 
    // using the ScheduleCall function
    // Here it's num+1 because the quarter starts in Week 1, not Week 0
    return (
        <tr>
            <td>{num+1}</td>
            {ScheduleCell(days[0].title, days[0].description, highlight)}
            {ScheduleCell(days[1].title, days[1].description, highlight)}
        </tr>
    );
}

export class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        let scheduleData = require('./schedule.json');
        this.setState({ scheduleData });
    }

    render () {
        let scheduleData = this.state.scheduleData;
        if (!scheduleData) {
            return null
        }

        return (
            <div className="scheduledata-container">
            <Table bordered hover className="scheduleTable">
            <tbody>
            <tr style={{fontWeight: "bold"}}>
                <td>Week</td>
                <td>Monday</td>
                <td>Wednesday</td>
            </tr>
                {
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