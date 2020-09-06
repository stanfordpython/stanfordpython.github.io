// Acknowledgement: Fergus Farrell for CodeBlock.js

import React, { FunctionComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeProps {
  language?: string,
  value: JSX.Element
}

const CodeBlock: FunctionComponent<CodeProps> = 
  ({ language, value }: CodeProps) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock;