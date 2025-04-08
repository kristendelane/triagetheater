// A fixed version without duplicated scenes
import { useState } from 'react';

interface Choice {
  text: string;
  nextId: string;
  description?: string;
}

interface GameScene {
  id: string;
  text: string | string[];
  choices?: Choice[];
  tiktokEmbed?: string;
  isEnding?: boolean;
  resources?: Array<{
    title: string;
    url?: string;
    items?: string[];
  }>;
  navigation?: Array<{
    text: string;
    nextId: string;
  }>;
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
  },

  escape_ambulance: {
    id: 'escape_ambulance',
    text: [
      "🛑 Scene: The Great Ambulance Escape",
      "You are, technically speaking, lying in an ambulance. But only barely. The moment you're loaded up, things go sideways.",
      "Your partner and the paramedics are engaged in what can only be described as a medical debate club meeting about whether you're pregnant with twins. 'She's just bloated!' your partner insists, while the paramedics exchange knowing glances that say 'Ah yes, the classic \"just bloated\" cover story.'",
      "Meanwhile, they're trying to find a vein. Spoiler alert: they can't. After what feels like an eternity of poking and prodding, one of them sighs and pulls out a syringe. 'We'll have to go intramuscular,' they say, as if this is a perfectly normal thing to say to someone who is already in the worst pain of their life.",
      "The fentanyl hits bone. You scream. Not a polite 'ouch' scream, but the kind of scream that makes small children cry and dogs howl in sympathy. The bruising spreads like a Rorschach test of suffering, and you're pretty sure you'll never be able to lift your arm again.",
      "That's when you realize: if this is how they treat you in the ambulance, the ER is going to be a whole new level of hell. You make a decision.",
      "'I'm not going. Stop the ambulance. I want out.'",
      "There's a pause. Then a sigh. You're told you'll need to sign an Against Medical Advice (AMA) form before they can legally let you out. You scribble something between a middle finger and a squiggle and immediately regret it—but not as much as you're about to regret everything else.",
      "They unload you and leave you curled like a shrimp on the cold curb outside your apartment building. You can't walk. You're in too much pain to even sit upright. A stray soda can rolls toward your shoe, taps it gently, and continues its journey with more dignity than you currently possess.",
      "Your partner, who's been standing there the whole time watching this medical circus unfold, looks at you with a mix of concern and 'I told you so' that could power a small city. The paramedics drive off, probably to argue with someone else about whether they're pregnant with triplets or just really into burritos."
    ],
    choices: [
      { 
        text: '🚕 Call an Uber', 
        nextId: 'uber_ride',
        description: "You brace yourself for the Everest-level challenge of getting into a car with roiling upper gastric pain, nausea, and the spinal flexibility of a mannequin. But worse—far worse—is the quiet heartbreak of watching your partner, who can barely walk or sit, force himself into his own car to trail you. He can't ride in an Uber; the seats are wrong, the angles are wrong, the world is wrong. His own car is tricked out with ergonomic cushions, special mirrors, and the faint scent of medicinal despair. He'll follow you to the hospital. He'll sit in the parking lot with a heat pad, probably crying silently, and you'll pretend you don't notice. But tomorrow—or next week, or forever—he'll be down with a new flare. Maybe in his shoulders this time. Maybe his jaw. Maybe a brand-new 'hot spot' that never goes away. But hey—you got your ride."
      },
      { 
        text: '💔 Ask your partner to drive you', 
        nextId: 'partner_drive',
        description: "He's already there, of course. He never left your side. You exchange a look that only two people who've spent years taking turns being the 'sick one' can understand. It's a mix of 'I'm so sorry you're in pain' and 'I know exactly how much this sucks' and 'I love you so much it hurts.' He helps you up with the careful precision of someone who knows exactly how to move when everything hurts, and you both pretend not to notice how his hands are shaking too. The drive is less than 15 minutes but feels like a death march. He helps you into the car with the practiced ease of someone who's done this dance a hundred times before. You watch the pain flicker across his face as he opens the passenger side, and you both know that tomorrow—or next week, or forever—he'll be down with a new flare. Maybe in his shoulders this time. Maybe his jaw. Maybe a brand-new 'hot spot' that never goes away. But right now, you're a team. And teams take care of each other."
      }
    ],
    resources: [
      {
        title: "Refusing Ambulance Transport: What You Need to Know",
        url: "https://www.verywellhealth.com/refusing-ambulance-transport-1298894"
      },
      {
        title: "Sick Together: Coping When Both Partners Have Chronic Illness",
        url: "https://psychcentral.com/lib/sick-together-coping-when-both-partners-have-chronic-illness"
      },
      {
        title: "Sample scripts for next time:",
        items: [
          "'I need a medically safe way to get to the ER, but I can't tolerate the ambulance ride. Can we pause and problem-solve together?'",
          "'Please document my refusal was due to feeling unsafe, not that I don't need emergency care.'"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },

  uber_ride: {
    id: 'uber_ride',
    text: [
      "🚕 The Uber Ride",
      "The Uber driver takes one look at you and immediately regrets accepting the ride. You're pale, sweating, and curled into a fetal position in the backseat.",
      "'You okay back there?' he asks, eyeing you in the rear-view mirror.",
      "You manage a weak 'mhm' between clenched teeth.",
      "The ride is agony. Every bump, every turn, every stop sends waves of pain through your abdomen. You focus on your breathing, trying not to vomit in this stranger's car.",
      "Your partner follows behind in his specially modified car, his own pain written across his face in the rearview mirror.",
      "When you finally arrive at the ER, the Uber driver practically jumps out to open your door, eager to be rid of you. You stumble out, barely able to stand, while your partner parks his car and limps over to help you inside.",
      "The automatic doors slide open, revealing the fluorescent-lit purgatory of the emergency room. A bored-looking receptionist glances up from her computer.",
      "'Take a number,' she says, gesturing to the dispenser. 'And maybe a vomit bag.'"
    ],
    choices: [
      { text: 'Take a number and wait.', nextId: 'er_arrival_expanded' },
      { text: 'Try to explain your situation to the receptionist.', nextId: 'receptionist_conversation' }
    ],
  },

  partner_drive: {
    id: 'partner_drive',
    text: [
      "🚗 The Partner Drive",
      "The drive to the ER is a silent symphony of pain. Your partner's knuckles are white on the steering wheel, his jaw clenched against his own discomfort.",
      "You try to find a position that doesn't make you want to scream. There isn't one.",
      "The car is filled with the scent of his various pain creams and the sound of both of you trying not to cry.",
      "When you arrive, he helps you out of the car, his movements stiff and careful. You lean on each other, two broken people trying to hold each other up.",
      "The automatic doors slide open, revealing the fluorescent-lit purgatory of the emergency room. A bored-looking receptionist glances up from her computer.",
      "'Take a number,' she says, gesturing to the dispenser. 'And maybe a vomit bag.'"
    ],
    choices: [
      { text: 'Take a number and wait.', nextId: 'er_arrival_expanded' },
      { text: 'Try to explain your situation to the receptionist.', nextId: 'receptionist_conversation' }
    ],
  },
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
          <div className="flex flex-col space-y-4">
            {currentScene.choices.map((choice) => (
              <div key={choice.nextId} className="mb-4">
                <button
                  onClick={() => handleChoice(choice.nextId)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center"
                >
                  {choice.text}
                </button>
                {choice.description && (
                  <p className="mt-2 text-gray-600 text-sm italic">{choice.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentScene.resources && currentScene.resources.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4 text-gray-600">📚 Resources</h3>
          <ul className="list-disc pl-5 space-y-2">
            {currentScene.resources.map((resource, index) => (
              <li key={index} className="text-gray-700">
                {resource.url ? (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {resource.title}
                  </a>
                ) : (
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    {resource.items && (
                      <ul className="list-disc pl-5 mt-1">
                        {resource.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentScene.navigation && currentScene.navigation.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4 text-gray-600">➡ What now?</h3>
          <div className="flex flex-col space-y-3">
            {currentScene.navigation.map((nav) => (
              <button
                key={nav.nextId}
                onClick={() => handleChoice(nav.nextId)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-center"
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