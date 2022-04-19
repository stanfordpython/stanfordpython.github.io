import React, { FunctionComponent, Component, CSSProperties } from 'react';
import moment from 'moment';
import Table from "react-bootstrap/Table";

interface LabRowProps {
    week: string,
    topic: string,
    solutions: string | null,
    date: moment.Moment,
    visible: boolean,
    highlight?: boolean
}

const Lab: FunctionComponent<LabRowProps> = 
    ({week, topic, solutions, date, visible, highlight}: LabRowProps) => {
    if (!visible) {
        return null;
    }

    // Check date for row highlighting
    let rowStyle: CSSProperties = {};
    if (highlight) {
        rowStyle = {
            backgroundColor: "#e6e0f3",
            fontWeight: "bold"
        }
    }

    // Is it past due date? Then post solutions.
    let solutionsElem: JSX.Element | null;
    if (moment() < date || solutions === "#" || solutions === null) {
        solutionsElem = <div>N/A</div>;
    } else {
        solutionsElem = (<a href={solutions}>Solutions</a>);
    }

    return (
          <tr style={rowStyle}>
            <td>{week}</td>
            <td>{topic}</td>
            <td>{solutionsElem}</td>
          </tr>
    );
}

interface LabDataState {
    highlight: number,
    labData?: Array<LabRowProps>
}

export class LabData extends Component<{}, LabDataState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            highlight: -1
        }
    }

    componentDidMount() {
        let labData = require('../res/labs.json');
        labData = labData.map(
            <LabRowProps,>
            ({ date, ...v }: { date: string }) => {
                return {
                    date: moment(date, "YYYY-MM-DD HH:mm:ss A"),
                    ...v
                }
            }
        )

        let i;
        for (i = 0; i < labData.length; i++) {
            if (moment() < labData[i].date) {
                break;
            }
        }

        // Only highlight first row if date is less than a week away
        if (i === 0 && moment().diff(labData[i].date, "days") <= -7) {
            this.setState({ labData });
        }
        else {
            this.setState({ labData, highlight: i });
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
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Topic</th>
                        <th>Solutions</th>
                    </tr>
                </thead>
            <tbody>
                {
                    labData.map((labData, index) =>
                    (
                        <Lab
                            key={index}
                            week={labData.week}
                            topic={labData.topic}
                            solutions={labData.solutions}
                            date={labData.date}
                            visible={labData.visible}
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