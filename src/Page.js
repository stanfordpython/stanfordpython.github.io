import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NoMatch } from './NoMatch';
import CodeBlock from './CodeBlock';

import toc from 'markdown-toc-unlazy';
import uslug from 'uslug';


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

/**
 * The Header object renders each markdown header and uses a reference to scroll
 * to this header when the parent component passes the prop to do so.
 * 
 * @param  children The children of the react component.
 * @param  level    The level of the header (1, 2, 3, ...).
 * @param  scrollTo The element to scroll to. If this matches the slug, the
 *                  component will atempt to scroll here.
 */
const Header = ({ children, level, scrollTo }) => {
  const DOMChildren = React.Children.toArray(children);
  
  const text = DOMChildren.reduce(flatten, '');
  const slug = uslug(text);

  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if ((scrollTo === slug) && (scrollRef.current)) {
      scrollRef.current.scrollIntoView();
    }
  }, [scrollTo, slug]);

  return React.createElement('h' + level, {id: slug, ref: scrollRef}, children)
}


export class Page extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      md: '',
      scrollTo: null
    };

    this.customSlug = this.customSlug.bind(this);
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

  customSlug(s) {
    /* Create a slug for s that prepends the current path */
    const currLocation = this.props.location.pathname;
    return currLocation + '#' + uslug(s)
  }

  componentDidMount() {
		this.fetchMarkdown(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.fetchMarkdown(this.props.match.params.slug);
    }

    // Find the hash of the targeted element and scroll into view.
    const currHash = this.props.location.hash;
    const elemID = currHash.slice(1);
    if (currHash && (this.state.scrollTo !== elemID)) {
      this.setState({ scrollTo: elemID })
    }

    // Clear the hash if there isn't one anymore
    if (!currHash && this.state.scrollTo) {
      this.setState({ scrollTo: null });
    }
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
        <div className="content" id="content">
        <ReactMarkdown 
          source={toc(this.state.md, {slugify: this.customSlug}).content}
        />
        <ReactMarkdown 
          source={this.state.md}
          renderers={{ 
            code: CodeBlock, 
            heading: (props) => Header({ 
              scrollTo: this.state.scrollTo,
              ...props })
          }}/>
        </div>
      </div>

    );
  }
}