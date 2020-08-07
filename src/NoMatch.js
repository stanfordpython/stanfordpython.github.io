import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

export class NoMatch extends Component {
  render() {
	return (
		<ReactMarkdown source={
			this.props.match.params.slug
		} />
    );
  }
}

