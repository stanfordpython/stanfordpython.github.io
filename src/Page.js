import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NoMatch } from './NoMatch';
import CodeBlock from './CodeBlock';
import Remarkable from 'remarkable';
import toc from 'markdown-toc-unlazy';

function safeFetch(url, options) {
  if (options == null) options = {}
  if (options.credentials == null) options.credentials = 'same-origin'
  
  return fetch(url, options).then(function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();

    } else {
      var error = new Error(response.statusText || response.status);
      error.response = response;

      return Promise.reject(error);
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}



export class Page extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      md: '',
    };
  }

  fetchFile(path) {
    return safeFetch(path);
  }

  fetchMarkdown(slug) {
  	this.fetchFile(`${slug}.md`)
  	.then((response) => {
        this.setState({
          md: response
        });
    })
    .catch((e) => {
        this.setState({
          md: 404
        })
    });
  }

  componentDidMount() {
		this.fetchMarkdown(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.fetchMarkdown(this.props.match.params.slug);
    }
  }

  render() {   
    console.log(toc('# One\n\n# Two').content);

    if (this.state.md === 404) {
      return (
        <div className="content">
        <NoMatch />
        </div>
      );
    }

    return (
      <div className="content">
      <ReactMarkdown 
        source={this.state.md}
        renderers={{ code: CodeBlock }}/>
      </div>
    );
  }
}