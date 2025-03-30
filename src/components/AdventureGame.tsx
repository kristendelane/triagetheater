'use client';

import React, { useState } from 'react';

// Define the structure for a choice
interface Choice {
  text: string;
  nextId: string;
}

// Define the structure for a scene
interface Scene {
  id: string;
  text: string | string[]; // Allow multiple paragraphs
  choices?: Choice[];
  isEnding?: boolean; // Optional flag for ending scenes
  imageUrl?: string; // Optional image
  tiktokEmbed?: string; // Optional TikTok embed code or link placeholder (currently just displays text)
}

// Define the main story data structure
type StoryData = Record<string, Scene>;

// --- STORY DATA ---
const storyData: StoryData = {
  start: {
    id: 'start',
    text: [
      "You wake up feeling like a team of ninjas has been stabbing you in the belly all night, a pain you know too well from your last visit to the ER — the cold, sterile room, the fluorescent lights humming overhead, and the constant, aching reminder that no one seems to believe you're actually suffering.",
      "The pain becomes unbearable. You can't walk. You're doubled over, gasping, sweat pouring down your face. You plead with your partner to call 911.",
      "When the paramedics arrive, your partner has to spend twenty minutes convincing them that you're not nine months pregnant and in labor. The bloating is so extreme you look like you've swallowed a basketball. Your skin is stretched tight.",
      "They try and fail to find a vein. You tell them it's always like this, that you need ultrasound guidance, but they insist. Eventually, they give up and jab you with an intramuscular injection of fentanyl. It hits bone. You scream. The bruising is immediate and deep. You won't be able to lift your arm high enough to put on a shirt for a month.",
      "You arrive at the ER and are eventually placed in a bed in the hallway. The nurse's dismissive attitude weighs on you. You wonder if you should speak up about your concerns, but you're also tired of being labeled 'difficult'."
    ],
    choices: [
      { text: 'Speak up: Tell the nurse you need proper treatment.', nextId: 'confrontation' },
      { text: "Stay silent: You're too exhausted. Wait it out.", nextId: 'waiting_game' },
    ],
  },
  confrontation: {
    id: 'confrontation',
    text: [
        "You gather your strength and speak up, explaining your history and demanding the treatment you deserve.",
        "This only seems to escalate the situation. The nurse sighs loudly, treating you as difficult. Still, it feels like a small victory when a doctor arrives sooner than perhaps they would have otherwise.",
        "The doctor listens, nods, but offers no immediate solutions, only vague promises of tests. They give you a preliminary diagnosis for *some* of your symptoms — a tiny, uncertain glimmer of hope amidst the neglect."
    ],
    choices: [
      { text: 'Ask for a supervisor or patient advocate.', nextId: 'supervisor_escalation' },
      { text: 'Give up: Fall into a daze, hoping someone helps.', nextId: 'discharged_frustration' },
      { text: 'Consider documenting this.', nextId: 'tiktok_moment_confront' }
    ],
  },
  waiting_game: {
    id: 'waiting_game',
    text: [
        "You lie there, ignored. The clock ticks slowly, each minute an agony. You try crocheting to distract yourself from the pain and the indifference.",
        "Hours pass. Eventually, the triage nurse walks by, muttering something about finally getting you to radiology. They wheel you off for an abdominal X-ray.",
        "It doesn't answer any questions definitively, showing only 'gas and stool', but at least you're moving, not forgotten in the hallway."
    ],
    choices: [
      { text: 'Ask if the X-ray will give any useful information.', nextId: 'ask_about_xray' },
      { text: 'Hold on: Try to believe real answers are coming.', nextId: 'glimmer_of_hope' },
       { text: 'Consider documenting this.', nextId: 'tiktok_moment_wait' }
    ],
  },
  supervisor_escalation: {
    id: 'supervisor_escalation',
    text: [
        "You politely but firmly request to speak to a nursing supervisor or a patient advocate to escalate your concerns about the dismissive treatment.",
        "This causes a stir. The original nurse glares, but eventually, a supervisor arrives. They listen more attentively, apologize for your experience (though it feels procedural), and promise to review your chart more closely.",
        "It doesn't magically fix everything, but there's a sense that your voice has been registered, making the neglect slightly less absolute."
    ],
    choices: [
      { text: 'Focus on the potential tests.', nextId: 'glimmer_of_hope' },
      { text: 'Continue documenting your experience.', nextId: 'tiktok_moment_escalate' }
    ]
  },
  discharged_frustration: {
    id: 'discharged_frustration',
    text: [
        "Exhausted and disheartened, you retreat into yourself. The brief interaction with the doctor fades. Hours pass with minimal attention.",
        "Eventually, another nurse appears with discharge papers. The diagnosis is vague - 'abdominal pain, unspecified'. No solutions, no follow-up plan beyond 'see your GP'. You feel utterly defeated.",
        "They barely check if you can walk before showing you the door."
    ],
    choices: [
       { text: 'Leave, defeated, needing to figure out next steps.', nextId: 'mri_intro' }
    ]
  },
   ask_about_xray: {
    id: 'ask_about_xray',
    text: [
        "'Will this X-ray even show what's wrong?' you ask the tech, trying to keep the exhaustion out of your voice.",
        "The tech shrugs noncommittally. 'It gives the doctors a picture. Sometimes it helps.'",
        "You're wheeled back, the non-answer echoing the lack of care you've felt all along. You still have no real information."
    ],
    choices: [
       { text: 'Keep waiting, hoping for more tests.', nextId: 'glimmer_of_hope' },
       { text: 'Document the frustration.', nextId: 'tiktok_moment_xray' }
    ]
  },
  glimmer_of_hope: {
    id: 'glimmer_of_hope',
    text: [
        "You cling to the possibility that *something* will come of this visit. More tests are ordered - blood work, maybe even a CT scan eventually.",
        "The waiting continues, punctuated by brief, impersonal interactions. You desperately need the bathroom."
    ],
    choices: [
        { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' }
    ]
  },

  // --- TikTok Branch --- (Can be reached from multiple points)
  tiktok_moment_confront: { id: 'tiktok_moment_confront', text: "The frustration is overwhelming. Maybe... maybe you should record this?", choices: [ { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} ] },
  tiktok_moment_wait: { id: 'tiktok_moment_wait', text: "Hours of waiting... this is ridiculous. Should you film this?", choices: [ { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} ] },
  tiktok_moment_escalate: { id: 'tiktok_moment_escalate', text: "Even after escalating, the neglect feels palpable. Maybe the world should see?", choices: [ { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} ] },
  tiktok_moment_xray: { id: 'tiktok_moment_xray', text: "Another useless test? This is prime material for documentation.", choices: [ { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} ] },

  tiktok_prompt: {
    id: 'tiktok_prompt',
    text: "In a moment of desperation and dark humor, you decide to post a TikTok from your hospital bed. It's the first time you might be truly seen — not by the staff, but by the world.",
    choices: [
      { text: 'Post it: Share your experience.', nextId: 'viral_hit_setup' },
      { text: 'Delete it: It feels too raw.', nextId: 'private_suffering' },
    ],
  },
  viral_hit_setup: {
      id: 'viral_hit_setup',
      text: "You film a short, raw video. Which one captures the mood?",
      choices: [
          { text: 'Film "I am Blanket".', nextId: 'viral_hit_blanket'},
          { text: 'Film "Medical Bingo".', nextId: 'viral_hit_bingo'}
      ]
  },
  viral_hit_blanket: {
    id: 'viral_hit_blanket',
    tiktokEmbed: '"And this... is my blankie. My only friend in the hospital, who doesn\'t judge me when I poop myself. #IAmBlanket"',
    text: [
        "You post the 'I am Blanket' video. It explodes online. Thousands see your pain, frustration, humor. Comments pour in: \"A blanket's better than these doctors.\" \"This video is my therapy.\" \"Can you make me one of those blankets though?\"",
        "The recognition is bittersweet validation. You post another. Then another, darker, funnier. Sock puppets reenacting the blood draw. Lip-syncing Billie Eilish holding a sign: \"Guess how many days NPO?\"",
        "Your following grows. You're seen. But reality bites: you still need the bathroom."
        ],
    choices: [
      { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' },
    ],
  },
    viral_hit_bingo: {
    id: 'viral_hit_bingo',
    tiktokEmbed: '"The doctors have no idea what\'s wrong, but here\'s their bingo card. Small bowel obstruction, maybe? Radiology says gas and diarrhea." You dramatically throw the chart.',
    text: [
        "You post the 'Medical Bingo' video. It explodes online. Thousands see your pain, frustration, humor. Comments pour in: \"Maybe they'll find your missing kidney...\" \"They gave me Tums for internal bleeding.\" \"Someone should play Find the Vein next time.\"",
        "The recognition is bittersweet validation. You post another. Then another, darker, funnier. Sock puppets reenacting the blood draw. Lip-syncing Billie Eilish holding a sign: \"Guess how many days NPO?\"",
        "Your following grows. You're seen. But reality bites: you still need the bathroom."
        ],
    choices: [
      { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' },
    ],
  },
   viral_hit_poop: {
    id: 'viral_hit_poop',
    tiktokEmbed: 'After your MRI, you film a TikTok in the bathroom, holding up the emergency wet wipes packet like a trophy: "Guess who finally got the full hospital experience? I\'m the first to shit AND get stuck in a machine. #EveryDayIsAnAdventure #ERChronicles"',
    text: [
        "Later, after the MRI incident, you even manage to film the 'I Pooped Myself Again' TikTok. It gets a mix of horrified sympathy and dark laughs.",
        "Being seen online is one thing, escaping this hospital is another."
        ],
    choices: [
      { text: 'Face the discharge.', nextId: 'mri_discharge' },
    ],
  },
  private_suffering: {
    id: 'private_suffering',
    text: "You reconsider, deleting the draft. It feels too vulnerable, too raw to share this particular moment with strangers online. You put the phone away, the weight of the neglect settling back in. The urgent need for the bathroom returns.",
    choices: [
      { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' },
    ],
  },

  // --- Bathroom Branch --- (Reached after hope/TikTok)
  bathroom_dilemma: {
    id: 'bathroom_dilemma',
    text: "You desperately need to get to the bathroom, but you know the bed alarm will go off the moment you try to move. The humiliation of needing help versus the risk of setting off alarms and getting yelled at is paralyzing.",
    choices: [
      { text: 'Ask for help: Ring the call button.', nextId: 'help_please' },
      { text: 'Try to go anyway: Risk the alarm.', nextId: 'risky_escape' },
    ],
  },
  help_please: {
    id: 'help_please',
    text: [
        "You press the call button. Minutes stretch into an eternity. The pressure builds. Finally, a nurse arrives, looking annoyed.",
        "But it's too late. You've soiled yourself. The nurse offers a brief, impersonal cleanup, leaving you feeling ashamed and helpless. There's no offer of a proper shower.",
        "Eventually, talk turns to more imaging. They mention needing an MRI."
        ],
    choices: [
        { text: 'Prepare for the MRI.', nextId: 'mri_intro' }
    ]
  },
  risky_escape: {
    id: 'risky_escape',
    text: [
        "You carefully, painfully, swing your legs over the side, trying to disable the alarm sensors. Too late! It blares loudly.",
        "You stumble towards the bathroom as a nurse rushes in, shouting about safety protocols. 'You HAVE to call!'",
        "Humiliated but defiant, you make it to the toilet just in time. The privacy is a relief, but the confrontation leaves you shaken.",
        "Later, they tell you more imaging is needed. An MRI."
    ],
     choices: [
        { text: 'Prepare for the MRI.', nextId: 'mri_intro' }
    ]
  },

  // --- MRI Branch --- (Reached after bathroom or discharge path)
  mri_intro: {
    id: 'mri_intro',
    text: "After hours more waiting, or perhaps following that frustrating earlier discharge, they decide you need an MRI Enterography or Defecography to examine your lower colon and rectum. They wheel you towards the MRI suite.",
    choices: [
        { text: 'Undergo the procedure.', nextId: 'mri_experience'}
    ]
  },
  mri_experience: {
    id: 'mri_experience',
    text: [
        "The tech explains they need to insert a silicone-based contrast gel into your rectum. 'It helps us see how things are functioning. Try to hold it in.'",
        "The procedure is deeply uncomfortable, invasive. Almost immediately, the pressure is unbearable. You can't hold it. You desperately expel the gel and everything else as they slide you into the narrow, clanging tube of the MRI machine.",
        "You're trapped. The smell is overpowering. You call out, choked with humiliation and panic. No response. Eternity passes.",
        "You scream. Finally, a male tech appears, avoids eye contact, hands you a single packet of wet wipes, and leaves. You have feces in your hair. You try to clean yourself, but it's impossible. They deny you a shower."
    ],
    choices: [
      { text: 'Post the "I Pooped Myself Again" TikTok.', nextId: 'viral_hit_poop' },
      { text: 'Just face the discharge.', nextId: 'mri_discharge' },
    ],
  },
    mri_discharge: {
      id: 'mri_discharge',
      text: "After the MRI ordeal, they discharge you. Your own clothes are nowhere to be found. They hand you flimsy paper scrubs. You still feel filthy and degraded.",
      choices: [
          { text: 'Attempt to get an Uber.', nextId: 'uber_refusal'}
      ]
  },

  // --- Ending Branches ---
  uber_refusal: {
    id: 'uber_refusal',
    text: [
        "Desperate to get home, you order an Uber. The driver pulls up, takes one look (and smell) at you in your paper scrubs, reeking of the MRI incident.",
        "'Ma'am,' he says, nose wrinkled. 'I can't... I can't let you in my car like this. I'd have to burn it.' He drives off, leaving you on the curb, a fresh wave of humiliation washing over you."
    ],
    choices: [
      { text: 'Text your partner for rescue.', nextId: 'rescue_ending' },
    ],
  },
  rescue_ending: {
    id: 'rescue_ending',
    text: [
        "In desperation, swallowing your pride and worry about flaring up his own condition, you text your partner.",
        "Thirty minutes later, he arrives. Ginger ale, emesis bags, no judgment in his eyes — only concern. He understands central sensitization, the dismissals, the pain. He helps you into the car.",
        "You vomit twice on the way home. He's just there, supporting you physically and emotionally in a way the hospital never could.",
        "The journey is long, nauseating, painful. But you're not alone. He gets it."
    ],
    isEnding: true,
  },

};
// --------------------


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
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">Hellish Hospital Adventure</h2>
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