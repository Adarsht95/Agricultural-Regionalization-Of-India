import React from 'react';

interface SourceBadgeProps {
  source: 'SUPPLIED GIS DATA' | 'SUPPLIED PDF' | 'OFFICIAL SOURCE' | 'PEER-REVIEWED SOURCE' | 'DERIVED FROM GIS' | string;
  onClick?: () => void;
  className?: string;
  subtext?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, onClick, className = '', subtext }) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'SUPPLIED GIS DATA':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200';
      case 'SUPPLIED PDF':
        return 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200';
      case 'OFFICIAL SOURCE':
        return 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200';
      case 'DERIVED FROM GIS':
        return 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200';
      case 'PEER-REVIEWED SOURCE':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300 hover:bg-indigo-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200';
    }
  };

  return (
    <span
      onClick={onClick}
      title={subtext || `Provenance: ${source}`}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide border cursor-pointer transition-colors shadow-xs ${getBadgeStyle(
        source
      )} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      [{source}]
    </span>
  );
};
