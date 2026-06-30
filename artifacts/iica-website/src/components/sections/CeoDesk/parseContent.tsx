import React from 'react';

type ParsedBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'paragraph'; children: InlineToken[] }
  | { type: 'blockquote'; children: InlineToken[] }
  | { type: 'hr' };

type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'em'; value: string }
  | { type: 'pink'; value: string }
  | { type: 'link'; value: string; href: string };

function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let i = 0;

  while (i < text.length) {
    if (text.startsWith('{{pink:', i)) {
      const end = text.indexOf('}}', i + 7);
      if (end !== -1) {
        tokens.push({ type: 'pink', value: text.slice(i + 7, end).trim() });
        i = end + 2;
        continue;
      }
    }

    if (text[i] === '[') {
      const closeBracket = text.indexOf('](', i);
      const closeParen = closeBracket !== -1 ? text.indexOf(')', closeBracket + 2) : -1;
      if (closeBracket !== -1 && closeParen !== -1) {
        tokens.push({ type: 'link', value: text.slice(i + 1, closeBracket), href: text.slice(closeBracket + 2, closeParen) });
        i = closeParen + 1;
        continue;
      }
    }

    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        tokens.push({ type: 'strong', value: text.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }

    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1);
      if (end !== -1) {
        tokens.push({ type: 'em', value: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    let j = i;
    while (j < text.length && text[j] !== '*' && !text.startsWith('{{pink:', j) && text[j] !== '[') {
      j++;
    }
    if (j > i) {
      tokens.push({ type: 'text', value: text.slice(i, j) });
      i = j;
    } else {
      tokens.push({ type: 'text', value: text[i] });
      i++;
    }
  }

  return tokens;
}

export function parseContent(raw: string): ParsedBlock[] {
  if (!raw) return [];
  const lines = raw.split('\n');
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (/^##\s/.test(line)) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '').trim() });
      i++;
      continue;
    }

    if (/^###\s/.test(line)) {
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '').trim() });
      i++;
      continue;
    }

    if (line.trim() === '---') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    if (/^>\s/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', children: parseInline(quoteLines.join(' ')) });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,3})\s/.test(lines[i]) &&
      lines[i].trim() !== '---' &&
      !/^>\s/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    const paraText = paraLines.join(' ').trim();
    if (paraText) {
      blocks.push({ type: 'paragraph', children: parseInline(paraText) });
    }
  }

  return blocks;
}

interface RenderContentProps {
  blocks: ParsedBlock[];
  theme: 'light' | 'dark';
}

export function RenderContent({ blocks, theme }: RenderContentProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={idx} className={`font-serif text-2xl font-bold mt-8 mb-3 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={idx} className={`font-serif text-xl font-semibold mt-6 mb-2 ${theme === 'light' ? 'text-foreground' : 'text-white'}`}>
                {block.text}
              </h3>
            );
          case 'paragraph':
            return (
              <p key={idx} className={`leading-relaxed text-[1rem] ${theme === 'light' ? 'text-muted-foreground' : 'text-gray-300'}`}>
                {block.children.map((tok, ti) => renderInline(tok, ti))}
              </p>
            );
          case 'blockquote':
            return (
              <blockquote key={idx} className="my-8 border-l-2 border-[#833AB4] pl-6 py-2">
                <p className={`leading-relaxed italic ${theme === 'light' ? 'text-foreground' : 'text-gray-200'}`}>
                  {block.children.map((tok, ti) => renderInline(tok, ti))}
                </p>
              </blockquote>
            );
          case 'hr':
            return <hr key={idx} className={`my-6 ${theme === 'light' ? 'border-border' : 'border-white/10'}`} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function renderInline(tok: InlineToken, key: number): React.ReactNode {
  switch (tok.type) {
    case 'text':
      return <React.Fragment key={key}>{tok.value}</React.Fragment>;
    case 'strong':
      return <strong key={key} className="text-foreground dark:text-white font-semibold">{tok.value}</strong>;
    case 'em':
      return <em key={key}>{tok.value}</em>;
    case 'pink':
      return <span key={key} className="bg-gradient-to-r from-[#C13584] to-[#833AB4] bg-clip-text text-transparent font-semibold">{tok.value}</span>;
    case 'link':
      return <a key={key} href={tok.href} target="_blank" rel="noopener noreferrer" className="text-[#C13584] hover:underline">{tok.value}</a>;
    default:
      return null;
  }
}
