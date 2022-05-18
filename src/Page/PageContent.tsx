import { createRef, RefObject, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rmkSlug from 'remark-slug';
import rmkGFM from 'remark-gfm';

import './Page.css';

import { NestedHeader, parseHeadersFromPage } from "./PageParsers";
import TableOfContents from "./TableOfContents";
import CodeBlock from "./CodeBlock";

interface HeaderRefs {
  [slug: string]: RefObject<HTMLHeadingElement>
}

interface PageContentProps {
  content: string;
  toc?: boolean;
}

const PageContent = ({ content, toc = true }: PageContentProps) => {
  const [headerRefs, setHeaderRefs] = useState<HeaderRefs>({});
  const [nestedHeaders, setNestedHeaders] = useState<NestedHeader[]>([]);

  useEffect(() => {
    const allHeaders = parseHeadersFromPage(content);
    const headers = allHeaders.filter(h => h.level <= 2);

    let newHeaderRefs = {} as HeaderRefs;
    let headersNested: NestedHeader[] = [];
    for (const h of headers) {
      // Parse header nesting
      if (h.level === 1) {
        headersNested.push({ ...h, children: [] });
      }
      else if (h.level === 2) {
        const parent = headersNested[headersNested.length - 1];
        parent.children.push({ ...h, children: [] });
      }

      // Create refs for headers
      newHeaderRefs[h.slug] = createRef<HTMLHeadingElement>();
    }

    setHeaderRefs(newHeaderRefs);
    setNestedHeaders(headersNested);
  }, [setHeaderRefs, setNestedHeaders, content]);

  const scrollToHeader = (slug: string) => {
    const ref = headerRefs[slug];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {toc && <div className="table-of-contents"><TableOfContents headers={nestedHeaders} scrollToHeader={scrollToHeader} /></div>}
      <div className={`page-body markdown-body ${ (!toc) && "w-11/12 md:w-4/5 mx-auto" }`}>
        <ReactMarkdown
          children={content}
          remarkPlugins={[rmkSlug, rmkGFM]}
          components={{
            h1: (props) => <h1 ref={headerRefs[props.id as string]} {...props}>{props.children}</h1>,
            h2: (props) => <h2 ref={headerRefs[props.id as string]} {...props}>{props.children}</h2>,
            a: (props) => <a target="_blank" rel="noopener noreferrer" {...props}>{props.children}</a>,
            code: (props) => {
              const defaultBehavior = () => {
                // don't pass the inline prop, but everything else
                let newProps = {...props};
                delete newProps.inline;
                return <code {...newProps}>{newProps.children}</code>;
              }

              if (props.inline || !props.className) return defaultBehavior();

              const lang = props.className.split(':');
              if (lang[0] === 'language-python') {
                return (<div className="w-full h-full relative">
                  <CodeBlock 
                    runnable={lang.length >= 1 && (lang[1] === 'run' || lang[1] === 'runnable')} 
                    {...props}
                  />
                </div>);
              }

              return defaultBehavior();
            }
          }}
        />
      </div>
    </>
  );
}

export default PageContent;