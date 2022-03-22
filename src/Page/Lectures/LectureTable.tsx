import React, { FunctionComponent, Component, CSSProperties } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

interface LectureRowProps {
  title: string,
  date: moment.Moment,
  // URL props:
  handout?: {
    title: string,
    url: string,
  },
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
  ({title, handout, date, condensed, full, video, visible, code, active, 
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

  // Are condensed slides linked?
  let condensedLink: JSX.Element | null;
  if (!condensed || condensed === "#") {
    condensedLink = <div>N/A</div>;
  } else {
    condensedLink = (<a href={condensed}>Condensed Slides</a>);
  }

  // Are full slides linked?
  let fullLink: JSX.Element | null;
  if (!full || full === "#") {
    fullLink = null;
  } else {
    fullLink = <div><a href={full}>Full Slides</a></div>;
  }

  // Is video linked?
  let videoLink: JSX.Element | null;
  if (!video || video === "#") {
    videoLink = <div>N/A</div>;
  } else {
    videoLink = (<a href={video}>Video</a>);
  }

  // Is there code?
  let codeLink: JSX.Element | null;
  if (!code || code === "#") {
    codeLink = <div>N/A</div>;
  } else {
    codeLink = (<a href={code}>Code</a>);
  }

  const localdate = moment(date).local()
  const formattedDate: string = localdate.format("MMMM Do YYYY");

  return (
      <tr style={rowStyle}>
      <td>
        {title}
        {handout 
        ? (<><br /><i>Reading:</i> <a href={handout.url}>{handout.title}</a></>)
        : null}
      </td>
      <td>{formattedDate}</td>
      <td>{condensedLink}
        
        {fullLink}
      </td>
      <td>{videoLink}</td>
      <td>{codeLink}</td>
      </tr>
  );
}

interface LectureDataState {
  highlight: number,
  lectureData?: Array<LectureRowProps>
}

export default class LectureData extends Component<{}, LectureDataState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      highlight: -1
    }
  }

  componentDidMount() {
    let lectureData = require('../../res/lectures.json');
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
      if (moment().isSameOrBefore(lectureData[i].date, 'day')) {
        break;
      }
    }

    // Only highlight first row if date is less than a week away
    if (i === 0 && moment().diff(lectureData[i].date, "days") >= -7) {
      this.setState({ lectureData });
    }
    else {
      this.setState({ lectureData, highlight: i });
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
              highlight={index === this.state.highlight}
              {...lectureData}
            />  
          ))
        }
        </tbody>
        </Table>
        </div>
      );
    }
}
