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
      "They try and fail to find a vein. You tell them it's always like this, that you need ultrasound guidance, but they insist. Eventually, they give up and jab you with an intramuscular injection of fentanyl. It hits bone. You scream. The bruising is immediate and deep. You won't be able to lift your arm high enough to put on a shirt for a month."
    ],
    choices: [
      { text: 'Continue to the ER in the ambulance.', nextId: 'er_arrival_expanded' },
      { text: 'Escape the ambulance and go back home.', nextId: 'escape_ambulance' },
    ],
  },
  
  escape_ambulance: {
    id: 'escape_ambulance',
    text: [
      "Somewhere between the botched injection and the paramedic asking if you're 'sure it's not just period cramps,' you decide that medical transportation is not for you today.",
      "'Pull over!' you demand, with the authority of someone who's been in pain long enough to no longer care about social norms.",
      "The paramedic looks concerned. 'Ma'am, you really shouldn't—'",
      "'PULL. OVER.' You're channeling your inner action movie hero now. The ambulance reluctantly stops.",
      "You slide off the gurney like a dignified jellyfish, flop onto the sidewalk, and begin your heroic crawl back to your apartment, three miles away. The paramedics watch in a mixture of horror and reluctant respect.",
      "Forty-five minutes later, you're dragging yourself up the stairs using only your eyebrows and sheer spite. Your cat judges you from the landing. Your partner is still on the phone arguing with your insurance about pre-authorizations.",
      "You make it to the bathroom, collapse majestically on the tile floor, and think, 'At least here, when I'm ignored, I don't have to pay a co-pay for the privilege.'"
    ],
    choices: [
      { text: 'Reconsider and call an Uber to the ER.', nextId: 'er_arrival_expanded' },
      { text: 'Stay home and suffer in comfort.', nextId: 'home_suffering' },
    ],
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
      { text: 'Document your suffering.', nextId: 'home_tiktok' },
    ],
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
      { text: 'Stay home and become a full-time chronic illness influencer.', nextId: 'influencer_ending' },
    ],
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
      { text: 'Go nuclear: Post a TikTok right now.', nextId: 'er_tiktok' },
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
      { text: 'Consider documenting this.', nextId: 'tiktok_moment_confront' },
      { text: 'GO NUCLEAR: You\'ve had enough.', nextId: 'nuclear_mode' }
    ],
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
        "You're wheeled back, the non-answer echoing the lack of care you've felt all along. The notes say 'excessive gas and diarrhea' - as if that's news to you. The very symptoms you've been describing for hours.",
        "The ChatGPT analysis of your radiology report haunts you: 'WHAT THE HELL ARE THEY EVEN LOOKING FOR? THIS IS LIKE MEDICAL BINGO WITH A SHOTGUN.'"
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
          { text: `Film "I am Blanket".`, nextId: 'viral_hit_blanket'},
          { text: `Film "Medical Bingo".`, nextId: 'viral_hit_bingo'}
      ]
  },
  viral_hit_blanket: {
    id: 'viral_hit_blanket',
    tiktokEmbed: `"And this... is my blankie. My only friend in the hospital, who doesn't judge me when I poop myself. #IAmBlanket"`,
    text: [
      "Filmed lying in your ER bed, you hold up your crocheted blanket and do a deadpan voiceover for TikTok: \"And this... is my blankie. My only friend in the hospital, who doesn't judge me when I poop myself. #IAmBlanket\"",
      "The comments section explodes: \"Same.\" \"A blanket's better than these doctors.\" \"This video is my therapy.\" \"Can you make me one of those blankets though?\" \"I laughed so hard I aspirated my Ensure.\" \"They gave me Tums for internal bleeding.\" \"Your blanket has better bedside manner than my gastroenterologist.\" \"Is your blanket accepting new patients?\"",
      "The recognition is bittersweet validation. You post another. Then another, darker, funnier. Sock puppets reenacting your last blood draw. Lip-syncing Billie Eilish while holding a sign that says \"Guess how many days I've been NPO?\"",
      "Your social media following grows. You're seen. But reality bites: you still need the bathroom."
    ],
    choices: [
      { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' },
    ],
  },
    viral_hit_bingo: {
    id: 'viral_hit_bingo',
    tiktokEmbed: `"The doctors have no idea what's wrong, but here's their bingo card. Small bowel obstruction, maybe? Radiology says gas and diarrhea." You dramatically throw the chart.`,
    text: [
      "Filmed from your hospital bed, your TikTok shows you holding up a medical chart and sarcastically saying: \"The doctors have no idea what's wrong with me, but here's their bingo card. Small bowel obstruction, maybe? Radiology says gas and diarrhea.\" You dramatically throw the chart in the air like it's confetti.",
      "Comments pour in: \"Same.\" \"Maybe they'll find your missing kidney in one of those scans.\" \"They gave me Tums for internal bleeding.\" \"Someone should play Find the Vein next time.\" \"I laughed so hard I aspirated my Ensure.\" \"This is why I have medical PTSD.\" \"Is your doctor playing symptom Yahtzee or actually helping?\" \"Hospital Bingo needs to be an actual game.\"",
      "The recognition is bittersweet validation. You post another video, then another, each darker and funnier. Your follower count climbs as you document this surreal healthcare nightmare with increasing creativity.",
      "Your following grows. You're seen. But reality bites: you still need the bathroom."
    ],
    choices: [
      { text: 'Face the bathroom dilemma.', nextId: 'bathroom_dilemma' },
    ],
  },
   viral_hit_poop: {
    id: 'viral_hit_poop',
    tiktokEmbed: `After your MRI, you film a TikTok in the bathroom, holding up the emergency wet wipes packet like a trophy: "Guess who finally got the full hospital experience? I'm the first to shit AND get stuck in a machine. #EveryDayIsAnAdventure #ERChronicles"`,
    text: [
      "Later, after the MRI incident, you manage to film the 'I Pooped Myself Again' TikTok. You hold up the emergency wet wipes packet like it's an Olympic medal, your expression a perfect mix of pride and despair.",
      "Comments explode: \"Same.\" \"Hospital bingo: ✓ poop yourself ✓ get stuck in machine ✓ cry in bathroom.\" \"This is the most relatable content I've seen all year.\" \"The wet wipes packet as a trophy sent me.\" \"New fear unlocked.\" \"I laughed so hard I aspirated my Ensure.\" \"Still better care than I got with my appendix burst.\" \"At least they gave you wipes, I had to use the gown.\" \"That MRI tech deserves a 1-star Yelp review.\" \"Congratulations on achieving the hospital trifecta: humiliation, radiation, and constipation all in one day!\"",
      "You post another video from the bathroom floor, dramatically whispering about your escape plan. Each video gets more views than the last. One commenter writes: \"I'm here for the trilogy. When does the Netflix adaptation drop?\"",
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
    text: [
      "You desperately need to get to the bathroom again. The memory of the last incident - the shrieking alarm, the nurse yanking you back, soiling yourself, vomiting in your lap - is still fresh and traumatic.",
      "The humiliation of needing help versus the risk of setting off alarms and getting yelled at is paralyzing. But the pressure is building and you can't hold it much longer."
    ],
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

  // --- Add the Nuclear Mode scene ---
  nuclear_mode: {
    id: 'nuclear_mode',
    text: [
      "Something in you snaps. It's the straw that breaks the camel's already shattered back.",
      "You rise, surprising yourself with the sudden surge of adrenaline-fueled strength. Your voice cuts through the ambient noise of the ER like a scalpel."
    ],
    choices: [
      { text: 'Keep going: There\'s more where that came from.', nextId: 'nuclear_mode_escalation' },
      { text: 'Get creative: Start using medical metaphors.', nextId: 'nuclear_metaphors' },
      { text: 'Dial it back: You\'ve made your point.', nextId: 'nuclear_aftermath' }
    ],
  },
  
  nuclear_metaphors: {
    id: 'nuclear_metaphors',
    text: [
      "You decide to get creative with your outrage, channeling your inner medical poet.",
      "'MY DIGNITY HAS BEEN AMPUTATED WITHOUT ANESTHESIA! MY PATIENCE HAS FLAT-LINED! MY FAITH IN THE HEALTHCARE SYSTEM IS CODING AND NOBODY IS BRINGING THE DEFIBRILLATOR!'",
      "The staff is frozen, unsure how to respond to your medical metaphor meltdown. You're on a roll.",
      "'I'VE BEEN WAITING SO LONG MY CONDITION HAS METASTASIZED FROM 'UNCOMFORTABLE' TO 'DYING OF NEGLECT'! IS THIS WHAT THEY TEACH IN MEDICAL SCHOOL? TRIAGE BY WHOEVER SCREAMS THE LOUDEST?'",
      "A doctor peeks out from behind a curtain, then quickly retreats. A janitor walking by gives you an approving nod. He gets it."
    ],
    choices: [
      { text: 'Switch to dark humor.', nextId: 'nuclear_dark_humor' },
      { text: 'Document this epic meltdown.', nextId: 'nuclear_tiktok' },
      { text: 'Face the consequences.', nextId: 'nuclear_aftermath' }
    ]
  },
  
  nuclear_dark_humor: {
    id: 'nuclear_dark_humor',
    text: [
      "You pivot to gallows humor, your voice dripping with sarcasm.",
      "'YOU KNOW WHAT? DON'T WORRY ABOUT ME! I'LL JUST DIE RIGHT HERE AND SAVE YOU THE PAPERWORK! I'LL EVEN FILL OUT MY OWN TOE TAG TO SAVE TIME! CAUSE OF DEATH: WAITING FOR SOMEONE TO GIVE A SHIT!'",
      "You pull out your crocheting needle dramatically. 'I CAN START STITCHING MY OWN BODY BAG WHILE I WAIT! WHAT COLOR WOULD LOOK BEST WITH MY COMPLEXION? CORPSE BLUE? NEGLECT PURPLE?'",
      "A nurse walks by and mutters, 'We're doing our best.' You counter: 'IF THIS IS YOUR BEST, YOUR WORST MUST INVOLVE ACTUAL MURDER! IS THIS HOSPITAL OR HOSPICE?'",
      "Someone from the far end of the hall shouts, 'Preach it, sister!' The revolution is spreading."
    ],
    choices: [
      { text: 'Get even darker.', nextId: 'nuclear_absolute_darkness' },
      { text: 'Document this epic meltdown.', nextId: 'nuclear_tiktok' },
      { text: 'Face the consequences.', nextId: 'nuclear_aftermath' }
    ]
  },
  
  nuclear_absolute_darkness: {
    id: 'nuclear_absolute_darkness',
    text: [
      "You hit rock bottom, and then you start digging.",
      "'I'M GOING TO HAUNT THIS HOSPITAL WHEN I DIE! AND CONSIDERING YOUR WAIT TIMES, THAT'LL BE BEFORE I GET MY TEST RESULTS! I'LL BE THE GHOST THAT UNPLUGS THE COFFEE MACHINE AND HIDES THE GOOD PENS!'",
      "You're laughing now, but it's the kind of laugh that makes people back away slowly. 'I'M GOING TO START A YELP REVIEW SO SCATHING IT'LL MAKE GORDON RAMSAY LOOK LIKE MR. ROGERS! ONE STAR - GREAT PLACE IF YOU ENJOY PAIN, NEGLECT, AND FLUORESCENT LIGHTING THAT MAKES EVERYONE LOOK LIKE A CORPSE!'",
      "A security guard approaches cautiously but stops short when you turn your gaze on him. 'OH LOOK, NOW I'M A SECURITY THREAT! IS IT BECAUSE I'M BLEEDING, CRYING, OR JUST EXISTING INCONVENIENTLY?'",
      "Two other patients are now filming you. You've become hospital entertainment, a one-person show titled 'Woman On The Edge: The Musical, But Everyone's Too Busy To Hear You Sing.'"
    ],
    choices: [
      { text: 'Bow to your audience.', nextId: 'nuclear_tiktok_viral' },
      { text: 'Face the consequences.', nextId: 'nuclear_aftermath' }
    ]
  },
  
  nuclear_mode_escalation: {
    id: 'nuclear_mode_escalation',
    text: [
      "You're on a roll now, a one-person wrecking ball of righteous fury.",
      "'YOU KNOW WHAT? I'LL JUST DIAGNOSE MYSELF! WHO NEEDS EIGHT YEARS OF MEDICAL SCHOOL WHEN YOU CAN JUST GOOGLE 'WHY DOES MY STOMACH FEEL LIKE IT'S BEING USED AS A PIÑATA BY ANGRY BASEBALL PLAYERS?'",
      "You grab your crocheted blanket, waving it like a flag. 'I MADE THIS ENTIRE BLANKET WHILE WAITING FOR SOMEONE TO ACKNOWLEDGE THAT I EXIST. I COULD HAVE CROCHETED A WHOLE MEDICAL STAFF WHO ACTUALLY CARES AND SEVERAL ANATOMICALLY CORRECT ORGANS I'M APPARENTLY SUPPOSED TO JUST LIVE WITHOUT!'",
      "Security appears at the end of the hallway, but they seem reluctant to approach. A nearby patient whispers, 'Tell them about the vending machine that ate your dollar!' Another shouts, 'And the bathroom that looks like a crime scene!' You're gaining fans.",
      "'IF ANYONE NEEDS ME, I'LL BE IN THE PARKING LOT PERFORMING MY OWN APPENDECTOMY WITH A PLASTIC SPOON FROM THE CAFETERIA! AT LEAST I'LL BE ABLE TO SEE THE CERTIFICATE ON MY WALL THAT SAYS I GIVE A DAMN ABOUT MY PATIENTS!'"
    ],
    choices: [
      { text: 'Get even more creative.', nextId: 'nuclear_metaphors' },
      { text: 'Document this epic meltdown.', nextId: 'nuclear_tiktok' },
      { text: 'Face the consequences.', nextId: 'nuclear_aftermath' }
    ]
  },

  nuclear_tiktok: {
    id: 'nuclear_tiktok',
    tiktokEmbed: `"LIVE from the ER: Watch me lose my entire mind while security decides if I'm worth the paperwork. #ERMeltdown #ChronicIllnessLife"`,
    text: [
      "In a moment of clarity amidst the chaos, you pull out your phone and start recording.",
      "Your TikTok rant goes instantly viral. Comments flood in faster than you can read them:",
      "\"Same.\" \"I'm laughing so hard I aspirated my Ensure.\" \"This is the energy I needed for my next appointment.\" \"Someone get this woman a Netflix special!\" \"I'm showing this to my doctor next time they tell me it's 'just anxiety.'\" \"The way the nurse in the background is PANICKING.\" \"When you said 'First, ignore all harm' I felt that spiritually.\" \"Please sell merch with that line about Ikea furniture.\" \"My husband had to get the doctor because I'm now in the fetal position laughing so hard I'm crying and can't breathe.\"",
      "The nurses are glaring, but they're moving faster now. It's amazing how efficient people become when they're on camera and their incompetence is being broadcast to millions."
    ],
    choices: [
      { text: 'End your performance on a high note.', nextId: 'nuclear_aftermath' },
      { text: 'Double down for the followers.', nextId: 'nuclear_tiktok_viral' }
    ]
  },

  nuclear_tiktok_viral: {
    id: 'nuclear_tiktok_viral',
    tiktokEmbed: `"PART 2: Hospital Meltdown - Now with security! They're offering me a room now that I'm INTERNET FAMOUS. #MedicalGaslighting #VanityFair #MillionsOfViews"`,
    text: [
      "Your first TikTok hit 2 million views in an hour. You're officially viral, so you decide to give the people what they want.",
      "You film a sequel, hamming it up for the camera while continuing your rant. \"And THIS is where I've been sitting for four hours! Notice the lovely view of OTHER PEOPLE getting care! And THESE are my discharge papers they tried to give me before even checking my vitals!\"",
      "Comments are pouring in: \"Same.\" \"You're the healthcare hero we needed.\" \"This is my Roman Empire.\" \"The sequel is better than the original?!\" \"I'm making a cross-stitch of your quotes.\" \"My nurse just asked why I'm cry-laughing.\" \"POV: watching this from my own ER gurney.\" \"They gave me Tums for internal bleeding but this video healed me.\"",
      "A nurse supervisor appears, looking both irritated and alarmed. \"Ma'am, please stop filming. We can take you to a room now.\" You respond to the camera: \"WITNESS THE MIRACLE OF SOCIAL MEDIA, FOLKS! Suddenly there's a room available now that I have two million witnesses!\"",
      "As they wheel you away, you can hear other patients applauding. Your phone is blowing up with notifications. #HospitalHarriet and #ERQueen are trending. Buzzfeed has already reached out for an interview."
    ],
    choices: [
      { text: 'Take your victory lap.', nextId: 'nuclear_aftermath_celebrity' }
    ]
  },
  
  nuclear_aftermath: {
    id: 'nuclear_aftermath',
    text: [
      "The echo of your outburst hangs in the air. There's a strange, almost respectful silence in its wake.",
      "Suddenly, a doctor you haven't seen before appears. She looks tired but actually makes eye contact. 'I heard there was a situation. Let's get you into a room and figure out what's going on.'",
      "It shouldn't take a nuclear meltdown to receive basic care, but sometimes the squeaky wheel—or in your case, the air-raid siren—gets the grease.",
      "You're finally moved to a proper bed. The care isn't perfect, but there's a palpable shift. They're listening now. You've burned bridges, but at least you're no longer burning from neglect."
    ],
    choices: [
      { text: 'Proceed with tests.', nextId: 'glimmer_of_hope' }
    ]
  },
  
  nuclear_aftermath_celebrity: {
    id: 'nuclear_aftermath_celebrity',
    text: [
      "The fallout from your viral meltdown is surreal. You're whisked into a private room, where suddenly every specialist in the hospital finds time to consult on your case.",
      "Your phone won't stop buzzing. You've been contacted by three morning shows, two patient advocacy groups, and someone claiming to be from Netflix who wants to discuss \"a limited series about medical gaslighting.\"",
      "A hospital administrator appears, smiling nervously. \"We want you to know we take patient satisfaction very seriously...\" You resist the urge to ask why it took millions of views to be taken seriously.",
      "The care you receive is now meticulous, almost comically attentive. Every request is met with immediate action. You wonder how many others are still waiting in hallways, their suffering unfilmed and therefore invisible."
    ],
    choices: [
      { text: 'Use your new platform for good.', nextId: 'nuclear_advocacy' },
      { text: 'Focus on your own recovery for now.', nextId: 'glimmer_of_hope' }
    ]
  },
  
  nuclear_advocacy: {
    id: 'nuclear_advocacy',
    text: [
      "You decide to leverage your viral fame for something bigger than yourself. Between tests and treatments, you start posting about others in the hospital who aren't being heard.",
      "With permission, you share stories of the elderly woman who's been waiting 12 hours, the young man with chronic pain who keeps getting dismissed, the non-binary person whose charts keep getting misgendered.",
      "Your hashtag #TakeANumber becomes a movement. People around the country start documenting their ER waits, their dismissals, their struggles to be believed. Medical professionals join in, exposing the broken system from the inside.",
      "When you finally get discharged, you leave with more than just a vague diagnosis and a follow-up appointment. You leave with purpose—and a book deal about patient advocacy in a broken healthcare system."
    ],
    choices: [
      { text: 'But first, you need to get home...', nextId: 'uber_refusal' }
    ],
    // This will lead back to the main story path
  },

  // Add the new Triage Takes Hours scene
  triage_takes_hours: {
    id: 'triage_takes_hours',
    text: [
      "Triage takes hours. You crochet a queen-sized blanket while waiting for a hallway gurney. You're offered Tylenol, a lidocaine patch (for your stomach), and eye rolls. The pain is upper gastric spasms. The patch is for muscle pain. You tell them. They nod and hand you a psych eval form.",
      "Eventually, someone wheels you off for abdominal X-rays. Standing up is nearly impossible, but no one seems to care. You're hunched over in pain, clinging to the imaging table, and still get reprimanded for being dramatic. They're looking for a small bowel obstruction, even though your chart says you're on two daily bowel preps. The radiologist notes say \"excessive gas and diarrhea.\" You whisper, \"Idiots.\"",
      "Later, they wheel you to get another CT scan with contrast — your sixth in as many weeks. You do the mental math on the radiation. If the illness doesn't kill you, the scans might. You pull up the radiology report on your phone and feed it into ChatGPT. It swears: \"WHAT THE HELL ARE THEY EVEN LOOKING FOR? THIS IS LIKE MEDICAL BINGO WITH A SHOTGUN.\"",
      "You're wheeled back to the hallway. Still no room.",
      "You try to make it to the bathroom, but the bed alarm shrieks. A nurse yanks you back. You shit your pants and vomit into your lap. You ring the call button every two hours, begging for help. Each time, you're told, \"Your nurse will be there soon.\" They never are."
    ],
    choices: [
      { text: 'Ask about the X-ray results.', nextId: 'ask_about_xray' },
      { text: 'Try again desperately to reach the bathroom.', nextId: 'bathroom_dilemma' },
      { text: 'Document this nightmare.', nextId: 'tiktok_moment_triage' },
      { text: 'GO NUCLEAR: This is the last straw.', nextId: 'nuclear_mode' }
    ],
  },

  // Add a new TikTok entry point from the triage scene
  tiktok_moment_triage: { 
    id: 'tiktok_moment_triage', 
    text: "The combination of pain, humiliation, and neglect has reached a breaking point. Your phone is the only witness to your suffering.", 
    choices: [ 
      { text: 'Record this for posterity.', nextId: 'tiktok_prompt'} 
    ] 
  },

  // New ER branch options
  demand_pain_relief: {
    id: 'demand_pain_relief',
    text: [
      "You square your shoulders, ignore the dried vomit on your gown, and ask—politely, but firmly—for relief.",
      "The nurse gives you the Look. You know the one. She disappears behind the curtain.",
      "Thirty minutes later, a resident appears. He looks like he just crawled out of a textbook and smells faintly of Red Bull and hubris.",
      "'So, you're reporting… pain? Can you rate it from one to ten?'",
      "You try to answer, but he interrupts with, 'Hmm. Interesting.' He walks off.",
      "You are now labeled 'drug-seeking' in the system. Congrats. Your chart has been downgraded to a case study in suspicion."
    ],
    choices: [
      { text: 'Ask to speak to the attending.', nextId: 'speak_to_attending' },
      { text: 'Pull out your pain scale with emoji faces.', nextId: 'pain_scale_emojis' },
      { text: 'Say nothing and wait.', nextId: 'waiting_game' },
      { text: 'GO NUCLEAR: You\'ve had it with being labeled.', nextId: 'nuclear_mode' },
    ],
  },
  
  speak_to_attending: {
    id: 'speak_to_attending',
    text: [
      "You gather your strength and ask to speak with the attending physician. The resident's expression flickers between annoyance and panic.",
      "'The attending is very busy,' he says, voice tight. 'But I'll let them know you've... requested them.'",
      "Two hours pass. Your pain continues its relentless symphony. Finally, the attending appears—clearly irritated at being summoned.",
      "They speak exclusively to the resident, not to you. 'What's the issue here?' they ask, as if you're a particularly puzzling appliance malfunction.",
      "The resident mumbles something about 'pain management concerns' while giving a subtle eye roll that you're definitely not meant to see, but absolutely do.",
      "The attending nods sagely, then turns to you with a practiced smile. 'We'll get you something for the discomfort. But we need to be careful with narcotics.'"
    ],
    choices: [
      { text: 'Try to explain your medical history again.', nextId: 'explain_history' },
      { text: 'Accept whatever they offer.', nextId: 'accept_treatment' },
      { text: 'GO NUCLEAR: Time for a medical ethics lecture.', nextId: 'nuclear_attending' },
    ],
  },
  
  nuclear_attending: {
    id: 'nuclear_attending',
    text: [
      "'Discomfort?' Your voice starts low but quickly gains momentum like a medical school rejection letter avalanche.",
      "'DISCOMFORT is when your shoes pinch. DISCOMFORT is a scratchy tag in your shirt. This is PAIN. P-A-I-N. Did they skip that chapter in your prestigious medical education?'",
      "The attending blinks, clearly unused to patients who don't cower in reverence.",
      "'And while we're educating each other, let's talk about the difference between addiction, dependence, and BASIC HUMAN DIGNITY. Did you know that studies show pain patients are wildly under-medicated due to unfounded addiction fears? I have the journal citations if you'd like!'",
      "You're on a roll now, years of medical dismissal fueling your impromptu TED talk.",
      "'Let's discuss how untreated pain creates long-term nervous system changes! Or perhaps you'd prefer a quick primer on the discrepancy in pain management between genders and races? I've prepared a mental bibliography for just this occasion!'"
    ],
    choices: [
      { text: 'Continue your scholarly rant.', nextId: 'nuclear_attending_continued' },
      { text: 'End with a powerful conclusion.', nextId: 'nuclear_attending_conclusion' },
    ],
  },
  
  nuclear_attending_continued: {
    id: 'nuclear_attending_continued',
    text: [
      "The attending takes an instinctive step back as you hit your stride.",
      "'DID YOU KNOW that the very opioid guidelines you're hiding behind explicitly state they shouldn't be applied to acute pain situations? OR THAT those guidelines have been officially walked back by their own authors because of misapplication?'",
      "You're gesticulating wildly now, your hospital gown flapping dangerously. A small crowd has gathered—nurses, other patients, someone from the cafeteria who just came up to deliver lunch trays.",
      "'AND ANOTHER THING! The whole concept of pain as the fifth vital sign may have been flawed, but swinging the pendulum to 'just suffer' isn't evidence-based medicine, it's MEDIEVAL!'",
      "The attending looks like they're mentally calculating the fastest route to the exit. The resident is frantically typing something into the computer—probably adding 'delusional' to your growing list of unflattering chart notes."
    ],
    choices: [
      { text: 'Finish with dramatic flourish.', nextId: 'nuclear_attending_conclusion' },
    ],
  },
  
  nuclear_attending_conclusion: {
    id: 'nuclear_attending_conclusion',
    text: [
      "You take a deep breath, summoning dignity despite your paper gown and unwashed hair.",
      "'I'm not asking for a lifetime supply of narcotics. I'm asking for you to treat my pain seriously for the brief time I'm in your care. To treat ME seriously.'",
      "You lock eyes with the attending. 'If that's too much to ask, I'd like both your names and your medical license numbers for my formal complaint.'",
      "A stunned silence falls. Then, from the back of the assembled onlookers, someone starts slow-clapping. It's an elderly woman in a wheelchair who mutters, 'Preach it, honey.'",
      "Fifteen minutes later, you have pain medication, a real pillow instead of a rolled-up towel, and mysteriously, a turkey sandwich that nobody remembers ordering for you.",
      "The resident avoids eye contact when checking your vitals. The attending hasn't been seen since. Your chart now includes a new note: 'Patient is a strong self-advocate.'"
    ],
    choices: [
      { text: 'Rest more comfortably while you wait for test results.', nextId: 'glimmer_of_hope' },
      { text: 'Document your victory for posterity.', nextId: 'tiktok_prompt' },
    ],
  },
  
  pain_scale_emojis: {
    id: 'pain_scale_emojis',
    text: [
      "You reach into your bag and pull out a laminated pain scale you created after your eighth emergency room visit. It features emoji faces and devastatingly accurate descriptions.",
      "1-3: 'I notice it but can function.'",
      "4-6: 'I'm distracted and grimacing but can fake being okay in public.'",
      "7-8: 'I'm making involuntary noises and can't focus on anything else.'",
      "9: 'I'm seeing reality through a tunnel of agony and might be actively vomiting from pain.'",
      "10: 'I am no longer inhabiting my body. I have astral projected to escape this mortal form.'",
      "You tap pointedly at the 8-9 region. The resident looks both impressed and uncomfortable.",
      "'Did you... make this yourself?' he asks.",
      `'Yes,' you reply. 'Because apparently "on a scale from 1 to 10" doesn't mean the same thing to me as it does to people who think paper cuts and childbirth are comparable experiences.'`
    ],
    choices: [
      { text: 'Elaborate on your symptoms with clinical precision.', nextId: 'clinical_precision' },
      { text: 'Show him your symptom tracking app.', nextId: 'symptom_app' },
      { text: 'GO NUCLEAR: Offer to demonstrate your pain level.', nextId: 'nuclear_pain_demo' },
    ],
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
      { text: 'Document this educational moment.', nextId: 'tiktok_prompt' },
    ],
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