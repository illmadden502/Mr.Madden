import React, { useState, useCallback, useEffect } from 'react';
import { generatePolls } from '../services/geminiService';
import { GeneratedPolls } from '../types';
import LoadingSpinner from './LoadingSpinner';
import CopyButton from './CopyButton';
import { QuestionMarkCircleIcon } from './icons/Icons';

interface PollManagerProps {
    isStreamerMode: boolean;
}

const PollManager: React.FC<PollManagerProps> = ({ isStreamerMode }) => {
    const [game, setGame] = useState('');
    const [result, setResult] = useState<GeneratedPolls | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isStreamerMode) {
            setGame('Just Chatting');
        } else {
            setGame('');
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
            const response = await generatePolls(game);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [game]);

    const formatPollForCopy = (poll: { question: string; options: string[] }): string => {
        return `${poll.question}\n${poll.options.map(opt => `- ${opt}`).join('\n')}`;
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="game-poll" className="block text-sm font-medium text-gray-300">What game are you playing?</label>
                        <input
                            type="text"
                            id="game-poll"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., Starfield"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-800 disabled:bg-emerald-800 disabled:cursor-not-allowed"
                    >
                        {loading ? <LoadingSpinner /> : <QuestionMarkCircleIcon />}
                        <span className="ml-2">{loading ? 'Generating...' : 'Generate Poll Ideas'}</span>
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}

            {result && (
                <div className="mt-6 space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Generated Polls:</h3>
                    {result.polls.map((poll, index) => (
                        <div key={index} className="relative bg-slate-700 p-4 rounded-md">
                             <CopyButton textToCopy={formatPollForCopy(poll)} />
                            <p className="font-semibold text-white mb-2">{poll.question}</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {poll.options.map((option, optIndex) => (
                                    <li key={optIndex}>{option}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PollManager;
