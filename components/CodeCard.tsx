
import React from 'react';
import { PERSONAL_DATA } from '../constants';

type Kind = 'kw' | 'type' | 'str' | 'method' | 'plain';
type Token = [Kind, string];
interface Line { indent: number; tokens: Token[] }

// Syntax colors come from CSS variables, so the card follows the light/dark theme.
const KIND_CLASS: Record<Kind, string> = {
  kw: 'text-code-kw',
  type: 'text-code-type',
  str: 'text-code-str',
  method: 'text-code-method',
  plain: 'text-ink',
};

const LINES: Line[] = [
  { indent: 0, tokens: [['kw', 'final class '], ['type', 'Engineer'], ['plain', ' {']] },
  { indent: 1, tokens: [['kw', 'private static final '], ['plain', 'String NAME = '], ['str', `"${PERSONAL_DATA.name}"`], ['plain', ';']] },
  { indent: 1, tokens: [['kw', 'private '], ['plain', 'var expertise = '], ['type', 'StackProfile']] },
  { indent: 2, tokens: [['plain', '.builder()']] },
  { indent: 2, tokens: [['plain', '.frameworks('], ['str', '"Spring", "Hibernate"'], ['plain', ')']] },
  { indent: 2, tokens: [['plain', '.datastores('], ['str', '"PostgreSQL", "Redis", "Vertica"'], ['plain', ')']] },
  { indent: 2, tokens: [['plain', '.security('], ['str', '"Spring Security"'], ['plain', ')']] },
  { indent: 2, tokens: [['plain', '.build();']] },
  { indent: 1, tokens: [['kw', 'public '], ['type', 'SystemState '], ['method', 'architectSystems'], ['plain', '() {']] },
  { indent: 2, tokens: [['kw', 'return '], ['type', 'Architect'], ['plain', '.design('], ['type', 'ScalableSystems'], ['plain', '.vNext())']] },
  { indent: 3, tokens: [['plain', '.deploy();']] },
  { indent: 1, tokens: [['plain', '}']] },
  { indent: 0, tokens: [['plain', '}']] },
];

// Zero-width spaces after "." and "(" give long call chains somewhere to wrap on narrow screens.
const withBreaks = (text: string) => text.replace(/([.(])/g, '$1​');

interface CodeCardProps {
  elapsed: string;
}

const CodeCard: React.FC<CodeCardProps> = ({ elapsed }) => (
  <figure
    className="relative m-0 bg-paper-2 border border-rule p-4 sm:p-6"
    aria-label="Profile summary written as a Java class"
  >
    <figcaption className="absolute top-3 right-4 font-mono text-[10px] tracking-widest text-muted">Java 21</figcaption>

    <code className="block pt-5 overflow-x-auto font-mono text-[11px] sm:text-[12px] leading-relaxed space-y-2.5">
      {LINES.map((line, i) => (
        <div key={i} className="flex gap-3 sm:gap-4">
          <span aria-hidden="true" className="w-5 shrink-0 text-right text-muted tabular-nums select-none">
            {String(i + 1).padStart(2, '0')}
          </span>
          {/* Long lines wrap on narrow screens; the hanging indent keeps continuations readable. */}
          <span className="min-w-0 whitespace-pre-wrap" style={{ paddingLeft: `${line.indent * 2 + 2}ch`, textIndent: '-2ch' }}>
            {line.tokens.map(([kind, text], j) => (
              <span key={j} className={KIND_CLASS[kind]}>{withBreaks(text)}</span>
            ))}
          </span>
        </div>
      ))}
    </code>

    <div className="mt-7 pt-5 border-t border-rule flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Building solutions since</div>
      <div className="text-sm font-semibold text-ink tabular-nums">{elapsed}</div>
    </div>
  </figure>
);

export default CodeCard;
