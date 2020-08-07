import React from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'html-to-react';
import marked from 'marked';

/**
 * This is a component for rendering markdown files.
 * It is based of an existing repo that has a bug and is not being maintained:
 * - https://gist.github.com/jeremiahlee/1748966
 *
 * Properties:
 *   - filename: {string} the filepath to the markdown file
 *   - nested: {string} nested flag which moves h1's to h2s etc (optional)
 */
class ReactMdComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      md: ''
    };

    this.parser = new Parser();
    this.mdRenderer();
  }

  // TODO: move to action etc
  componentWillMount() {
    if (this.props.markdown !== void 0) {
      this.setState({
        md: this.props.markdown
      });
    }

    if (this.props.markdown === '' && this.props.fileName !== void 0) {
      this.fetchFile(this.props.fileName).then(res => {
        this.setState({
          md: res
        });
      });
    }
  }

  // setup the renderer
  mdRenderer() {
    this.renderer = new marked.Renderer();
    this.renderer.heading = (text, level) => {
      let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      return `<h${ level } id="${ escapedText }">
        <a name="${ escapedText }" class="anchor" href="#${ escapedText }">
          <span class="header-link"></span>
        </a>
        ${ text }
      </h${ level }>`;
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

  formattedMd() {
    if (this.props.nested) {
      return this.parser.parse(marked(this.state.md.replace('# ', '## '), { renderer: this.renderer }));
    } else {
      return this.parser.parse(marked(this.state.md, { renderer: this.renderer }));
    }
  }

  render() {
    return (
      <div className="react-md">{ this.formattedMd() }</div>
    );
  }
}

ReactMdComponent.propTypes = {
  markdown: PropTypes.string,
  fileName: PropTypes.string,
  nested: PropTypes.bool
};

ReactMdComponent.defaultProps = {
  markdown: '',
  fileName: '',
  nested: false
};

export default ReactMdComponent;
