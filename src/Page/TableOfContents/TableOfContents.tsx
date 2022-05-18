import { NestedHeader } from "../PageParsers";
import './TableOfContents.css';

interface TOCProps {
  headers: NestedHeader[];
  scrollToHeader: (slug: string) => void;
}

const TableOfContents = ({ headers, scrollToHeader }: TOCProps) => {
  if (headers.length === 0) return null;

  return (
    <ul>
      {headers.map(h => (
        <li key={h.slug}>
          <button onClick={() => scrollToHeader(h.slug)}>{h.title}</button>
          <TableOfContents headers={h.children} scrollToHeader={scrollToHeader} />
        </li>
      ))}
    </ul>
  );
}

export default TableOfContents;