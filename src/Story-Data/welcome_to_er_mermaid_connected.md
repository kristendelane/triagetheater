---
config:
  layout: dagre
---
flowchart TD
  %% Start Scene
  start["`🧨 Welcome to the ER<br>Please Take a Number`"]

  %% Initial Branches
  start --> er_arrival_expanded["`🚑 Let the Sadist Squad<br>roll you into the ER`"]
  start --> tiktok_waiting_exposed["`📱 Start a TikTok<br>while literally dying`"]
  start --> meet_gladys["`🧓 Talk to Gladys,<br>waiting longer than you`"]
  start --> early_confrontation["`📢 Advocate politely<br>for yourself`"]
  start --> ambulance_refusal["`🚪 Refuse the ambulance<br>and hobble home medieval-style`"]

  %% Expanded Storyline
  ambulance_refusal --> home_suffering["`🏠 Crawl back home<br>and pray it stops`"]
  home_suffering --> er_return["`🔁 Spiral, then return<br>to the ER again`"]

  er_arrival_expanded --> triage_theater["`⏳ Triage Theater:<br>12hr wait + 0 dignity`"]
  triage_theater --> go_nuclear["`🧨 Go Nuclear`"]
  triage_theater --> waiting_game["`😐 Wait quietly,<br>still dying`"]
  triage_theater --> document_abuse["`📱 TikTok the chaos`"]

  go_nuclear --> kicked_out["`👣 Escorted out by security`"]
  kicked_out --> uber_refusal["`🚫 Uber refuses you:<br>'I'd have to burn my car.'`"]
  uber_refusal --> call_partner["`📞 Call your partner:<br>he has to lie on the ER floor`"]
  call_partner --> influencer_ending["`📸 Become medical<br>TikTok icon`"]

  waiting_game --> maybe_admitted["`🛏️ Finally get a bed`"]
  maybe_admitted --> inconclusive_xray["`📸 Inconclusive X-Ray`"]
  inconclusive_xray --> ct_scan["`🧪 Contrast CT:<br>also nothing`"]
  ct_scan --> wrong_discharge["`📝 Discharged with<br>IBS pamphlet`"]

  %% Shared TikTok Path
  document_abuse --> tiktok_ending["`📈 TikTok goes viral:<br>#MedicalGaslight`"]

  %% Influencer / Home Path
  er_return --> influencer_ending["`📸 Become medical<br>TikTok icon`"]
  home_suffering --> influencer_ending
  document_abuse --> influencer_ending
  tiktok_waiting_exposed --> tiktok_ending
  meet_gladys --> triage_theater
  early_confrontation --> triage_theater
