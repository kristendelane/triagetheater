"use client";

import { useState, useEffect } from 'react';
import storyData from './AdventureGame.json';

export default function AdventureGame() {
  const [currentSceneId, setCurrentSceneId] = useState('start');
  const [isClient, setIsClient] = useState(false);
  const [questId, setQuestId] = useState(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if there's a quest ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('quest');
    
    if (id) {
      setQuestId(id);
      // You could fetch quest data here if needed
      fetch(`/api/quest?id=${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Quest data:', data);
          // Handle quest data as needed
        })
        .catch(error => {
          console.error('Error fetching quest:', error);
        });
    }
  }, []);

  const currentScene = storyData[currentSceneId];

  const handleChoice = (nextId) => {
    if (storyData[nextId]) {
      setCurrentSceneId(nextId);
    } else {
      console.error(`Error: Scene with id "${nextId}" not found!`);
      setCurrentSceneId('start');
    }
  };

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  if (!currentScene) {
    if (storyData['start']) {
      setCurrentSceneId('start');
      return <div className="text-yellow-500 font-bold">Scene error, resetting...</div>;
    }
    return <div className="text-red-500 font-bold">Error: Critical error loading story!</div>;
  }

  const renderText = (textData) => {
    if (Array.isArray(textData)) {
      return textData.map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ));
    }
    return <p className="mb-4">{textData}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Hellcare</h1>
      <h2 className="text-xl font-medium mb-6 text-gray-600 border-b pb-2">
        Story 1: Welcome to the ER: Please Take a Number
        {questId && <span className="text-sm text-gray-500 ml-2">(Quest ID: {questId})</span>}
      </h2>
      <div className="text-gray-800 text-lg leading-relaxed mb-8">
        {renderText(currentScene.text)}
      </div>

      {currentScene.tiktokEmbed && (
        <div className="my-4 p-4 bg-gray-100 rounded border border-gray-300 text-center">
          <p className="font-semibold mb-2">[TikTok Moment Recorded]</p>
          <p className="text-sm italic text-gray-600">{currentScene.tiktokEmbed}</p>
        </div>
      )}

      {currentScene.choices && currentScene.choices.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4 text-gray-600">What do you do?</h3>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            {currentScene.choices.map((choice) => (
              <button
                key={choice.nextId}
                onClick={() => handleChoice(choice.nextId)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentScene.resources && currentScene.resources.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4 text-gray-600">Resources</h3>
          <div className="space-y-4">
            {currentScene.resources.map((resource, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                {resource.url ? (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                    {resource.title}
                  </a>
                ) : (
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                )}
                {resource.items && (
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentScene.navigation && currentScene.navigation.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4 text-gray-600">Navigation</h3>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            {currentScene.navigation.map((nav) => (
              <button
                key={nav.nextId}
                onClick={() => handleChoice(nav.nextId)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-center"
              >
                {nav.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentScene.isEnding && (
        <div className="mt-8 text-center text-gray-500 italic">
          You made it home, but the ordeal isn't truly over. The fight continues.<br/>(Refresh page to start again)
        </div>
      )}
    </div>
  );
} 