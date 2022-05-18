import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";

interface CodeBlockProps extends CodeProps {
  runnable: boolean;
}


const CodeBlock = (props: CodeBlockProps) => {
  const editorRef = useRef<any>(null);
  const [ht, setHt] = useState(0);
  const [response, setResponse] = useState('');

  const executeCode = async () => {
    // @ts-ignore
    const pyodide = window.pyodide as any;
    if (!editorRef.current || !pyodide) return;

    let resp: string;
    try {
      // @ts-ignore
      window.py_outputs = [];
      
      const code = editorRef.current.getValue();
      pyodide.runPython(code);
      
      // @ts-ignore
      resp = window.py_outputs.join('\n');
    } catch (e: any) {
      resp = e.toString();
    }

    setResponse(resp);
  }

  return (
    <>
      <Editor
        height={`${ht}px`}
        defaultLanguage="python"
        defaultValue={props.children[0] ? props.children[0] as string : ''}
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
          fontSize: 14,
          scrollBeyondLastLine: false,
          readOnly: !props.runnable
        }}
        onMount={(editor, _) => {
          editorRef.current = editor;
          setHt(editor.getModel().getLineCount() * 21);
        }}
      />
      {
        props.runnable && response && (
          <div className="flex w-full mt-2 overflow-x-scroll p-2">
            <code>{response}</code>
          </div>
        )
      }
      { props.runnable && (<button 
        className="rounded bg-indigo-500 absolute top-0 right-0 py-2 px-3 text-gray-100"
        onClick={executeCode}
      >
        <FontAwesomeIcon icon={faPlay} /> Run
      </button>) }
    </>
  )
}

export default CodeBlock;