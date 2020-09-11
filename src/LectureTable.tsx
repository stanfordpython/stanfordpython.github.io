import React, { FunctionComponent, Component, CSSProperties } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

interface LectureRowProps {
    title: string,
    date: moment.Moment,
    // URL props:
    condensed: string,
    full: string,
    video: string,
    code: string,
    // Display props:
    visible: boolean,
    active: boolean,
    highlight?: boolean
}

const Lecture: FunctionComponent<LectureRowProps> =
    ({title, date, condensed, full, video, visible, code, active, 
        highlight}: LectureRowProps) => {

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
    let codeLink: JSX.Element | null;
    if (!code || code === "#") {
        codeLink = null;
    } else {
        codeLink = (<a href={code}>Code</a>);
    }

    const formattedDate: string = date.format("MMMM Do YYYY");

    return (
          <tr style={rowStyle}>
            <td>{title}</td>
            <td>{formattedDate}</td>
            <td><a href={condensed}>Condensed Slides</a>
                <br></br>
                <a href={full}>Full Slides</a>
            </td>
            <td><a href={video}>Video</a></td>
            <td>{codeLink}</td>
          </tr>
    );
}

interface LectureDataState {
    highlight: number,
    lectureData?: Array<LectureRowProps>
}

export class LectureData extends Component<{}, LectureDataState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            highlight: 0
        }
    }

    componentDidMount() {
        let lectureData = require('./lectures.json');
        lectureData = lectureData.map(
            <LectureRowProps,>
            ({ date, ...v }: { date: string }) => {
                return {
                    date: moment(date, "YYYY-MM-DD"),
                    ...v
                }
            }
        )

        let i;
        for (i = 0; i < lectureData.length; i++) {
            if (moment() < lectureData[i].date) {
                break;
            }
        }

        this.setState({ lectureData, highlight: i });
    }

    render () {
        let lectureData = this.state.lectureData;
        if (!lectureData) {
            return null
        }

        return (
            <div className="lecturedata-container">
            <Table bordered hover className="scheduleTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Slides</th>
                        <th>Video</th>
                        <th>Code</th>
                    </tr>
                </thead>
            <tbody>
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