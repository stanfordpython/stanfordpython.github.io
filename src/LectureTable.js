import React, { Component } from 'react';
import Moment from 'moment';
import Table from "react-bootstrap/Table";


function Lecture({title, date, condensed, full, video, visible, code, active, 
                 highlight}) {
    
    // Check date for row highlighting
    let rowStyle;
    if (highlight) {
        rowStyle={
            backgroundColor: "#FFF0F0",
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
    let codeLink;
    if (!code || code === "#") {
        codeLink = null;
    } else {
        codeLink = (<a href={code}>Code</a>);
    }

    return (
          <tr style={rowStyle}>
            <td>{title}</td>
            <td>{date}</td>
            <td><a href={condensed}>Condensed Slides</a>
                <br></br>
                <a href={full}>Full Slides</a>
            </td>
            <td><a href={video}>Video</a></td>
            <td>{codeLink}</td>
          </tr>
    );
}

export class LectureData extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.highlight = 0;
    }

    componentDidMount() {
        let lectureData = require('./lectures.json');
        this.setState({ lectureData });

        let i;
        for (i = 0; i < lectureData.length; i++) {
            if (Moment() < Moment(lectureData[i].date, "YYYY-MM-DD")) {
            this.highlight = i;
            break;
            }
        }
    }

    render () {
        let lectureData = this.state.lectureData;
        if (!lectureData) {
            return null
        }

        return (
            <div className="lecturedata-container">
            <Table bordered hover className="scheduleTable">
            <tbody>
            <tr style={{fontWeight: "bold"}}>
                <td>Title</td>
                <td>Date</td>
                <td>Slides</td>
                <td>Video</td>
                <td>Code</td>
            </tr>
                {
                    lectureData.map((lectureData, index) =>
                    (
                        <Lecture
                            key={index}
                            title={lectureData.title}
                            date={lectureData.date}
                            condensed={lectureData.condensed}
                            full={lectureData.full}
                            video={lectureData.video}
                            code={lectureData.code}
                            visible={lectureData.visible}
                            active={lectureData.active}
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