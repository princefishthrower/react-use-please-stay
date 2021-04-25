import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from "prism-react-renderer/themes/dracula";

export interface ICodeHighlighterProps {
  language: Language;
  code: string;
}

export function CodeHighlighter(props: ICodeHighlighterProps) {
  const { code, language } = props;
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{...style, padding: '1rem'}}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
