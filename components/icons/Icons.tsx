import React from 'react';

export const SparklesIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM4.03 4.03a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L4.03 5.09a.75.75 0 010-1.06zM13.85 13.85a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm13.25.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM4.03 15.97a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.09 15.97a.75.75 0 01-1.06 0zM14.91 4.03a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

export const GamepadIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.993 11.007a.75.75 0 01-1.06 1.06l-1.44-1.44a.75.75 0 011.06-1.06l1.44 1.44z" />
        <path d="M15.44 9.56a.75.75 0 00-1.06-1.06l-1.44 1.44a.75.75 0 001.06 1.06l1.44-1.44z" />
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 10a.75.75 0 00.75.75h1.5a.75.75 0 000-1.5H6.25a.75.75 0 00-.75.75zM8 8.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
    </svg>
);

export const AtSymbolIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2C5.03 2 1 6.03 1 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-4a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    <path d="M10.75 11.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    <path fillRule="evenodd" d="M10 6.5A4.5 4.5 0 1010 15a4.5 4.5 0 000-8.5zm0 1.5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
  </svg>
);

export const ClipboardIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const CheckIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5 text-emerald-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const XboxLogoIcon: React.FC<{className?: string}> = ({ className = "w-12 h-12 text-emerald-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zm5.29-6.91a.75.75 0 00-1.06-.02l-2.47 2.22-2.47-2.22a.75.75 0 10-1.04 1.08l2.22 2.47-2.22 2.47a.75.75 0 101.04 1.08l2.47-2.22 2.47 2.22a.75.75 0 001.08-1.04l-2.22-2.47 2.22-2.47a.75.75 0 00-.02-1.06z" clipRule="evenodd" />
  </svg>
);
