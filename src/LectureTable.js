import React, { Component } from 'react';
import Moment from 'moment';

function Lecture({title, date, condensed, full, video, visible, code, active, 
                 highlight}) {
    let parsedDate = Moment(date, "YYYY-MM-DD");
    let now = Moment();
    
    // Check date for row highlighting
    let rowStyle;
    if (now <= parsedDate && !highlight) {
        rowStyle={
            backgroundColor: "#FFF0F0",
            fontWeight: "bold"
        }
        highlight = true;
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

        this.rowStyle={
            backgroundColor: "white"
        };

        this.sethighlight = false;
    }

    componentDidMount() {
        let lectureData = require('./lectures.json');
        this.setState({ lectureData });
    }

    render () {
        let lectureData = this.state.lectureData;
        if (!lectureData) {
            return null
        }

        return (
            <div className="lecturedata-container">
            <table>
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
                            highlight={this.sethighlight}
                        />    
                    ))
                }
                </table>
              </div>
          );
        }
}