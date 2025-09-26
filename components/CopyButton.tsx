import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './icons/Icons';

interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 hover:text-white transition-all"
            aria-label="Copy to clipboard"
        >
            {copied ? <CheckIcon /> : <ClipboardIcon />}
        </button>
    );
};

export default CopyButton;
