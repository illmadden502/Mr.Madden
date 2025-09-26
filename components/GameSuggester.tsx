import React, { useState, useCallback, useEffect } from 'react';
import { suggestGames } from '../services/geminiService';
import { GeneratedGames } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { GamepadIcon } from './icons/Icons';

interface GameSuggesterProps {
    isStreamerMode: boolean;
}

const GameSuggester: React.FC<GameSuggesterProps> = ({ isStreamerMode }) => {
    const [genres, setGenres] = useState('');
    const [playedGames, setPlayedGames] = useState('');
    const [result, setResult] = useState<GeneratedGames | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isStreamerMode) {
            setGenres('Trending on Twitch');
            setPlayedGames('Popular multiplayer games');
        } else {
            setGenres('');
            setPlayedGames('');
        }
        setResult(null);
        setError(null);
    }, [isStreamerMode]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!genres && !playedGames) {
            setError('Please enter at least one genre or previously played game.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await suggestGames(genres, playedGames);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [genres, playedGames]);

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="genres" className="block text-sm font-medium text-gray-300">Favorite Genres</label>
                        <input
                            type="text"
                            id="genres"
                            value={genres}
                            onChange={(e) => setGenres(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., RPG, FPS, Open World"
                        />
                    </div>
                    <div>
                        <label htmlFor="played-games" className="block text-sm font-medium text-gray-300">Games you've enjoyed streaming</label>
                        <input
                            type="text"
                            id="played-games"
                            value={playedGames}
                            onChange={(e) => setPlayedGames(e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            placeholder="e.g., Cyberpunk 2077, Forza Horizon 5"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-800 disabled:bg-emerald-800 disabled:cursor-not-allowed"
                    >
                        {loading ? <LoadingSpinner /> : <GamepadIcon />}
                        <span className="ml-2">{loading ? 'Searching...' : 'Suggest Games'}</span>
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}

            {result && (
                <div className="mt-6 space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Here are some ideas for your next stream:</h3>
                    {result.games.map((game, index) => (
                        <div key={index} className="bg-slate-700 p-4 rounded-md">
                            <p className="font-semibold text-white text-lg">{game.name}</p>
                            <p className="text-gray-300 mt-1">{game.reason}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GameSuggester;
