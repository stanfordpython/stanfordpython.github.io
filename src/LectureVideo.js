import React from 'react';
import ReactPlayer from 'react-player';
import { NoMatch } from './NoMatch';
import { Page } from './Page';

export class LecturePage extends Page {
    constructor(props) {
        super(props);

        this.urlMapping = require('./lectureVideos.json');
        this.state = {
            chat: '',
            failed: false,
          };
    }

    convertUrl = (url) => {
        return this.urlMapping[this.props.match.params.slug]
    }

    componentDidMount() {

        try {
            var chatPromise = this.fetchFile(
                this.convertUrl(this.props.match.params.slug)[3]
                );
        }
        catch {
            this.state.failed = true;
            return;
        }    
		
		chatPromise.then(result => {
            // Success!
			this.setState({chat: result});
		}, function(value) {
			// Failure!
        });
    }

    render() {
        try {
            let vidUrl = this.convertUrl(this.props.match.params.slug)[0];
        }
        catch {
            this.state.failed = true;
        }

        if (this.state.failed) {
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
            <br></br>
            <p>Transcript:</p> 
            <div style={{height:350, overflow:"auto"}}>
                <p>{this.state.chat}</p>
            </div>
            </div>
        )
    }
}
