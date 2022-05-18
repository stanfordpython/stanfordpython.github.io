import BananaSlug from 'github-slugger'

interface Header {
  title: string;
  slug: string;
  level: number;
}

interface NestedHeader extends Header {
  children: NestedHeader[];
}

function parseHeadersFromPage(pageText: string): Header[] {
  const slugs = new BananaSlug();

  const headerMatches = pageText.matchAll(/^(#+) (.*)$/mg);
  let headers = [];
  
  // @ts-ignore
  for (const h of headerMatches) {
    headers.push({ title: h[2] as string, slug: slugs.slug(h[2]), level: h[1].length });
  }

  return headers;
}

/** 
 * I started implementing this function to parse headers beyond two levels of
 * depth but quickly gave up
 * 
 * 
function parseHeadersNested(headers: Header[]): NestedHeader[] {
  let out: NestedHeader[] = [];
  let currLevel = 1;
  let currRef = out;

  for (const h of headers) {
    if (h.level > currLevel) {
      // Need to go deeper
      currRef = currRef[currRef.length - 1];
    } 
    else if (h.level < currLevel) {
      // Need to back up
    }
    else {
      // Push to current location
      currRef.push({ ...h, children: [] });
    }

    currLevel = h.level;
  }

  return out;
}
*/

export { parseHeadersFromPage };
export type { NestedHeader }