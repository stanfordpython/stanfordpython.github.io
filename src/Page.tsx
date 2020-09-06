import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import NoMatch from './NoMatch';
import CodeBlock from './CodeBlock';

import { RouteComponentProps } from 'react-router-dom';
import toc from 'markdown-toc-unlazy';
import uslug from 'uslug';


const safeFetch: (url: string, options?: RequestInit) => Promise <string>
    = (url, options) => {
    if (options == null) {
      options = {}
    }

    if (options.credentials == null) options.credentials = 'same-origin'
    
    return fetch(url, options).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();

        } else {
            var error = new Error(
                response.statusText || response.status.toString()
            );

            return Promise.reject(error);
        }
    }).catch(err => {
        return Promise.reject(err);
    });
}

function flatten(text: string, child: string | JSX.Element): string {
  // @ts-ignore
  return typeof child === 'string'
      ? text + child
      // @ts-ignore
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
const Header = 
    ({ children, level, scrollTo }: 
     { children: JSX.Element, level: number, scrollTo: string }) => {
    const DOMChildren = React.Children.toArray(children);
    
    // @ts-ignore
    const text: string = DOMChildren.reduce(flatten, '');
    const slug = uslug(text);

    const scrollRef = React.useRef(null);
    React.useEffect(() => {
        if ((scrollTo === slug) && (scrollRef.current)) {
            const ref = scrollRef.current! as HTMLElement;
            ref.scrollIntoView();
        }
    }, [scrollTo, slug]);

    return React.createElement('h' + level, 
                               {id: slug, ref: scrollRef}, 
                               children)
}

export type PageProps = RouteComponentProps<{ slug: string }>;
export interface PageState {
    md: string | 404,
    scrollTo: string | null,
    failed?: boolean,
    [x: string]: any
}

export class Page extends Component<PageProps, PageState> {
    // Constructor
    constructor(props: PageProps) {
        super(props);
        this.state = {
            md: '',
            scrollTo: null
        };

        this.customSlug = this.customSlug.bind(this);
    }

    fetchFile(path: string) {
        return safeFetch(path);
    }

    fetchMarkdown(slug: string) {
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

    customSlug(s: string) {
        /* Create a slug for s that prepends the current path */
        const currLocation: string = this.props.location.pathname;
        return currLocation + '#' + uslug(s)
    }

    componentDidMount() {
        this.fetchMarkdown(this.props.match.params.slug);
    }

    componentDidUpdate(prevProps: PageProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.fetchMarkdown(this.props.match.params.slug);
        }

        // Find the hash of the targeted element and scroll into view.
        const currHash: string = this.props.location.hash;
        const elemID: string = currHash.slice(1);
        if (currHash && (this.state.scrollTo !== elemID)) {
            this.setState({ scrollTo: elemID })
        }

        // Clear the hash if there isn't one anymore
        if (!currHash && this.state.scrollTo) {
            this.setState({ scrollTo: null });
        }
    }

    render(): JSX.Element | null {
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
                        source={toc(this.state.md, { slugify: this.customSlug }).content}
                    />
                    <ReactMarkdown
                        source={this.state.md}
                        renderers={{
                            code: CodeBlock,
                            heading: (props) => Header({
                                scrollTo: this.state.scrollTo,
                                ...props
                            })
                        }} />
                </div>
            </div>

        );
    }
}