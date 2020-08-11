import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NoMatch } from './NoMatch';

export class Page extends Component {

	// Constructor
	constructor(props) {
		super(props);
		this.state = {
		  md: '',
		};
	  }

	// fetch the md file
	fetchFile(file) {
		let request = new Request(file, {
		headers: new Headers({
			'Content-Type': 'text/plain'
		})
		});
		return fetch(request).then(res => {
			console.log(res);
			if (!res.ok) {
				throw new Error(res.statusText);
		}

		return res.text().then(text => {
			return text;
		});
		}).catch(err => {
			this.setState({md: 404});
			throw new Error('Failed fetching file: ' + err.message);
		});
	}

	componentDidMount() {
		var mdPromise = this.fetchFile(
			this.props.match.params.slug.concat(".md")
			);
		
		mdPromise.then(result => {
            // Success!
			this.setState({md: result});
		}, function(value) {
			// Failure!
		});
		
	}

	render() {		
        if (this.state.md === 404) {
            return (
                <div className="content">
                <NoMatch />
                </div>
            );
        }
		return (
			<div className="content">
			<ReactMarkdown source={this.state.md} />
			</div>
		);
	}
}