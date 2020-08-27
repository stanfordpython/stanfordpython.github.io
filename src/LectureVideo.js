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

    fetchVidInfo() {
        let vidInfo;
        try {
            vidInfo = this.convertUrl(this.props.match.params.slug);
            var chatPromise = this.fetchFile(vidInfo.chatFile);
        }

        catch {
            this.setState({failed: true});
            return;
        }

        chatPromise.then((result) => {
            // Success!
            this.setState({chat: result, vidInfo: vidInfo, failed: false});
        }).catch((e) => {
            // Failure!
            this.setState({vidInfo: vidInfo, failed: false});
        });
    }

    componentDidMount() {
        this.fetchVidInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
          this.fetchVidInfo(this.props.match.params.slug);
        }
    }

    render() {

        if (this.state.failed) {
            return (
                <NoMatch/>
            )
        }

        if (!this.state.vidInfo) {
            return null;
        }

        return (
            <div>
            <h3>{this.state.vidInfo.title}</h3>
            <br></br>
            <center>
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${this.state.vidInfo.YTSlug}`} 
                controls={true} 
            />
            </center>
            <br></br>
            <p>Notes: {this.state.vidInfo.notes}</p>
            <br></br>
            <p>Transcript:</p> 
            <div style={{height:350, overflow:"auto"}}>
                <p>{this.state.chat}</p>
            </div>
            </div>
        )
    }
}
