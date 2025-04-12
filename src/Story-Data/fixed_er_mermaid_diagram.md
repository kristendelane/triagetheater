---
config:
  layout: dagre
---
flowchart TD

  %% Start Scene
  start["`🧨 Welcome to the ER<br>— Please Take a Number`"]
  start --> intro_backstory["`📜 Backstory:<br>Medical gaslighting, toxic job, etc.`"]
  intro_backstory --> transport_choice["`🚗 How are we getting to the ER this time?`"]

  %% Transport Choices
  transport_choice --> take_uber["`🛞 Call an Uber and<br>hope for the best`"]
  transport_choice --> partner_drive["`💔 Partner drives you<br>through his own agony`"]
  transport_choice --> ambulance_pressure["`🚑 Ambulance scare tactics:<br>'It’ll cost $$$ either way'`"]
  ambulance_pressure --> bad_paramedics

  %% Paramedics arc — pure malpractice
  bad_paramedics["`🚑 Paramedics insist<br>you're 9 months pregnant`"]
  bad_paramedics --> im_injection["`💉 Too lazy for IV:<br>IM fentanyl into your bone`"]
  im_injection --> rorschach_arm["`🖐️ Bruises like a<br>Rorschach inkblot test`"]
  rorschach_arm --> er_arrival_expanded

  %% Initial ER Entry Alternatives (still valid paths)
  take_uber --> er_arrival_expanded
  partner_drive --> er_arrival_expanded

  %% Expanded Storyline
  er_arrival_expanded["`🚑 Let the Sadist Squad<br>roll you into the ER`"]
  er_arrival_expanded --> triage_theater["`⏳ Triage Theater:<br>12hr wait + 0 dignity`"]
  triage_theater --> go_nuclear["`🧨 Go Nuclear`"]
  triage_theater --> waiting_game["`😐 Wait quietly,<br>still dying`"]
  triage_theater --> document_abuse["`📱 TikTok the chaos`"]

  document_abuse --> tiktok_ending["`📈 TikTok goes viral:<br>#MedicalGaslight`"]

  tiktok_waiting_exposed["`📱 Start a TikTok<br>while literally dying`"]
  tiktok_waiting_exposed --> tiktok_ending

  meet_gladys["`🧓 Talk to Gladys,<br>waiting longer than you`"]
  early_confrontation["`📢 Advocate politely<br>for yourself`"]
  meet_gladys --> triage_theater
  early_confrontation --> triage_theater

  go_nuclear --> kicked_out["`👣 Escorted out by security`"]
  kicked_out --> uber_refusal["`🚫 Uber refuses you:<br>'I'd have to burn my car.'`"]
  uber_refusal --> call_partner["`📞 Call your partner:<br>he has to lie on the ER floor`"]
  call_partner --> influencer_ending["`📸 Become medical<br>TikTok icon`"]

  waiting_game --> maybe_admitted["`🛏️ Finally get a bed`"]
  maybe_admitted --> inconclusive_xray["`📸 Inconclusive X-Ray`"]
  inconclusive_xray --> ct_scan["`🧪 Contrast CT:<br>also nothing`"]
  ct_scan --> wrong_discharge["`📝 Discharged with<br>IBS pamphlet`"]

  ambulance_refusal["`🚪 Refuse the ambulance<br>and hobble home medieval-style`"]
  ambulance_refusal --> home_suffering["`🏠 Crawl back home<br>and pray it stops`"]
  home_suffering --> er_return["`🔁 Spiral, then return<br>to the ER again`"]
  er_return --> influencer_ending
  home_suffering --> influencer_ending
  document_abuse --> influencer_ending
