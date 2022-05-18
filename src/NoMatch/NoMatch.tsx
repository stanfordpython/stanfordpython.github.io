import { useEffect, useState } from "react";
import PageContent from "../Page/PageContent";

const NoMatch = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('/page/404.md').then(res => res.text()).then(setText)
  }, []);
  return <PageContent content={text} toc={false} />;
}

export default NoMatch;