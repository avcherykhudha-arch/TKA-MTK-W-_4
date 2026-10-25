import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Parses a string containing LaTeX markers ($...$ or $$...$$) and renders with KaTeX
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', inline = false }) => {
  if (!content) return null;

  // Split content by $$display$$ and $inline$
  // Tokenize regex
  const parts: { type: 'text' | 'inline_math' | 'display_math'; value: string }[] = [];
  let remaining = content;

  // Pattern matches $$...$$ or $...$
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/;

  while (remaining.length > 0) {
    const match = remaining.match(regex);
    if (!match || match.index === undefined) {
      parts.push({ type: 'text', value: remaining });
      break;
    }

    if (match.index > 0) {
      parts.push({ type: 'text', value: remaining.substring(0, match.index) });
    }

    const token = match[0];
    if (token.startsWith('$$') && token.endsWith('$$')) {
      parts.push({ type: 'display_math', value: token.slice(2, -2) });
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push({ type: 'inline_math', value: token.slice(1, -1) });
    }

    remaining = remaining.substring(match.index + token.length);
  }

  return (
    <span className={`${className} leading-relaxed`}>
      {parts.map((part, idx) => {
        if (part.type === 'text') {
          return <React.Fragment key={idx}>{part.value}</React.Fragment>;
        }

        try {
          const html = katex.renderToString(part.value, {
            displayMode: part.type === 'display_math' && !inline,
            throwOnError: false,
            strict: false
          });

          return (
            <span
              key={idx}
              className={part.type === 'display_math' ? 'my-2 block text-center overflow-x-auto py-1' : 'inline-block px-0.5'}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <span key={idx} className="font-mono text-red-600 bg-red-50 px-1 rounded">
              {part.value}
            </span>
          );
        }
      })}
    </span>
  );
};
