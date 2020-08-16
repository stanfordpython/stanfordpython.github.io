import React, { Component } from 'react';
import { lectureData } from './lectures'; 
import Moment from 'moment';

export class LectureData extends Component {
    constructor(props) {
        super(props);
        this.rowStyle={
            backgroundColor: "white"
        };
        this.sethighlight = false;

    }

    Lecture = ({ title, date, condensed, full, video, visible, code, active }) => {
        let parsedDate = Moment(date, "YYYY-MM-DD");
        let now = Moment();
        
        // Check date for row highlighting
        if (now <= parsedDate && !this.sethighlight) {
            this.rowStyle={
                backgroundColor: "#FFF0F0",
                fontWeight: "bold"
            }
            this.sethighlight = true;
        }
        else {
            this.rowStyle={
                backgroundColor: "white"
            };
        }

        if (!visible) return <div />;
        // If there isn't code, don't render it
        if (!code || code === "#") {
            return (
                <tr style={this.rowStyle}>
                  <td>{title}</td>
                  <td>{date}</td>
                  <td><a href={condensed}>Condensed Slides</a>
                      <br></br>
                      <a href={full}>Full Slides</a>
                  </td>
                  <td><a href={video}>Video</a></td>
                  <td></td>
                </tr>
          );
        }
        // If there is code and the row is visible, render it
        return (
              <tr>
                <td>{title}</td>
                <td>{date}</td>
                <td><a href={condensed}>Condensed Slides</a>
                    <br></br>
                    <a href={full}>Full Slides</a>
                </td>
                <td><a href={video}>Video</a></td>
                <td><a href={code}>Code</a></td>
              </tr>
        );
      };

    render () {
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
                {lectureData.map((lectureData) => {
                    return (
                            <this.Lecture 
                                title={lectureData.title}
                                date={lectureData.date}
                                condensed={lectureData.condensed}
                                full={lectureData.full}
                                video={lectureData.video}
                                code={lectureData.code}
                                visible={lectureData.visible}
                                active={lectureData.active}
                            />    
                    );
                })}
                </table>
              </div>
          );
        }
}
