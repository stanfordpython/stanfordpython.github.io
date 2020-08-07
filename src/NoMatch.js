import React, { Component } from 'react';
import ReactMd from 'react-md-file';

export class NoMatch extends Component {

	render() {
	return (
		<div className="content">
		<ReactMd fileName={this.props.match.params.slug.concat(".md")} />
		</div>
	);
	}
}

