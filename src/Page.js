import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NoMatch } from './NoMatch';
import CodeBlock from './CodeBlock';
import toc from 'markdown-toc-unlazy';

import { HashLink as Link } from 'react-router-hash-link';


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

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
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

  // Custom heading renderer for anchors defined in the following two functions  
  HeadingRenderer(props) {
    var children = React.Children.toArray(props.children)
    var text = children.reduce(flatten, '')
    var slug = text.toLowerCase().replace(/\W/g, '-')
    console.log(slug)
    return React.createElement('h' + props.level, {id: slug}, props.children)
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
      <div>
      <Link smooth to="#h3">Link to h3</Link>
      <br></br>
      <Link smooth to="#this-is-a-header">Link to primary header</Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="content" id="content">
      <ReactMarkdown source={toc(this.state.md).content}
      />
      <ReactMarkdown 
        source={this.state.md}
        renderers={{ code: CodeBlock, heading: this.HeadingRenderer }}/>
      </div>
      </div>

    );
  }
}