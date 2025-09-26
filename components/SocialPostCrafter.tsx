import React, { useState, useCallback, useEffect } from 'react';
import { craftSocialPost } from '../services/geminiService';
import { GeneratedPost } from '../types';
import LoadingSpinner from './LoadingSpinner';
import CopyButton from './CopyButton';
import { AtSymbolIcon } from './icons/Icons';

interface SocialPostCrafterProps {
    isStreamerMode: boolean;
}

const SocialPostCrafter: React.FC<SocialPostCrafterProps> = ({ isStreamerMode }) => {
    const [game, setGame] = useState('');
    const [highlights, setHighlights] = useState('');
    const [result, setResult] = useState<GeneratedPost | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isStreamerMode) {
            setGame('Variety Stream');
            setHighlights('Going live! Come hang out and chat!');
        } else {
            setGame('');
            setHighlights('');
        }
        setResult(null);
        setError(null);
    }, [isStreamerMode]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!game || !highlights) {
            setError('Please enter a game and some highlights.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await craftSocialPost(game, highlights);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [game, highlights]);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="game-social" className="block text-sm font-medium text-gray-300">Game</label>
                        <input
                            type="text"
                            id="game-social"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., Call of Duty"
                        />
                    </div>
                    <div>
                        <label htmlFor="highlights" className="block text-sm font-medium text-gray-300">Stream Highlights / "Going Live" message</label>
                        <textarea
                            id="highlights"
                            value={highlights}
                            onChange={(e) => setHighlights(e.target.value)}
                            rows={3}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., Just hit a crazy snipe! / Going live now with some ranked matches!"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-800 disabled:bg-emerald-800 disabled:cursor-not-allowed"
                    >
                        {loading ? <LoadingSpinner /> : <AtSymbolIcon />}
                        <span className="ml-2">{loading ? 'Crafting...' : 'Craft Social Post'}</span>
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}

            {result && (
                <div className="mt-6 animate-fade-in relative bg-slate-700 p-4 rounded-md">
                     <CopyButton textToCopy={`${result.post}\n\n${result.hashtags}`} />
                    <p className="whitespace-pre-wrap text-white">{result.post}</p>
                    <p className="mt-4 text-emerald-400 font-mono text-sm">{result.hashtags}</p>
                </div>
            )}
        </div>
    );
};

export default SocialPostCrafter;
