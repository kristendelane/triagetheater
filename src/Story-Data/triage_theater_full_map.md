
---
config:
  layout: dagre
---
flowchart TD

  %% Style Definitions
  classDef startNode fill:#d4f1c5,stroke:#333,stroke-width:2px
  classDef decisionNode fill:#c5e1f1,stroke:#333,stroke-width:2px
  classDef endNode fill:#f1c5c5,stroke:#333,stroke-width:2px
  classDef eventNode fill:#f1e8c5,stroke:#333,stroke-width:1px

  %% Start and Transport
  start["`🧨 Welcome to the ER<br>— Please Take a Number`"]:::startNode
  start --> intro_backstory["`📜 Backstory:<br>Medical gaslighting, toxic job, etc.`"]:::eventNode
  intro_backstory --> transport_choice["`🚗 How are we getting to the ER this time?`"]:::decisionNode

  transport_choice --> take_uber["`🛞 Call an Uber and<br>hope for the best`"]:::eventNode
  transport_choice --> partner_drive["`💔 Partner drives you<br>through his own agony`"]:::eventNode
  transport_choice --> ambulance_pressure["`🚑 Ambulance scare tactics:<br>'It'll cost $$$ either way'`"]:::eventNode
  transport_choice --> ambulance_refusal["`🚪 Refuse the ambulance<br>and hobble home medieval-style`"]:::eventNode
  ambulance_pressure --> bad_paramedics

  %% Paramedics
  bad_paramedics["`🚑 Paramedics insist<br>you're 9 months pregnant`"]:::eventNode
  bad_paramedics --> im_injection["`💉 Too lazy for IV:<br>IM fentanyl into your bone`"]:::eventNode
  im_injection --> rorschach_arm["`🖐️ Bruises like a<br>Rorschach inkblot test`"]:::eventNode
  rorschach_arm --> er_arrival_expanded

  %% Alternate ER Entries
  take_uber --> er_arrival_expanded
  partner_drive --> er_arrival_expanded

  %% ER Arrival
  er_arrival_expanded["`🚑 Let the Sadist Squad<br>roll you into the ER`"]:::eventNode
  er_arrival_expanded --> triage_theater["`⏳ Triage Theater:<br>12hr wait + 0 dignity`"]:::eventNode

  triage_theater --> go_nuclear["`🧨 Go Nuclear`"]:::decisionNode
  triage_theater --> waiting_game["`😐 Wait quietly,<br>still dying`"]:::decisionNode
  triage_theater --> document_abuse["`📱 TikTok the chaos`"]:::decisionNode
  triage_theater --> meet_gladys["`🧓 Talk to Gladys,<br>waiting longer than you`"]:::eventNode
  triage_theater --> early_confrontation["`📢 Advocate politely<br>for yourself`"]:::eventNode

  %% Script Advocacy
  early_confrontation --> script_advocacy["`🗣️ Try scripted:<br>'Could we consider a GES?'`"]:::eventNode
  script_advocacy --> show_symptom_log["`📱 Show your symptom log`"]:::decisionNode
  script_advocacy --> panic_explain["`😶 Panic & overexplain`"]:::decisionNode

  %% Bed Alarm
  waiting_game --> maybe_admitted["`🛏️ Finally get a bed`"]:::eventNode
  maybe_admitted --> bed_alarm["`🚨 Bed Alarm:<br>Moves = Lawsuit Risk`"]:::eventNode
  bed_alarm --> disable_alarm["`🙄 Disable it<br>and get yelled at`"]:::decisionNode
  bed_alarm --> tiktok_rant["`📢 TikTok: Bed has more control than GI`"]:::decisionNode

  maybe_admitted --> inconclusive_xray["`📸 Inconclusive X-Ray`"]:::eventNode
  inconclusive_xray --> ct_scan["`🧪 Contrast CT:<br>also nothing`"]:::eventNode
  ct_scan --> wrong_discharge["`📝 Discharged with<br>IBS pamphlet`"]:::eventNode
  wrong_discharge --> home_suffering["`🏠 Crawl home,<br>nothing resolved`"]:::eventNode

  %% Home paths
  ambulance_refusal --> home_suffering
  home_suffering --> er_return["`🔁 Return to ER:<br>Still Dying`"]:::eventNode
  er_return --> influencer_ending
  home_suffering --> influencer_ending
  document_abuse --> influencer_ending
  tiktok_ending --> influencer_ending

  %% TikTok + Cat
  document_abuse --> tiktok_ending["`📈 TikTok viral:<br>#MedicalGaslight`"]:::eventNode
  tiktok_ending --> cat_chaos["`🐈 Cat Attack:<br>Zayka pounces your belly`"]:::eventNode
  cat_chaos --> account_takeover["`🐾 Cats take over<br>your account`"]:::decisionNode
  cat_chaos --> merch_drop["`📈 Launch Spoonie<br>cat merch`"]:::decisionNode

  %% Go Nuclear
  go_nuclear --> kicked_out["`👣 Escorted out<br>by security`"]:::eventNode
  kicked_out --> hipaa_showdown["`🚪 Phone seized:<br>HIPAA 'vibes' violation`"]:::eventNode
  hipaa_showdown --> yell_label["`🤬 You yell,<br>get labeled 'combative'`"]:::decisionNode
  hipaa_showdown --> demand_policy["`📜 Demand written<br>media policy`"]:::decisionNode
  kicked_out --> uber_refusal["`🚫 Uber: 'I'd have to<br>burn my car.'`"]:::eventNode
  uber_refusal --> call_partner["`📞 Partner returns,<br>ER floor nap activated`"]:::eventNode
  call_partner --> influencer_ending["`📸 TikTok icon:<br>Spoonie Stardom`"]:::endNode

  %% Styling
  linkStyle default stroke-width:2px,fill:none,stroke:gray
