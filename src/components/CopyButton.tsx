import React, { useState } from 'react';

export const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        setStatus('copied');
      } else {
        throw new Error('Clipboard not supported');
      }
    } catch (err) {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="bg-white/20 hover:bg-white/30 active:scale-95 transition-all px-4 py-2 rounded-xl text-sm font-semibold flex items-center shadow-sm"
    >
      <span>{status === 'copied' ? 'Köçürüldü!' : status === 'error' ? 'Xəta baş verdi' : 'Kopyala'}</span>
    </button>
  );
};
