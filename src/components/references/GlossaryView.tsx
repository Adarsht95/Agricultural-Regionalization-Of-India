import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck } from 'lucide-react';
import { GlossaryItem } from '../../types';

interface GlossaryViewProps {
  glossary: GlossaryItem[];
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ glossary }) => {
  const [search, setSearch] = useState('');

  const filtered = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase()) ||
      g.source.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <h3 className="text-xl font-bold font-serif-academic text-stone-900">
            Searchable Academic Glossary
          </h3>
          <p className="text-xs text-stone-500">
            Formal geographic, pedological, and agrometeorological definitions used throughout this atlas
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search glossary terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono text-emerald-950 uppercase tracking-wide">
                {item.term}
              </h4>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                {item.source}
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {item.definition}
            </p>
          </div>
        ))}
      </div>

      <div className="text-[11px] font-mono text-stone-400 text-center pt-2">
        Showing {filtered.length} of {glossary.length} verified terms
      </div>
    </div>
  );
};
