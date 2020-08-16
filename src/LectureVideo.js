import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { NoMatch } from './NoMatch';
import { Page } from './Page';



export class LecturePage extends Page {
    constructor(props) {
        super(props);

        this.urlMapping = require('./lectureMapping.json');
    }

    convertUrl = (url) => {
        return this.urlMapping[this.props.match.params.slug]
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
