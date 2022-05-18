import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContent from "./PageContent";

const Page = () => {
  const [pageData, setPageData] = useState('');
  const pid = useParams()['*'];

  useEffect(() => {
    fetch(`/page/${pid}.md`)
      .then(res => res.text())
      .then(setPageData)
  }, [pid]);

  return <PageContent content={pageData} />
}

export default Page;