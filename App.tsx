import React, { useState, useMemo } from 'react';
import { FeatureTab } from './types';
import TabButton from './components/TabButton';
import TitleGenerator from './components/TitleGenerator';
import PollManager from './components/PollManager';
import GameSuggester from './components/GameSuggester';
import SocialPostCrafter from './components/SocialPostCrafter';
import { SparklesIcon, QuestionMarkCircleIcon, GamepadIcon, AtSymbolIcon, XboxLogoIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>(FeatureTab.Title);
  const [isStreamerMode, setIsStreamerMode] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case FeatureTab.Title:
        return <TitleGenerator isStreamerMode={isStreamerMode} />;
      case FeatureTab.Poll:
        return <PollManager isStreamerMode={isStreamerMode} />;
      case FeatureTab.Suggest:
        return <GameSuggester isStreamerMode={isStreamerMode} />;
      case FeatureTab.Social:
        return <SocialPostCrafter isStreamerMode={isStreamerMode} />;
      default:
        return <TitleGenerator isStreamerMode={isStreamerMode} />;
    }
  };

  const tabs = useMemo(() => [
    { id: FeatureTab.Title, label: 'Title Generator', icon: <SparklesIcon /> },
    { id: FeatureTab.Poll, label: 'Poll & Q&A Ideas', icon: <QuestionMarkCircleIcon /> },
    { id: FeatureTab.Suggest, label: 'Game Suggester', icon: <GamepadIcon /> },
    { id: FeatureTab.Social, label: 'Social Post Crafter', icon: <AtSymbolIcon /> },
  ], []);

  return (
    <div className="bg-slate-900 min-h-screen text-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <XboxLogoIcon />
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Xbox Stream Enhancer
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            AI-powered tools to level up your stream content.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-3">
            <span className={`font-medium transition-colors ${!isStreamerMode ? 'text-white' : 'text-gray-500'}`}>
                Manual
            </span>
            <button
                type="button"
                onClick={() => setIsStreamerMode(!isStreamerMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    isStreamerMode ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={isStreamerMode}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isStreamerMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
            <span className={`font-medium transition-colors ${isStreamerMode ? 'text-emerald-400' : 'text-gray-500'}`}>
                Streamer Mode
            </span>
          </div>
        </header>

        <nav className="mb-8 p-1.5 bg-slate-800 rounded-lg flex items-center justify-center space-x-2">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              isActive={activeTab === tab.id}
              icon={tab.icon}
            >
              {tab.label}
            </TabButton>
          ))}
        </nav>

        <main>
          {renderContent()}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini AI. Built for streamers, by streamers.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
