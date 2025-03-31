// A fixed version without duplicated scenes
import { useState } from 'react';

interface Choice {
  text: string;
  nextId: string;
}

interface GameScene {
  id: string;
  text: string | string[];
  choices?: Choice[];
  tiktokEmbed?: string;
  isEnding?: boolean;
}

// The main story data structure
const storyData: Record<string, GameScene> = {
  start: {
    id: 'start',
    text: [
      "You wake up feeling like a team of ninjas has been stabbing you in the belly all night, a pain you know too well from your last visit to the ER — the cold, sterile room, the fluorescent lights, the constant beeping, a soul-crushing reminder that no one seems to believe you're actually suffering.",
      "The pain becomes unbearable. You can't walk. You're doubled over, gasping, sweat pouring down your face. You plead with your partner to call 911.",
      "When the paramedics arrive, your partner has to spend twenty minutes convincing them that you're not nine months pregnant and in labor. The bloating is so extreme you look like you've swallowed a basketball. Your skin is stretched tight.",
      "They try and fail to find a vein. You tell them it's always like this, that you need ultrasound guidance, but they insist. Eventually, they give up and jab you with an intramuscular injection of anti-nausea medication that you know from experience won't help at all.",
      "They load you into the ambulance."
    ],
    choices: [
      { text: 'Continue to the ER in the ambulance.', nextId: 'er_arrival_expanded' },
      { text: 'Escape the ambulance and go back home.', nextId: 'escape_ambulance' },
    ],
  },
  
  // And all other scenes...

  // Your fixed befriend_neighbor and charge_nurse scenes
  befriend_neighbor: {
    id: 'befriend_neighbor',
    text: [
      "You turn to the elderly woman sitting next to you. She's been waiting even longer than you have, clutching a plastic bag of medications.",
      "'Been here long?' you ask, your voice hoarse from disuse.",
      "She looks surprised that someone is speaking to her, then smiles wearily. 'Since 6 this morning. My heart's acting up again.'",
      "For the next hour, you and Gladys (as you learn is her name) swap hospital horror stories. She tells you about the time she was sent home with pneumonia. You tell her about the doctor who thought your pancreas pain was anxiety.",
      "When a nurse finally calls her name, Gladys squeezes your hand. 'You hang in there, honey. And if they try to send you home, you raise hell.'",
      "The unlikely friendship makes the waiting slightly more bearable. You're still in pain, still being ignored, but at least you're not alone in the experience."
    ],
    choices: [
      { text: 'Continue waiting, slightly comforted.', nextId: 'waiting_game' },
      { text: 'Ask the front desk about your wait time.', nextId: 'charge_nurse' },
    ],
  },

  charge_nurse: {
    id: 'charge_nurse',
    text: [
      "Bolstered by your conversation with Gladys, you approach the front desk. The receptionist is typing rapidly, not looking up as you stand there waiting to be acknowledged.",
      "You clear your throat. 'Excuse me, I've been waiting for over four hours. Could you tell me how much longer it might be?'",
      "The receptionist glances up briefly. 'We triage based on medical necessity, not arrival time.'",
      "Something in you snaps. 'I understand that, but I'm in significant pain, and I'd like to speak with the charge nurse about my situation.'",
      "The magic words: 'charge nurse.' The receptionist's demeanor shifts slightly. 'I'll see if she's available.'",
      "Ten minutes later, a tired-looking woman in navy scrubs approaches. 'I'm the charge nurse. What seems to be the problem?'",
      "You explain your symptoms and the wait time. She listens, nodding occasionally, then checks something on a computer.",
      "'Let me see what I can do,' she says, and for the first time, you feel like someone might actually be trying to help."
    ],
    choices: [
      { text: 'Thank her and wait more hopefully.', nextId: 'waiting_game' },
      { text: 'Ask about getting at least some pain relief while waiting.', nextId: 'demand_pain_relief' },
    ],
  },
  
  // Last scenes in the story data
  threaten_youtube: {
    id: 'threaten_youtube',
    text: [
      "You smile sweetly through the bathroom door. 'Actually, I've been recording everything for a YouTube documentary series on medical neglect. We're interviewing patients across the country about their experiences.'",
      "This is a complete lie, but the effect is immediate. You hear urgent whispers outside the door.",
      "'Ms. Rodriguez from administration is on her way down,' someone says. 'She'd like to speak with you personally about your concerns.'",
      "Ten minutes later, you're not only out of the bathroom but in a private room with an actual doctor reviewing your symptoms. There's even a warm blanket and a genuine apology.",
      "The power of social media and creative storytelling has accomplished what hours of legitimate pain couldn't: actual medical attention."
    ],
    choices: [
      { text: 'Finally receive proper care.', nextId: 'glimmer_of_hope' },
    ],
  },

  gracious_victory: {
    id: 'gracious_victory',
    text: [
      "You decide to accept the victory with dignity, rather than pushing your advantage further.",
      "'Thank you,' you say simply. 'I just want to be taken seriously.'",
      "The tone shifts. There's a hint of genuine remorse from the staff as they escort you to an actual treatment room. Your vitals are taken properly. Someone offers you a warm blanket.",
      "A doctor appears with surprising speed, actually listening as you explain your symptoms. Tests are ordered. Pain medication is discussed without skepticism.",
      "You wonder about all the patients still waiting who don't have the leverage of viral fame. But for now, you focus on your own care, finally receiving the attention you've desperately needed."
    ],
    choices: [
      { text: 'Proceed with proper medical assessment.', nextId: 'glimmer_of_hope' },
    ],
  }
};

export default function AdventureGame() {
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');

  const currentScene = storyData[currentSceneId];

  const handleChoice = (nextId: string) => {
    if (storyData[nextId]) {
      setCurrentSceneId(nextId);
    } else {
      console.error(`Error: Scene with id "${nextId}" not found!`);
      setCurrentSceneId('start');
    }
  };

  if (!currentScene) {
     if (storyData['start']) {
        setCurrentSceneId('start');
        return <div className="text-yellow-500 font-bold">Scene error, resetting...</div>;
     }
    return <div className="text-red-500 font-bold">Error: Critical error loading story!</div>;
  }

  const renderText = (textData: string | string[]) => {
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
      <h2 className="text-xl font-medium mb-6 text-gray-600 border-b pb-2">Story 1: Welcome to the ER: Please Take a Number</h2>
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

      {currentScene.isEnding && (
         <div className="mt-8 text-center text-gray-500 italic">
            You made it home, but the ordeal isn't truly over. The fight continues.<br/>(Refresh page to start again)
         </div>
      )}
    </div>
  );
} 