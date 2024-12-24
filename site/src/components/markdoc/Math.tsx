import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  math: string;
  block?: boolean;
}

export function MathComponent({ math, block = false }: MathProps) {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
    trust: true,
    strict: false,
    output: 'html',
  });

  return (
    <span
      className={block ? 'block my-4 text-center' : 'inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Usage in Markdoc:
// {% math %}E = mc^2{% /math %}
// {% math block=true %}
//   \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
// {% /math %} 