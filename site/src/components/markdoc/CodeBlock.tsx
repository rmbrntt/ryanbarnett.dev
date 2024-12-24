import React, { useState } from 'react';
import clsx from 'clsx';

interface CodeBlockProps {
  code?: string;
  children?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  children,
  language,
  filename,
  showLineNumbers = true,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const content = (code || children || '').toString();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = content.trim().split('\n');

  return (
    <div className="group relative my-6 rounded-lg bg-gray-900 dark:bg-gray-950">
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-700 bg-gray-800/50 px-4 py-2 text-sm text-gray-200">
          <span>{filename}</span>
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>
      )}
      <div className="relative overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 z-10 rounded bg-gray-800 px-2 py-1 text-sm text-gray-300 opacity-0 transition hover:bg-gray-700 group-hover:opacity-100"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className={clsx(
          'overflow-x-auto p-4 text-sm leading-6',
          showLineNumbers && 'pl-12'
        )}>
          <code className={language ? `language-${language}` : undefined}>
            {lines.map((line, i) => (
              <div
                key={i}
                className={clsx(
                  'relative',
                  highlightLines.includes(i + 1) && 'bg-blue-500/10'
                )}
              >
                {showLineNumbers && (
                  <span className="absolute left-0 -translate-x-8 text-gray-500">
                    {i + 1}
                  </span>
                )}
                {line || '\u00A0'}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}