import React, { useState, useCallback, useEffect } from 'react';
import { generateTitlesAndDescription } from '../services/geminiService';
import { GeneratedTitles } from '../types';
import LoadingSpinner from './LoadingSpinner';
import CopyButton from './CopyButton';
import { SparklesIcon } from './icons/Icons';

interface TitleGeneratorProps {
    isStreamerMode: boolean;
}

const TitleGenerator: React.FC<TitleGeneratorProps> = ({ isStreamerMode }) => {
    const [game, setGame] = useState('');
    const [keywords, setKeywords] = useState('');
    const [result, setResult] = useState<GeneratedTitles | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isStreamerMode) {
            setGame('Variety Stream');
            setKeywords('chill, community games, fun');
        } else {
            setGame('');
            setKeywords('');
        }
        setResult(null);
        setError(null);
    }, [isStreamerMode]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!game) {
            setError('Please enter a game title.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await generateTitlesAndDescription(game, keywords);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [game, keywords]);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="game" className="block text-sm font-medium text-gray-300">Game Title</label>
                        <input
                            type="text"
                            id="game"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., Halo Infinite"
                        />
                    </div>
                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-300">Keywords / Vibe (optional)</label>
                        <input
                            type="text"
                            id="keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., chill, competitive, first playthrough"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-800 disabled:bg-emerald-800 disabled:cursor-not-allowed"
                    >
                        {loading ? <LoadingSpinner /> : <SparklesIcon />}
                        <span className="ml-2">{loading ? 'Generating...' : 'Generate Titles'}</span>
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}

            {result && (
                <div className="mt-6 space-y-4 animate-fade-in">
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">Generated Titles:</h3>
                        <ul className="space-y-2">
                            {result.titles.map((title, index) => (
                                <li key={index} className="relative bg-slate-700 p-3 rounded-md text-gray-200">
                                    {title}
                                    <CopyButton textToCopy={title} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">Generated Description:</h3>
                        <div className="relative bg-slate-700 p-3 rounded-md text-gray-200">
                            <p>{result.description}</p>
                            <CopyButton textToCopy={result.description} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TitleGenerator;
