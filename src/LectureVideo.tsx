import React from 'react';
import ReactPlayer from 'react-player';
import { NoMatch } from './NoMatch';
import { Page, PageProps, PageState } from './Page';

interface LectureInfo {
    YTSlug: string,
    title: string,
    notes: string,
    chatFile: string
}
interface URLMapping {
    [slug: string]: LectureInfo
}
const urlMapping: URLMapping = require('./lectureVideos.json');

export class LecturePage extends Page {
    constructor(props: PageProps) {
        super(props);

        this.state = {
            md: '',
            scrollTo: null,
            chat: '',
            failed: false,
            vidInfo: ''
        };
    }

    convertUrl = (url: string): LectureInfo => {
        return urlMapping[this.props.match.params.slug]
    }

    fetchVidInfo() {
        let vidInfo: LectureInfo;
        let chatPromise: Promise<any>;
        try {
            vidInfo = this.convertUrl(this.props.match.params.slug);
            chatPromise = this.fetchFile(vidInfo.chatFile);
        }
        catch {
            this.setState({ failed: true });
            return;
        }

        chatPromise.then((result) => {
            // Success!
            this.setState({ chat: result, vidInfo: vidInfo, failed: false });
        }).catch((e) => {
            // Failure!
            this.setState({ vidInfo: vidInfo, failed: false });
        });
    }

    componentDidMount() {
        this.fetchVidInfo();
    }

    componentDidUpdate(prevProps: PageProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.fetchVidInfo();
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
                <div className="mt-4 mb-4 d-flex justify-content-center">
                    <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${this.state.vidInfo.YTSlug}`} 
                        controls={true} 
                    />
                </div>
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
