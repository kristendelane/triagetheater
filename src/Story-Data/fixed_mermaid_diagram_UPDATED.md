
---
config:
  layout: dagre
---
flowchart TD

  %% Define styles
  classDef startNode fill:#d4f1c5,stroke:#333,stroke-width:2px
  classDef decisionNode fill:#c5e1f1,stroke:#333,stroke-width:2px
  classDef endNode fill:#f1c5c5,stroke:#333,stroke-width:2px
  classDef eventNode fill:#f1e8c5,stroke:#333,stroke-width:1px

  %% Start Scene
  start["`🧨 Welcome to the ER<br>— Please Take a Number`"]:::startNode
  start --> intro_backstory["`📜 Backstory:<br>Medical gaslighting, toxic job, etc.`"]:::eventNode
  intro_backstory --> transport_choice["`🚗 How are we getting to the ER this time?`"]:::decisionNode

  %% Transport Choices
  transport_choice --> take_uber["`🛞 Call an Uber and<br>hope for the best`"]:::eventNode
  transport_choice --> partner_drive["`💔 Partner drives you<br>through his own agony`"]:::eventNode
  transport_choice --> ambulance_pressure["`🚑 Ambulance scare tactics:<br>'It'll cost $$$ either way'`"]:::eventNode
  transport_choice --> ambulance_refusal["`🚪 Refuse the ambulance<br>and hobble home medieval-style`"]:::eventNode
  ambulance_pressure --> bad_paramedics

  %% Paramedics arc — pure malpractice
  bad_paramedics["`🚑 Paramedics insist<br>you're 9 months pregnant`"]:::eventNode
  bad_paramedics --> im_injection["`💉 Too lazy for IV:<br>IM fentanyl into your bone`"]:::eventNode
  im_injection --> rorschach_arm["`🖐️ Bruises like a<br>Rorschach inkblot test`"]:::eventNode
  rorschach_arm --> er_arrival_expanded

  %% Initial ER Entry Alternatives (still valid paths)
  take_uber --> er_arrival_expanded
  partner_drive --> er_arrival_expanded

  %% Expanded Storyline
  er_arrival_expanded["`🚑 Let the Sadist Squad<br>roll you into the ER`"]:::eventNode
  er_arrival_expanded --> triage_theater["`⏳ Triage Theater:<br>12hr wait + 0 dignity`"]:::eventNode
  triage_theater --> go_nuclear["`🧨 Go Nuclear`"]:::decisionNode
  triage_theater --> waiting_game["`😐 Wait quietly,<br>still dying`"]:::decisionNode
  triage_theater --> document_abuse["`📱 TikTok the chaos`"]:::decisionNode
  triage_theater --> meet_gladys["`🧓 Talk to Gladys,<br>waiting longer than you`"]:::eventNode
  triage_theater --> early_confrontation["`📢 Advocate politely<br>for yourself`"]:::eventNode
  early_confrontation --> scripted_advocacy["`🗣️ Try a Scripted Advocacy Approach`"]:::decisionNode
  scripted_advocacy --> symptom_log["`📱 Show symptom log app`"]
  scripted_advocacy --> panic_explain["`😶 Panic and start overexplaining everything`"]

  document_abuse --> tiktok_ending["`📈 TikTok goes viral:<br>#MedicalGaslight`"]:::eventNode
  tiktok_ending --> cat_therapy_post["`🐈 Zayka zoomies onto your stomach`"]:::eventNode
  cat_therapy_post --> cat_takeover["`🐾 Let the cats take over your account`"]
  cat_therapy_post --> cat_merch["`📈 Launch #CatsWithCrohnies merch line`"]

  waiting_game --> tiktok_waiting_exposed["`📱 Start a TikTok<br>while literally dying`"]:::eventNode
  tiktok_waiting_exposed --> tiktok_ending

  go_nuclear --> kicked_out["`👣 Escorted out by security`"]:::eventNode
  kicked_out --> hipaa_showdown["`🚪 HIPAA Showdown:<br>phone confiscation fight`"]
  hipaa_showdown --> yell_combative["`🤬 Yell until you're labeled combative`"]
  hipaa_showdown --> demand_policy["`📜 Demand hospital's media policy in writing`"]
  kicked_out --> uber_refusal["`🚫 Uber refuses you:<br>'I'd have to burn my car.'`"]:::eventNode
  uber_refusal --> call_partner["`📞 Call your partner:<br>he has to lie on the ER floor`"]:::eventNode
  call_partner --> influencer_ending["`📸 Become medical<br>TikTok icon`"]:::endNode

  waiting_game --> maybe_admitted["`🛏️ Finally get a bed`"]:::eventNode
  maybe_admitted --> bed_alarm["`🧼 Bed alarm shrieks:<br>'Don't walk!'`"]:::eventNode
  bed_alarm --> disable_alarm["`🙄 Disable it yourself and face consequences`"]
  bed_alarm --> tiktok_autonomy["`📢 Rant about patient autonomy on TikTok`"]
  maybe_admitted --> inconclusive_xray["`📸 Inconclusive X-Ray`"]:::eventNode
  inconclusive_xray --> ct_scan["`🧪 Contrast CT:<br>also nothing`"]:::eventNode
  ct_scan --> wrong_discharge["`📝 Discharged with<br>IBS pamphlet`"]:::eventNode
  wrong_discharge --> home_suffering["`🏠 Crawl back home<br>and pray it stops`"]:::eventNode

  ambulance_refusal --> home_suffering
  home_suffering --> er_return["`🔁 Spiral, then return<br>to the ER again`"]:::eventNode
  er_return --> influencer_ending
  home_suffering --> influencer_ending
  document_abuse --> influencer_ending
  tiktok_ending --> influencer_ending

  %% Add directional links with labels for better readability
  linkStyle default stroke-width:2px,fill:none,stroke:gray
