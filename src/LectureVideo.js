import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { urlMapping } from './lectureMapping';
import { NoMatch } from './NoMatch';

export class LectureVideo extends Component {

    convertUrl = (url) => {
        return urlMapping[this.props.match.params.slug]
    }

    render() {
        let vidUrl = this.convertUrl(this.props.match.params.slug)[0];
        
        if (vidUrl == null) {
            return (
                <NoMatch/>
            )
        }
        return (
            <div>
            <h3>{this.convertUrl(this.props.match.params.slug)[1]}</h3>
            <br></br>
            <center>
            <ReactPlayer url={'https://www.youtube.com/watch?v='.concat(this.convertUrl(this.props.match.params.slug))} controls={true} />
            </center>
            <br></br>
            <p>Notes: {this.convertUrl(this.props.match.params.slug)[2]}</p>
            </div>
        )
    }
}
