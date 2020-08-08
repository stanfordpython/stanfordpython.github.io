import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';


export class NoMatch extends Component {

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
		if (!res.ok) {
			throw new Error(res.statusText);
		}

		return res.text().then(text => {
			return text;
		});
		}).catch(err => {
		throw new Error('Failed fetching file: ' + err.message);
		});
	}

	componentDidMount() {
		var mdPromise = this.fetchFile(
			this.props.match.params.slug.concat(".md")
			);
		
		mdPromise.then(result => {
			// Success!
			console.log("Result")
			console.log(result);
			this.setState({md: result});
		}, function(value) {
			// Failure!
			this.setState({md: "404 Page Not Found"});
		});
		
	}

	render() {			

		return (
			<div className="content">
			<ReactMarkdown source={this.state.md} />
			</div>
		);
	}
}