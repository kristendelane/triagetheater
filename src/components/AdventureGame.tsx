"use client";

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
      "🧨 Scene: Welcome to the ER — Please Take a Number",
      "It didn't start with an ambulance. It started with a year of gaslighting.",
      "You were a good patient. You went to every appointment, even when you had to leave work early, bike two hours with your stomach in knots, or beg friends for rides. You tolerated it all — the rotating cast of medical residents who never read your chart, the endless loop of 'eat more fiber,' 'take Miralax,' 'do yoga,' and the cherry on top: 'Are you here for drugs?'",
      "You told them, every time: 'This is NOT a case of IBS. I'm an ultramarathon runner. I eat like a vegan wellness influencer. I've taken everything you've prescribe - multiple times - as written. And I'm still in agony.'",
      "They nodded sympathetically and prescribed a different flavor of useless.",
      "You worked at a 3D printing company, finally with decent insurance. Stanford Hospital was twenty minutes away. The GI clinic was walking distance from your job. You thought that meant something.",
      "It didn't.",
      "Stanford gave you the same shrugs and suspicion that Medi-Cal did — just with nicer furniture.",
      "After months of vomiting, bloating so severe none of your clothes fit, and appointments that went nowhere, you stopped hoping. You started surviving. You stayed late in the lab to make up for time lost to vomiting in your car or sprinting to the bathroom mid-client meeting. You popped antiemetics like mints — which you'd been on since middle school, by the way, because this didn't start last year. This started decades ago. No one ever took it seriously.",
      "Rather than sympathy and help, fighting the urge not to throw up in the middle of meetings (and often failing) earned you the label of 'unreliable employee'. It's not long before your b*tch of a boss puts you on an extensive PIP for <gasp!> fighting a serious and life-threatening chronic illness.",
      "Then came the night everything broke.",
      "You wake up feeling like a team of ninjas has been stabbing you in the belly all night. The pain is relentless — twisting, bloating, pulsing — and you can't tell if it's your intestines or a demon.",
      "But the pain — the pressure — it felt like you'd swallowed a basketball.",
      "You couldn't stand. Couldn't walk. Couldn't breathe without crying.",
      "The pain in your stomach becomes unbearable. You can't walk. You're doubled over, gasping, sweat pouring down your face. You plead with your partner to call 911.",
      "The paramedics arrived. Professionals, supposedly.",
      "Your partner has to spend twenty minutes convincing them that you're not nine months pregnant and in labor. The bloating is so extreme you look like you've swallowed a basketball. Your skin is stretched tight — so tight you're surprised you don't burst into stretch marks.",
      "They try and fail to find a vein. Eventually, they give up and jab you with an intramuscular injection of fentanyl. It hits bone. You scream. The bruising is immediate spreads like a Rorschach test. You wouldn't be able to lift your arm for weeks.",
      "And finally — finally — you arrive at the ER. Where you learned that the trauma of being believed isn't actually better than the trauma of being ignored.",
      "Welcome to the ER. Please take a number. And maybe a vomit bag."
    ],
    choices: [
      { text: '🚑 Continue to the ER in the ambulance', nextId: 'er_arrival_expanded' },
      { text: '🛑 Escape the ambulance and go back home', nextId: 'escape_ambulance' }
    ],
    resources: [
      {
        title: "Understanding Medical Gaslighting",
        url: "https://www.healthline.com/health/medical-gaslighting"
      },
      {
        title: "Chronic Illness and Medical Trauma",
        url: "https://www.psychologytoday.com/us/blog/the-truth-about-exercise-addiction/201808/chronic-illness-and-medical-trauma"
      },
      {
        title: "Patient Advocacy Resources",
        items: [
          "How to Document Your Symptoms Effectively",
          "Questions to Ask Your Healthcare Provider",
          "Understanding Your Rights as a Patient"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  // And all other scenes...

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
      "The paramedics drive off, probably to argue with someone else about whether they're pregnant with triplets or just really into burritos."
    ],
    choices: [
      { text: '🚕 Call an Uber', nextId: 'uber_ride' },
      { text: '❤️‍🩹 The Partner Drive', nextId: 'partner_drive' },
      { text: '🚽 Decide to Suffer Through the Pain at Home', nextId: 'home_suffering' }
    ]
  },

  uber_ride: {
    id: 'uber_ride',
    text: [
      "You brace yourself for the Everest-level challenge of getting into a car with roiling upper gastric pain, nausea, and the spinal flexibility of a mannequin.",
      "But worse—far worse—is the quiet heartbreak of watching your partner, who can barely walk or sit, force himself into his own car to trail you.",
      "He can't ride in an Uber; the seats are wrong, the angles are wrong, the world is wrong.",
      "His own car is tricked out with ergonomic cushions, special mirrors, and the faint scent of medicinal despair.",
      "He'll follow you to the hospital.",
      "He'll sit in the parking lot with a heat pad, probably crying silently, and you'll pretend you don't notice.",
      "But tomorrow—or next week, or forever—he'll be down with a new flare.",
      "Maybe in his shoulders this time.",
      "Maybe his jaw.",
      "Maybe a brand-new 'hot spot' that never goes away.",
      "But hey—you got your ride.",
      "The Uber driver takes one look at you and immediately regrets accepting the ride.",
      "You're pale, sweating, and curled into a fetal position in the backseat.",
      "'You okay back there?' he asks, eyeing you in the rearview mirror.",
      "You manage a weak 'mhm' between clenched teeth.",
      "The ride is agony. Every bump, every turn, every stop sends waves of pain through your abdomen.",
      "You focus on your breathing, trying not to vomit in this stranger's car.",
      "Your partner follows behind, wrapped in a heating belt, his own pain written across his face in the rear-view mirror.",
      "When you finally arrive at the ER, the Uber driver practically jumps out to open your door, eager to be rid of you.",
      "You stumble out, barely able to stand, while your partner parks his car and limps over to help you inside.",
      "The automatic doors slide open, revealing the fluorescent-lit purgatory of the emergency room. A bored-looking receptionist glances up from her computer.",
      "'Take a number,' she says, gesturing to the dispenser. 'And maybe a vomit bag.'"
    ],
    choices: [
      { text: 'Take a number and wait.', nextId: 'er_arrival_expanded' },
      { text: 'Try to explain your situation to the receptionist.', nextId: 'receptionist_conversation' }
    ],
    resources: [
      {
        title: "Ride-Sharing with Chronic Illness",
        url: "https://www.healthline.com/health/chronic-illness/ride-sharing-with-chronic-illness"
      },
      {
        title: "Coping with Medical Trauma",
        url: "https://www.psychologytoday.com/us/blog/the-truth-about-exercise-addiction/201808/chronic-illness-and-medical-trauma"
      },
      {
        title: "Emergency Room Preparation Tips",
        items: [
          "Bring a list of current medications and allergies",
          "Have your insurance information ready",
          "Pack comfort items (heating pad, water bottle, etc.)",
          "Bring a support person if possible"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },

  partner_drive: {
    id: 'partner_drive',
    text: [
      "🚗 The Partner Drive",
      "He's already there, of course. He never left your side. The look you share is one of deep understanding, of love, of the bittersweet reality that this is your life now. Two chronically ill people, trying to take care of each other when neither can take care of themselves.",
      "He helps you into his specially modified car, his movements stiff and careful. You lean on each other, two broken people trying to hold each other up.",
      "The drive to the ER is a silent symphony of pain. His knuckles are white on the steering wheel, his jaw clenched against his own discomfort. You try to find a position that doesn't make you want to scream. There isn't one.",
      "The car is filled with the scent of his various pain creams and the sound of both of you trying not to cry.",
      "When you arrive, he helps you out of the car, his movements stiff and careful. You lean on each other, two broken people trying to hold each other up.",
      "The automatic doors slide open, revealing the fluorescent-lit purgatory of the emergency room. A bored-looking receptionist glances up from her computer.",
      "'Take a number,' she says, gesturing to the dispenser. 'And maybe a vomit bag.'",
      "You look at each other and smile, because what else can you do? You're a team. And teams take care of each other."
    ],
    choices: [
      { text: 'Take a number and wait.', nextId: 'er_arrival_expanded' },
      { text: 'Try to explain your situation to the receptionist.', nextId: 'receptionist_conversation' }
    ],
    resources: [
      {
        title: "Supporting a Partner with Chronic Illness",
        url: "https://www.healthline.com/health/chronic-illness/supporting-partner-chronic-illness"
      },
      {
        title: "When Both Partners Have Chronic Pain",
        url: "https://www.practicalpainmanagement.com/patient/resources/pain-self-management/when-both-partners-have-chronic-pain"
      },
      {
        title: "Caregiver Self-Care Tips",
        items: [
          "Set boundaries and know your limits",
          "Maintain your own medical care",
          "Join support groups for caregivers",
          "Practice stress management techniques",
          "Accept help when offered"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },

  home_suffering: {
    id: 'home_suffering',
    text: [
      "You decide that if you're going to be in excruciating pain with no medical care, you might as well do it surrounded by your own germs instead of other people's.",
      "You cocoon yourself in blankets. Your cat, sensing weakness, decides to sit directly on your most painful spot. It's unclear if this is feline healing or calculated torture.",
      "Hours pass in a blur of pain, half-watched Netflix shows, and WebMD searches that convince you you're simultaneously dying of seventeen different conditions, none of which your doctor will believe.",
      "Eventually, the pain reaches such spectacular heights that you pass out. You wake up later, still in pain but now with the added joy of a dehydration headache and a cat that has stolen your phone as vengeance for disturbing its nap."
    ],
    choices: [
      { text: 'Finally give in and go to the ER.', nextId: 'er_arrival_expanded' },
      { text: 'Document your suffering.', nextId: 'home_tiktok' }
    ],
    resources: [
      {
        title: "When to Go to the ER vs. Urgent Care",
        url: "https://www.healthline.com/health/emergency-room-vs-urgent-care"
      },
      {
        title: "Managing Chronic Pain at Home",
        url: "https://www.webmd.com/pain-management/guide/managing-chronic-pain-at-home"
      },
      {
        title: "Emergency Warning Signs",
        items: [
          "Severe, persistent abdominal pain",
          "Signs of dehydration",
          "Difficulty breathing",
          "Loss of consciousness",
          "When to call 911 vs. seeking other care options"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  home_tiktok: {
    id: 'home_tiktok',
    tiktokEmbed: `"Day 3 of the bathroom floor saga. My cat is now my primary care physician. His diagnosis is 'feed me' but I think he's onto something. #ChronicIllness #BathroomFloorCore"`,
    text: [
      "You prop your phone against the bathroom sink and film a weak but sarcastic update on your condition.",
      "The comments pour in: \"Same.\" \"They gave me Tums for internal bleeding.\" \"I laughed so hard I aspirated my Ensure.\" \"Your cat has better bedside manner than my gastroenterologist.\" \"Bathroom floor core is my new aesthetic.\" \"I'm showing this to my doctor who says it's just anxiety.\" \"My cat diagnosed me better than the ER doc who said it was just constipation.\" \"Is your cat taking new patients? My insurance won't cover specialists.\"",
      "You post another TikTok. Then another. They get darker. Funnier. More surreal. One features sock puppets reenacting your last blood draw. Another is just you deadpan lip-syncing to Billie Eilish while holding a sign that says \"Guess how many days I've been NPO?\"",
      "By sunset, you've become a minor TikTok celebrity in the chronic illness community. Your cat makes guest appearances, largely to walk across your face while you're mid-sentence."
    ],
    choices: [
      { text: 'Your followers convince you: Go to the ER.', nextId: 'er_arrival_expanded' },
      { text: 'Stay home and become a full-time chronic illness influencer.', nextId: 'influencer_ending' }
    ],
    resources: [
      {
        title: "Chronic Illness Community on Social Media",
        url: "https://www.healthline.com/health/chronic-illness/social-media-community"
      },
      {
        title: "Using Humor to Cope with Chronic Illness",
        url: "https://www.verywellhealth.com/using-humor-to-cope-with-chronic-illness"
      },
      {
        title: "Social Media Self-Care Tips",
        items: [
          "Set boundaries with your content",
          "Take breaks when needed",
          "Don't feel pressured to share everything",
          "Build genuine connections",
          "Remember it's okay to be both vulnerable and funny"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  influencer_ending: {
    id: 'influencer_ending',
    text: [
      "Three months later, you've built a following of 50,000 fellow medical system refugees. Your content has evolved from desperate bathroom floor updates to surprisingly informative videos about navigating insurance denials and doctor gaslighting.",
      "You've received five sponsorship offers for various dubious supplements, but instead partnered with a heating pad company that actually helps.",
      "Your diagnosis remains a mystery, but the community you've built understands your pain better than any medical professional ever did. Your cat now has its own merchandise line.",
      "It's not a cure, but it's something like validation. And in this healthcare system, sometimes that's the best treatment available."
    ],
    isEnding: true,
    resources: [
      {
        title: "Building a Supportive Online Community",
        url: "https://www.healthline.com/health/chronic-illness/online-community"
      },
      {
        title: "Patient Advocacy Through Social Media",
        url: "https://www.verywellhealth.com/social-media-healthcare-advocacy"
      },
      {
        title: "Content Creator Tips for Chronic Illness",
        items: [
          "Focus on authentic storytelling",
          "Protect your privacy and boundaries",
          "Research before promoting products",
          "Connect with other advocates",
          "Remember your health comes first"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  er_arrival_expanded: {
    id: 'er_arrival_expanded',
    text: [
      "The fluorescent lights flicker above. You're in a hospital gown that smells like disinfectant and regret. The last thing you ate came back up three hours ago. A sticky note on the wall says 'triage in progress' in dry erase marker, long since faded.",
      "Your number is 137. The board is on 22.",
      "The emergency room is a living purgatory. Neither heaven nor hell, but a place designed to make you question whether healing is worth this specific torment."
    ],
    choices: [
      { text: 'Demand pain relief.', nextId: 'demand_pain_relief' },
      { text: 'Try to clean yourself up.', nextId: 'clean_yourself' },
      { text: 'Hide in the bathroom.', nextId: 'hide_bathroom' },
      { text: 'Call your emergency contact.', nextId: 'call_emergency_contact' },
      { text: 'Try to talk to a doctor.', nextId: 'talk_to_doctor' },
      { text: 'GO NUCLEAR: Post a TikTok right now.', nextId: 'er_tiktok' },
    ],
    resources: [
      {
        title: "Understanding ER Triage",
        url: "https://www.verywellhealth.com/emergency-room-triage-2615114"
      },
      {
        title: "ER Survival Guide",
        items: [
          "What to bring to the ER",
          "How to advocate for yourself",
          "Understanding wait times",
          "When to seek emergency care",
          "Managing anxiety in the ER"
        ]
      },
      {
        title: "Pain Management Resources",
        items: [
          "How to describe your pain effectively",
          "Understanding pain medications",
          "Alternative pain management techniques",
          "Patient rights regarding pain treatment"
        ]
      },
      {
        title: "Emergency Contact Planning",
        url: "https://www.healthline.com/health/emergency-contact"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
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
      { text: 'Consider documenting this.', nextId: 'tiktok_moment_confront' },
      { text: 'GO NUCLEAR: You\'ve had enough.', nextId: 'nuclear_mode' }
    ],
    resources: [
      {
        title: "Patient Bill of Rights",
        url: "https://www.healthline.com/health/patient-bill-of-rights"
      },
      {
        title: "Effective Communication with Healthcare Providers",
        url: "https://www.verywellhealth.com/how-to-talk-to-your-doctor-2615484"
      },
      {
        title: "Chronic Illness Support Groups",
        items: [
          "Facebook: Chronic Illness Support Network",
          "TikTok: #ChronicIllnessWarriors",
          "YouTube: Chronic Illness Support Channel",
          "Reddit: r/ChronicIllness"
        ]
      },
      {
        title: "Workplace Rights and Chronic Illness",
        items: [
          "Understanding FMLA and ADA protections",
          "How to document medical absences",
          "Communicating with HR about chronic illness",
          "Requesting reasonable accommodations"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  waiting_game: {
    id: 'waiting_game',
    text: [
        "You lie there, ignored. The clock ticks slowly, each minute an agony. You try crocheting to distract yourself from the pain and the indifference.",
        "Hours pass. Nobody seems to notice or care about your suffering."
    ],
    choices: [
      { text: 'Continue waiting in silent agony.', nextId: 'triage_takes_hours' },
      { text: 'Consider documenting this.', nextId: 'tiktok_moment_wait' },
      { text: 'GO NUCLEAR: You\'ve had enough.', nextId: 'nuclear_mode' }
    ],
    resources: [
      {
        title: "Understanding ER Wait Times",
        url: "https://www.healthline.com/health/emergency-room-wait-times"
      },
      {
        title: "Coping with Long Waits",
        items: [
          "Managing anxiety during waits",
          "Preparing for long hospital stays",
          "Understanding triage systems",
          "When to speak up about wait times"
        ]
      },
      {
        title: "Patient Rights During Waiting",
        items: [
          "Your right to timely care",
          "How to check your status",
          "When to request updates",
          "Understanding wait time policies"
        ]
      },
      {
        title: "Hospital Wait Time Advocacy",
        url: "https://www.verywellhealth.com/hospital-wait-time-advocacy-2615490"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
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
    ],
    resources: [
      {
        title: "How to Escalate Patient Concerns",
        url: "https://www.verywellhealth.com/how-to-escalate-patient-concerns-2615485"
      },
      {
        title: "Patient Advocacy Resources",
        items: [
          "How to request a patient advocate",
          "Understanding hospital hierarchy",
          "Documenting your concerns",
          "When to involve hospital administration"
        ]
      },
      {
        title: "Effective Communication in Healthcare",
        items: [
          "How to be assertive without being aggressive",
          "Documenting conversations with staff",
          "Understanding your rights as a patient",
          "When to request a different provider"
        ]
      },
      {
        title: "Hospital Complaint Process",
        url: "https://www.healthline.com/health/hospital-complaint-process"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
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
    ],
    resources: [
      {
        title: "Understanding Your Discharge Papers",
        url: "https://www.healthline.com/health/hospital-discharge-papers"
      },
      {
        title: "Next Steps After ER Discharge",
        items: [
          "How to follow up with your primary care doctor",
          "Understanding your discharge diagnosis",
          "When to seek a second opinion",
          "How to request your medical records"
        ]
      },
      {
        title: "Coping with Medical Trauma",
        items: [
          "Processing feelings of dismissal",
          "Finding support after medical trauma",
          "Self-care after difficult medical experiences",
          "When to seek mental health support"
        ]
      },
      {
        title: "Patient Rights After Discharge",
        url: "https://www.verywellhealth.com/patient-rights-after-discharge-2615486"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
   ask_about_xray: {
    id: 'ask_about_xray',
    text: [
        "'Will this X-ray even show what's wrong?' you ask the tech, trying to keep the exhaustion out of your voice.",
        "The tech shrugs noncommittally. 'It gives the doctors a picture. Sometimes it helps.'",
        "You're wheeled back, the non-answer echoing the lack of care you've felt all along. The notes say 'excessive gas and diarrhea' - as if that's news to you. The very symptoms you've been describing for hours.",
        "The ChatGPT analysis of your radiology report haunts you: 'WHAT THE HELL ARE THEY EVEN LOOKING FOR? THIS IS LIKE MEDICAL BINGO WITH A SHOTGUN.'"
    ],
    choices: [
       { text: 'Keep waiting, hoping for more tests.', nextId: 'glimmer_of_hope' },
       { text: 'Document the frustration.', nextId: 'tiktok_moment_xray' }
    ],
    resources: [
      {
        title: "Understanding Medical Imaging",
        url: "https://www.healthline.com/health/medical-imaging"
      },
      {
        title: "Patient Rights During Tests",
        items: [
          "Your right to ask questions",
          "Understanding test purposes",
          "How to request test results",
          "When to question test necessity"
        ]
      },
      {
        title: "Medical Test Documentation",
        items: [
          "What to record and what to avoid",
          "Understanding HIPAA regulations",
          "Protecting your medical privacy",
          "Sharing experiences responsibly"
        ]
      },
      {
        title: "Online Patient Communities",
        url: "https://www.verywellhealth.com/online-patient-communities-2615492"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
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
    ],
    resources: [
      {
        title: "Understanding Medical Tests",
        url: "https://www.healthline.com/health/medical-tests"
      },
      {
        title: "Coping with Medical Waiting",
        items: [
          "Managing anxiety during tests",
          "Preparing for multiple procedures",
          "Understanding test purposes",
          "Keeping track of test results"
        ]
      },
      {
        title: "Patient Rights During Testing",
        items: [
          "Your right to information",
          "Understanding test procedures",
          "How to request test results",
          "When to ask for explanations"
        ]
      },
      {
        title: "Medical Test Preparation",
        url: "https://www.verywellhealth.com/medical-test-preparation-2615488"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },

  // --- TikTok Branch --- (Can be reached from multiple points)
  tiktok_moment_confront: { 
    id: 'tiktok_moment_confront', 
    text: "The frustration is overwhelming. Maybe... maybe you should record this?", 
    choices: [ 
      { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} 
    ],
    resources: [
      {
        title: "Documenting Medical Experiences",
        url: "https://www.healthline.com/health/documenting-medical-experiences"
      },
      {
        title: "Patient Advocacy Through Social Media",
        items: [
          "How to share your story safely",
          "Protecting your privacy online",
          "Finding supportive communities",
          "Using social media for advocacy"
        ]
      },
      {
        title: "Medical Documentation Tips",
        items: [
          "What to record and what to avoid",
          "Understanding HIPAA regulations",
          "Protecting your medical privacy",
          "Sharing experiences responsibly"
        ]
      },
      {
        title: "Online Patient Communities",
        items: [
          "Best apps for chronic illness tracking",
          "How to create a symptom journal",
          "Tracking pain patterns and triggers",
          "Sharing your data with healthcare providers"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  tiktok_moment_wait: { 
    id: 'tiktok_moment_wait', 
    text: "Hours of waiting... this is ridiculous. Should you film this?", 
    choices: [ 
      { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} 
    ],
    resources: [
      {
        title: "Understanding ER Wait Times",
        url: "https://www.healthline.com/health/emergency-room-wait-times"
      },
      {
        title: "Coping with Long Waits",
        items: [
          "Managing anxiety during waits",
          "Preparing for long hospital stays",
          "Understanding triage systems",
          "When to speak up about wait times"
        ]
      },
      {
        title: "Patient Rights During Waiting",
        items: [
          "Your right to timely care",
          "How to check your status",
          "When to request updates",
          "Understanding wait time policies"
        ]
      },
      {
        title: "Hospital Wait Time Advocacy",
        url: "https://www.verywellhealth.com/hospital-wait-time-advocacy-2615490"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  tiktok_moment_escalate: { 
    id: 'tiktok_moment_escalate', 
    text: "Even after escalating, the neglect feels palpable. Maybe the world should see?", 
    choices: [ 
      { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} 
    ],
    resources: [
      {
        title: "Patient Advocacy Through Social Media",
        url: "https://www.healthline.com/health/patient-advocacy-social-media"
      },
      {
        title: "Documenting Medical Experiences",
        items: [
          "How to share your story safely",
          "Protecting your privacy online",
          "Finding supportive communities",
          "Using social media for advocacy"
        ]
      },
      {
        title: "Medical Documentation Tips",
        items: [
          "What to record and what to avoid",
          "Understanding HIPAA regulations",
          "Protecting your medical privacy",
          "Sharing experiences responsibly"
        ]
      },
      {
        title: "Online Patient Communities",
        items: [
          "Best apps for chronic illness tracking",
          "How to create a symptom journal",
          "Tracking pain patterns and triggers",
          "Sharing your data with healthcare providers"
        ]
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  tiktok_moment_xray: { 
    id: 'tiktok_moment_xray', 
    text: "Another useless test? This is prime material for documentation.", 
    choices: [ 
      { text: 'Pull out your phone.', nextId: 'tiktok_prompt'} 
    ],
    resources: [
      {
        title: "Understanding Medical Imaging",
        url: "https://www.healthline.com/health/medical-imaging"
      },
      {
        title: "Patient Rights During Tests",
        items: [
          "Your right to ask questions",
          "Understanding test purposes",
          "How to request test results",
          "When to question test necessity"
        ]
      },
      {
        title: "Medical Test Documentation",
        items: [
          "What to record and what to avoid",
          "Understanding HIPAA regulations",
          "Protecting your medical privacy",
          "Sharing experiences responsibly"
        ]
      },
      {
        title: "Online Patient Communities",
        url: "https://www.verywellhealth.com/online-patient-communities-2615492"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },

  tiktok_prompt: {
    id: 'tiktok_prompt',
    text: [
      "You pull out your phone, your hands shaking with a mix of pain and frustration. The camera app opens, and you take a deep breath.",
      "This could be your moment to share your story, to show the world what it's really like to be a patient in the ER with a chronic illness.",
      "But what should you say? How should you frame this? The choice is yours."
    ],
    choices: [
      { text: 'Record a raw, emotional moment.', nextId: 'raw_emotion' },
      { text: 'Make a darkly humorous post.', nextId: 'dark_humor' },
      { text: 'Create an educational video.', nextId: 'educational' },
      { text: 'Share your symptoms and pain level.', nextId: 'symptom_share' }
    ],
    resources: [
      {
        title: "Sharing Medical Experiences Online",
        url: "https://www.healthline.com/health/sharing-medical-experiences"
      },
      {
        title: "Social Media Advocacy",
        items: [
          "How to share your story safely",
          "Protecting your privacy online",
          "Finding supportive communities",
          "Using social media for advocacy"
        ]
      },
      {
        title: "Medical Documentation Tips",
        items: [
          "What to record and what to avoid",
          "Understanding HIPAA regulations",
          "Protecting your medical privacy",
          "Sharing experiences responsibly"
        ]
      },
      {
        title: "Online Patient Communities",
        items: [
          "Best apps for chronic illness tracking",
          "How to create a symptom journal",
          "Tracking pain patterns and triggers",
          "Sharing your data with healthcare providers"
        ]
      },
      {
        title: "Chronic Pain Communication",
        items: [
          "How to describe your pain effectively",
          "Understanding pain terminology",
          "Advocating for pain management",
          "Finding pain management specialists"
        ]
      },
      {
        title: "Patient Education Resources",
        url: "https://www.verywellhealth.com/patient-education-resources"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  nuclear_pain_demo: {
    id: 'nuclear_pain_demo',
    text: [
      "'You know what?' you say, your voice eerily calm. 'Let me demonstrate what this feels like.'",
      "You grab the resident's hand before he can pull away. 'Imagine someone is squeezing your intestines like they're making balloon animals. Now add burning. Now add spasms.'",
      "You're squeezing his hand with increasing pressure as you speak. His eyes widen.",
      `'Now imagine that lasting for hours. Days. With no certainty of when it will stop. While people ask you stupid questions like "Have you tried yoga?" and "Are you sure it's not just stress?"'`,
      "The resident attempts to extract his hand. You hold firm. Nearby nurses are watching with a mixture of concern and—is that respect?",
      "'Now imagine going through that while someone implies you're exaggerating or drug-seeking. While wearing a paper dress that shows your ass to everyone who walks by. THAT'S what an 8 feels like.'",
      "You release his hand. He flexes his fingers, looking at you with new understanding.",
      "'I'll... get you something for the pain,' he says, and for the first time, you believe him."
    ],
    choices: [
      { text: 'Thank him with dignity.', nextId: 'accept_treatment' },
      { text: 'Document this educational moment.', nextId: 'tiktok_prompt' }
    ],
    resources: [
      {
        title: "Understanding Chronic Pain",
        url: "https://www.healthline.com/health/chronic-pain"
      },
      {
        title: "Pain Communication Tools",
        items: [
          "How to describe pain effectively",
          "Understanding pain scales",
          "Advocating for pain management",
          "Finding pain specialists"
        ]
      },
      {
        title: "Patient Rights in Pain Management",
        items: [
          "Your right to pain relief",
          "Understanding pain management options",
          "How to request pain specialists",
          "Documenting pain experiences"
        ]
      },
      {
        title: "Chronic Pain Support",
        url: "https://www.verywellhealth.com/chronic-pain-support"
      }
    ],
    navigation: [
      { text: '🔁 Start this story over from the beginning', nextId: 'start' },
      { text: '🏠 Return to Main Menu to pick a different storyline', nextId: 'main_menu' }
    ]
  },
  
  clean_yourself: {
    id: 'clean_yourself',
    text: [
      "You decide to at least try to freshen up. You carefully unhook yourself from the IV pole, shuffling to the tiny bathroom attached to your Bay 3 space.",
      "The bathroom is filthy. Used paper towels overflow the bin. There's no soap. You look at yourself in the mirror - pale, with dark circles under your eyes. Your hair is stuck to your sweaty forehead.",
      "You splash some water on your face and try to smooth down your hair with wet hands. It's not much, but it's something. A small attempt to regain dignity."
    ],
    choices: [
      { text: 'Apologize and sit down.', nextId: 'apologize_sit_down' },
      { text: 'Complain about hygiene conditions.', nextId: 'complain_hygiene' },
      { text: 'Escape to the stairwell.', nextId: 'escape_stairwell' },
      { text: 'GO NUCLEAR: Make a scene about patient dignity.', nextId: 'nuclear_dignity' }
    ],
  },
  
  hide_bathroom: {
    id: 'hide_bathroom',
    text: [
      "You shut yourself in the tiny, grimy bathroom attached to your bay. It's hardly cleaner than a gas station restroom, but at least you're alone.",
      "You sit on the closed toilet lid, taking deep breaths. The fluorescent light buzzes annoyingly. Someone knocks and jiggles the handle. You pretend not to hear.",
      "Minutes pass. No one seems to be looking for you specifically. Your pain is still there, but the momentary escape from prying eyes and dismissive glances provides a strange comfort."
    ],
    choices: [
      { text: 'Pretend to faint.', nextId: 'pretend_faint' },
      { text: `Say you're praying.`, nextId: 'say_praying' },
      { text: 'Flush and run.', nextId: 'flush_run' },
      { text: 'GO NUCLEAR: Barricade yourself in.', nextId: 'nuclear_barricade' }
    ],
  },
  
  call_emergency_contact: {
    id: 'call_emergency_contact',
    text: [
      "You grab your phone. Battery: 3%.",
      "You call. It rings. Voicemail. You try again.",
      "Finally, someone picks up. It's your roommate. He's at brunch. There's laughter in the background. You beg for help.",
      "He says, 'Totally. I'll be there soon.' He won't.",
      "Phone dies. You stare at the black screen like it betrayed you."
    ],
    choices: [
      { text: 'Ask the front desk to charge your phone.', nextId: 'charge_phone' },
      { text: 'Cry.', nextId: 'cry_waiting' },
      { text: 'Try to befriend the person next to you.', nextId: 'befriend_neighbor' },
      { text: 'GO NUCLEAR: Start calling out staff members.', nextId: 'nuclear_callout' },
    ],
  },
  
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
  
  talk_to_doctor: {
    id: 'talk_to_doctor',
    text: [
      "You spot a white coat. You shuffle toward it.",
      "The doctor barely looks up from their tablet.",
      "'Oh, you're still here? Hmm. Vitals stable. Labs... pending.'",
      "They walk away mid-sentence, muttering about lunch.",
      "You've been ghosted harder than your last Tinder date."
    ],
    choices: [
      { text: 'Shout "I\'m crashing!" and see what happens.', nextId: 'shout_crashing' },
      { text: 'Find a nurse who actually listens.', nextId: 'find_nurse' },
      { text: 'Write your symptoms on your body with a Sharpie.', nextId: 'sharpie_symptoms' },
      { text: 'GO NUCLEAR: Follow them to lunch.', nextId: 'nuclear_follow' },
    ],
  },
  
  er_tiktok: {
    id: 'er_tiktok',
    tiktokEmbed: `"Hey besties, today's adventure: getting gaslit in the ER 💅✨. Watch me go from 10/10 pain to 10/10 ignored. #MedicalMystery #ChronicMakeover #WhereAreMyLabs"`,
    text: [
      "You film yourself from the hallway gurney with a Cocomelon filter over your face, keeping your voice just low enough to avoid immediate detection.",
      "You hit post before you can second-guess yourself. What's the worst that could happen? They'll ignore you harder?",
      "Within minutes, it gets 30k views. A med student walks by and whispers, 'I saw your TikTok… you're kind of a legend.'",
      "Your phone starts vibrating with notifications. The comments section is exploding:",
      "\"I'm literally in the ER too and felt this in my SOUL\" / \"The Cocomelon filter is SENDING ME\" / \"Nurses on TikTok here - ask for the charge nurse and mention patient advocacy\" / \"They gave me Tums for internal bleeding\" / \"Same.\" / \"I laughed so hard I aspirated my Ensure.\" / \"My doctor said it was anxiety until I needed emergency surgery\" / \"The way you whisper-screamed 'WHERE ARE MY LABS' is my new ringtone\" / \"Can you do a hospital room tour next? I want to see the luxury accommodations\"",
      "You notice a few staff members glancing your way. Did someone recognize you? The post has 100k views now. You're trending in the medical community."
    ],
    choices: [
      { text: 'Make a follow-up TikTok.', nextId: 'tiktok_followup' },
      { text: 'Take down the video.', nextId: 'delete_tiktok' },
      { text: 'Use your new fame to demand care.', nextId: 'leverage_tiktok' },
    ],
  },

  // More branches for the ER options
  
  apologize_sit_down: {
    id: 'apologize_sit_down',
    text: [
      "You mumble an apology and shuffle back to your assigned waiting area, feeling the weight of defeat with each step.",
      "The security guard hovers until you're seated, as if you might make a break for the hand sanitizer dispenser.",
      "'Just trying to clean up,' you explain to no one in particular.",
      "Another hour passes. Your name isn't called. The vomit on your gown has dried completely now, a crusty reminder of your ongoing indignity.",
      "The waiting continues."
    ],
    choices: [
      { text: 'Return to waiting silently.', nextId: 'waiting_game' },
      { text: 'Try a different approach.', nextId: 'er_arrival_expanded' },
    ],
  },
  
  complain_hygiene: {
    id: 'complain_hygiene',
    text: [
      "'Excuse me,' you say to the security guard, summoning your most reasonable tone, 'I was just trying to clean myself up because there's vomit on my gown and blood on my arm.'",
      "You gesture to the bathroom. 'There's no soap. The paper towel machine is empty. Isn't that a hygiene concern in a hospital?'",
      "The guard looks uncomfortable. A nearby nurse pauses her charting.",
      "'We're very busy today,' the nurse says flatly.",
      "'Too busy for soap?' you counter.",
      "The silence that follows speaks volumes."
    ],
    choices: [
      { text: 'Press the issue: Ask for a clean gown.', nextId: 'press_hygiene_issue' },
      { text: 'Back down and return to waiting.', nextId: 'waiting_game' },
      { text: 'GO NUCLEAR: Loudly discuss infection control.', nextId: 'nuclear_infection' },
    ],
  },
  
  press_hygiene_issue: {
    id: 'press_hygiene_issue',
    text: [
      "'I understand you're busy, but I've been sitting in my own vomit for hours. Could I please have a clean gown?' Your voice is polite but firm.",
      "The nurse and security guard exchange glances. There's a long, awkward pause.",
      "'I'll see what I can do,' the nurse finally says, disappearing through double doors.",
      "Ten minutes later, she returns with a clean gown. It's paper-thin and has a tear along one side, but it's clean.",
      "'The bathroom's still out of soap,' you mention as she hands it to you.",
      "'Housekeeping has been notified,' she says without making eye contact. 'You can change in the bathroom. Leave the soiled gown in the bin.'"
    ],
    choices: [
      { text: 'Thank her and change.', nextId: 'small_victory' },
      { text: 'Push for more: Ask about soap again.', nextId: 'push_too_far' },
    ],
  },
  
  small_victory: {
    id: 'small_victory',
    text: [
      "You change into the clean gown, feeling marginally more human despite the persistent pain and nausea.",
      "It's a small victory, but in this environment, you'll take what you can get.",
      "You return to your spot in the waiting area. Other patients look at you with a mix of envy and respect. One gives you a subtle thumbs up.",
      "The wait continues, but at least you're not sitting in your own bodily fluids anymore.",
      "An hour later, your name is finally called."
    ],
    choices: [
      { text: 'Finally get some actual medical attention.', nextId: 'glimmer_of_hope' },
    ],
  },
  
  push_too_far: {
    id: 'push_too_far',
    text: [
      "'What about the soap situation?' you ask as the nurse turns to leave. 'How am I supposed to properly clean up without soap?'",
      "Her expression hardens. 'Like I said, housekeeping has been notified.'",
      "'But—'",
      "'Ma'am, we have multiple traumas coming in. I need you to change quickly and return to the waiting area.'",
      "You realize you've pushed too far. The temporary goodwill you'd earned evaporates.",
      "You change into the clean gown, but when you return, you notice your name has mysteriously moved further down the electronic waiting list."
    ],
    choices: [
      { text: 'Accept defeat and keep waiting.', nextId: 'waiting_game' },
      { text: 'GO NUCLEAR: This is the last straw.', nextId: 'nuclear_mode' },
    ],
  },
  
  nuclear_infection: {
    id: 'nuclear_infection',
    text: [
      "Something within you snaps. Years of patient safety videos and WebMD articles crystallize into righteous fury.",
      "'INTERESTING THAT A HOSPITAL DOESN'T HAVE BASIC HYGIENE SUPPLIES DURING A GLOBAL PANDEMIC!' Your voice carries to every corner of the waiting room.",
      "'I WONDER WHAT THE HOSPITAL INFECTION CONTROL OFFICER WOULD THINK ABOUT NO SOAP IN THE BATHROOMS? OR THE HEALTH DEPARTMENT?'",
      "Heads turn. A child points at you. Someone starts recording on their phone.",
      "'DO YOU KNOW HOW MANY HOSPITAL-ACQUIRED INFECTIONS HAPPEN EVERY YEAR? I DO, BECAUSE I RESEARCHED IT WHILE WAITING FOR SIX HOURS TO BE SEEN!'",
      "Your impromptu infection control lecture has drawn quite an audience. The security guard is speaking urgently into his radio. The nurse has disappeared."
    ],
    choices: [
      { text: 'Continue your public health service announcement.', nextId: 'nuclear_infection_continued' },
      { text: 'Make specific demands.', nextId: 'nuclear_infection_demands' },
    ],
  },
  
  nuclear_infection_continued: {
    id: 'nuclear_infection_continued',
    text: [
      "You're on a roll now, pacing despite your pain, your hospital gown flapping dangerously in the back.",
      "'DID YOU KNOW THAT C. DIFF CAN SURVIVE ON SURFACES FOR MONTHS? AND MRSA? DON'T EVEN GET ME STARTED ON MRSA!'",
      "Other patients are nodding. Someone whispers, 'Preach!'",
      "'I'VE BEEN SITTING IN BODILY FLUIDS FOR HOURS! IS THAT YOUR STANDARD OF CARE? BECAUSE I'M PRETTY SURE THE JOINT COMMISSION WOULD HAVE SOME THOUGHTS!'",
      "An administrator appears, attempting to de-escalate. 'Ma'am, if you could just lower your voice—'",
      "'I WILL LOWER MY VOICE WHEN YOU RAISE YOUR STANDARDS! FLORENCE NIGHTINGALE IS ROLLING IN HER GRAVE!'"
    ],
    choices: [
      { text: 'Make your demands clear.', nextId: 'nuclear_infection_demands' },
    ],
  },
  
  nuclear_infection_demands: {
    id: 'nuclear_infection_demands',
    text: [
      "You take a deep breath, focusing your energy like a laser.",
      "'Here's what's going to happen,' you say, your voice now controlled but no less intense. 'I need a clean gown. I need the bathroom restocked with soap and paper towels. And I need someone to actually look at my chart within the next twenty minutes.'",
      "You lock eyes with the administrator. 'Otherwise, I'll be happy to discuss infection control protocols with every patient in this waiting room while we tag the health department on social media. Together.'",
      "The administrator forces a tight smile. 'Let me see what I can do.'",
      "Fifteen minutes later, you have a clean gown. The bathroom has soap. And a physician's assistant appears, chart in hand, ready to actually listen.",
      "Several patients give you subtle thumbs-ups as you're finally led to an exam room. One mouths 'thank you.'"
    ],
    choices: [
      { text: 'Finally get some actual medical attention.', nextId: 'glimmer_of_hope' },
      { text: 'Document your advocacy victory.', nextId: 'tiktok_prompt' },
    ],
  },
  
  escape_stairwell: {
    id: 'escape_stairwell',
    text: [
      "You make a split-second decision, ducking past the security guard and pushing through the door marked 'STAIRWELL - STAFF ONLY.'",
      "The heavy door locks behind you. The stairwell is eerily quiet after the cacophony of the ER. You lean against the wall, breathing hard, pain still radiating through your abdomen.",
      "You climb one flight, then another, not sure what your plan is. On the third floor, you find an unlocked door and slip through.",
      "You've emerged in... labor and delivery? Nurses in colorful scrubs look up in surprise. A pregnant woman in a wheelchair gives you a once-over.",
      "'Are you supposed to be here?' a nurse asks gently.",
      "You realize how you must look—disheveled, in a soiled emergency gown, clearly not in labor unless it's with the alien from 'Alien.'"
    ],
    choices: [
      { text: 'Confess and ask for help.', nextId: 'confess_l_and_d' },
      { text: `Pretend you're delivering a message.`, nextId: 'fake_message' },
      { text: 'Run for it again.', nextId: 'run_again' },
    ],
  },
  
  confess_l_and_d: {
    id: 'confess_l_and_d',
    text: [
      "'I escaped from the ER,' you admit, close to tears. 'I've been waiting for hours. I'm in so much pain and no one will help me.'",
      "The L&D nurses exchange glances. One of them—her badge says 'Maria'—steps forward.",
      "'Honey, you shouldn't be up here, but...' She hesitates, then makes a decision. 'Let's get you cleaned up at least.'",
      "To your amazement, Maria leads you to a staff bathroom. She finds you a clean gown. Another nurse brings you water and—miracle of miracles—graham crackers.",
      "'We can't treat you up here,' Maria explains gently. 'But I'll call down to the ER, speak to the charge nurse. Tell her you need to be seen.'",
      "You've found unexpected allies in enemy territory."
    ],
    choices: [
      { text: 'Thank them and return to the ER with Maria\'s help.', nextId: 'return_with_ally' },
      { text: 'Ask if you can just stay in L&D forever.', nextId: 'stay_l_and_d' },
    ],
  },
  
  pretend_faint: {
    id: 'pretend_faint',
    text: [
      "You take a deep breath, channel your high school drama class, and let out a weak 'Help... I think I'm...' before making a controlled collapse onto the bathroom floor.",
      "The banging intensifies. 'We're coming in!'",
      "The door bursts open. Two nurses and a security guard find you sprawled dramatically on the tile.",
      "'Patient down in bathroom!' someone calls out.",
      "Suddenly, you have the staff's full attention. They check your pulse, your pupils. Someone brings a gurney.",
      "You maintain your semi-conscious act as they wheel you not back to the waiting room, but to an actual treatment bay.",
      "It's not the most dignified way to get care, but it worked."
    ],
    choices: [
      { text: 'Gradually "regain consciousness" and explain your symptoms.', nextId: 'explain_symptoms' },
      { text: 'Take the deception further by faking confusion.', nextId: 'fake_confusion' },
      { text: 'Come clean about your bathroom escape plan.', nextId: 'confess_faking' },
    ],
  },
  
  say_praying: {
    id: 'say_praying',
    text: [
      "'I'm praying!' you call out, your voice trembling just enough to sell it. 'Please, I just need a moment with God.'",
      "There's an awkward pause on the other side of the door.",
      "'Oh... um, sorry,' comes the response. 'Just checking if you're okay.'",
      "'God is helping me endure this trial,' you improvise, throwing in a sniff for good measure.",
      "Footsteps shuffle away. You've bought yourself more time in your porcelain sanctuary.",
      "You close your eyes and actually do send up a desperate prayer—that someone will take your pain seriously, that you'll get answers, that you won't spend another night crying on your bathroom floor at home."
    ],
    choices: [
      { text: 'Use your sanctuary time to regroup.', nextId: 'bathroom_regroup' },
      { text: 'Actually pray for strength.', nextId: 'actually_pray' },
      { text: 'Decide it\'s time to go back out.', nextId: 'return_from_bathroom' },
    ],
  },
  
  flush_run: {
    id: 'flush_run',
    text: [
      "You flush the toilet for verisimilitude, open the door with determination, and make your great escape.",
      "'Sorry,' you mutter to the waiting staff member as you push past.",
      "But where to go? The ER is a maze of curtained areas and mysterious doors. You power-walk past the nurses' station, trying to look like you know exactly where you're going.",
      "You turn a corner and nearly collide with a doctor who's typing on a mobile workstation.",
      "'Whoa there,' he says, looking up. He actually sees you. Really looks at you. 'Are you okay?'",
      "The unexpected human connection breaks something inside you. Tears well up."
    ],
    choices: [
      { text: 'Seize the opportunity to explain your situation.', nextId: 'explain_to_doctor' },
      { text: 'Apologize and try to escape elsewhere.', nextId: 'apologize_escape' },
      { text: 'Break down completely.', nextId: 'complete_breakdown' },
    ],
  },
  
  nuclear_barricade: {
    id: 'nuclear_barricade',
    text: [
      "'I'M NOT COMING OUT!' you shout, bracing yourself against the door. 'I'VE BEEN WAITING FOR HOURS, AND THIS IS THE ONLY PLACE I'VE BEEN TREATED WITH DIGNITY—BY BEING LEFT ALONE!'",
      "You can hear radio chatter outside. Someone says 'Code Grey.' You've officially become an incident.",
      "'YOU CAN PRY THIS TOILET SEAT FROM MY COLD, DEAD HANDS! AT LEAST IN HERE, I'M NOT BEING IGNORED IN PUBLIC!'",
      "You grab paper towels and start stuffing them under the door, creating a makeshift barrier. You're fully committed to your fortress of solitude now.",
      "'I HAVE WATER! I HAVE TOILET PAPER! I CAN STAY HERE UNTIL MEDICARE FOR ALL PASSES!'"
    ],
    choices: [
      { text: 'Start listing your demands through the door.', nextId: 'bathroom_demands' },
      { text: 'Take your protest online.', nextId: 'bathroom_tiktok' },
    ],
  },

  bathroom_tiktok: {
    id: 'bathroom_tiktok',
    tiktokEmbed: `"Day 1 of my peaceful bathroom protest. They can't ignore me if I'm trending! #MedicalBarricade #BathroomSitIn #ChronicIllnessWarrior"`,
    text: [
      "You film a whispered TikTok from your bathroom sanctuary, showing off your barricade and explaining your one-person protest against medical neglect.",
      "'This is what happens when you ignore patients for hours,' you whisper dramatically. 'Sometimes, we take matters into our own hands... and those hands are holding this bathroom door shut.'",
      "You add trending hashtags and hit post. Outside, you can hear more staff gathering. Someone mentions a psychiatric consult.",
      "Your video immediately starts gaining views. Comments flood in:",
      "\"OMG QUEEN 👑\" / \"This is the most iconic protest since Occupy Wall Street\" / \"I'm a nurse and I'm secretly rooting for you\" / \"Please stay safe though seriously\" / \"They gave me Tums for internal bleeding\" / \"Same.\" / \"I laughed so hard I aspirated my Ensure.\" / \"Bathroom protest > waiting room neglect\" / \"You're braver than the marines\" / \"Documenting this historical moment for when they teach about patient rights in the future\" / \"Can you barricade yourself in my hospital bathroom next? The staff here needs this energy\"",
      "Your protest has struck a chord. You're viral in real-time, with viewers demanding updates on your bathroom revolution."
    ],
    choices: [
      { text: 'Negotiate your surrender on your own terms.', nextId: 'negotiate_surrender' },
      { text: 'Double down with a bathroom concert.', nextId: 'bathroom_concert' },
    ],
  },
  
  leverage_tiktok: {
    id: 'leverage_tiktok',
    text: [
      "You walk up to the front desk, phone in hand, TikTok open to your viral video that now has 250k views and counting.",
      "'Excuse me,' you say pleasantly. 'I don't want to be difficult, but my TikTok about my experience here today is going viral. I'd really love to make a positive follow-up about how things turned around.'",
      "The receptionist's eyes widen as they look at your view count.",
      "'Let me get the charge nurse,' they say quickly.",
      "The charge nurse appears with unprecedented speed. Her smile is tight but professional as she glances at your phone.",
      "'Let's get you taken care of right away,' she says. 'Social media can paint an incomplete picture of the challenges we face.'",
      "Translation: Please don't make us look worse than we already do."
    ],
    choices: [
      { text: 'Accept the special treatment graciously.', nextId: 'gracious_victory' },
      { text: `Mention you're considering a YouTube documentary next.`, nextId: 'threaten_youtube' },
    ],
  },
  
  // Bridge back to main storyline
  return_with_ally: {
    id: 'return_with_ally',
    text: [
      "You return to the ER with Maria, the L&D nurse, who speaks quietly but firmly to the charge nurse. The difference in how you're treated is immediate and striking.",
      "'We'll get her into a bed right away,' the ER charge nurse says, not meeting Maria's eyes.",
      "Maria squeezes your hand before returning to her floor. 'Don't let them ignore you again,' she whispers.",
      "The solidarity of one healthcare worker has done what hours of waiting couldn't. You're finally being taken seriously."
    ],
    choices: [
      { text: 'Proceed with actual medical care.', nextId: 'glimmer_of_hope' },
    ],
  },
  
  explain_to_doctor: {
    id: 'explain_to_doctor',
    text: [
      "Through tears, you explain your situation—the hours of waiting, the pain, the dismissals, the bathroom escape plan.",
      "The doctor listens, actually listens, without typing or looking at a chart.",
      "'That shouldn't have happened,' he says simply. 'Let me see what I can do.'",
      "He walks you to a treatment area himself, speaking quietly to a nurse. Within minutes, you have an IV started by someone who finds your vein on the first try.",
      "Sometimes, in the medical lottery, you finally draw a human being instead of a protocol."
    ],
    choices: [
      { text: 'Finally receive proper assessment.', nextId: 'glimmer_of_hope' },
    ],
  },

  bathroom_tiktok_goes_viral: {
    id: 'bathroom_tiktok_goes_viral',
    text: [
      "Your bathroom protest video hits 5 million views in under an hour. #MedicalBarricade becomes the top trending hashtag globally.",
      "A nurse supervisor appears outside the door. 'We understand you're frustrated, but there are legal and safety concerns here. What can we do to help you come out?'",
      "The tone is different now. Respectful. You've become a PR nightmare for them in real-time, and they know it."
    ],
    choices: [
      { text: 'Accept the special treatment graciously.', nextId: 'gracious_victory' },
      { text: `Mention you're considering a YouTube documentary next.`, nextId: 'threaten_youtube' },
    ],
  },

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
      "'Thank you,' you say simply. 'I just want to be taken seriously. I'm tired of being treated like a drug addict every time I walk into a hospital.'",
      "The tone shifts. There's a hint of genuine remorse from the staff as they escort you to an actual treatment room. Your vitals are taken properly. Someone offers you a warm blanket.",
      "A doctor appears with surprising speed, actually listening as you explain your symptoms. Tests are ordered. Pain medication is discussed without skepticism.",
      "You wonder about all the patients still waiting who don't have the leverage of viral fame. But for now, you focus on your own care, finally receiving the attention you've desperately needed."
    ],
    choices: [
      { text: 'Proceed with proper medical assessment.', nextId: 'glimmer_of_hope' },
    ],
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