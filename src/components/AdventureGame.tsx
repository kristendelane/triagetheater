"use client";

import React, { useState } from 'react';
import gameData from './AdventureGame.json';
import storyData from '../Story-Data/welcome_to_the_er-please_take_a_number.json';

interface Choice {
  text: string;
  nextId: string;
}

interface GameScene {
  id: string;
  text: string[];
  choices?: Choice[];
  resources?: Array<{
    title: string;
    url?: string;
    items?: string[];
  }>;
  navigation?: Array<{
    text: string;
    nextId: string;
  }>;
  isEnding?: boolean;
}

export default function AdventureGame() {
  const [currentSceneId, setCurrentSceneId] = useState('start');
  const currentScene = gameData[currentSceneId as keyof typeof gameData] as GameScene;

  const handleChoice = (nextId: string) => {
    setCurrentSceneId(nextId);
  };

  return (
    <div className="game-container">
      <div className="scene-text">
        {currentScene.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {currentScene.choices && (
        <div className="choices">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.nextId)}
              className="choice-button"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {currentScene.resources && (
        <div className="resources">
          <h3>Resources</h3>
          {currentScene.resources.map((resource, index) => (
            <div key={index} className="resource">
              {resource.url ? (
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              ) : (
                <div>
                  <h4>{resource.title}</h4>
                  {resource.items && (
                    <ul>
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {currentScene.navigation && (
        <div className="navigation">
          {currentScene.navigation.map((nav, index) => (
            <button
              key={index}
              onClick={() => handleChoice(nav.nextId)}
              className="nav-button"
            >
              {nav.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 