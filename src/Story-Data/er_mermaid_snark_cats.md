---
config:
  layout: dagre
---
flowchart TD
  %% Start Scene
  start["`🧨 Welcome to the ER<br>— Please Take a Number`"]

  %% Initial Branches
  start --> er_arrival_expanded["`🚑 Let the Sadist Squad<br>roll you into the ER`"]
  start --> tiktok_waiting_exposed["`📱 Launch a TikTok while<br>violently evaporating`"]
  start --> meet_gladys["`🧓 Gladys, eternal soul of<br>the waiting room`"]
  start --> early_confrontation["`📢 Advocate 'calmly' and<br>get labeled hostile`"]
  start --> ambulance_refusal["`🚪 Decline the chariot and<br>crawl home like a Victorian ghost`"]

  %% Expanded Storyline
  ambulance_refusal --> home_suffering["`🏠 Return to your lair<br>of cat hair and despair`"]
  home_suffering --> er_return["`🔁 Rinse, repeat:<br>ER again, shocker`"]

  er_arrival_expanded --> triage_theater["`⏳ Triage Theater:<br>now featuring bed alarms`"]
  triage_theater --> go_nuclear["`🧨 Go full nuclear:<br>nurse rage speedrun`"]
  triage_theater --> waiting_game["`😐 Sit quietly and die<br>politely in public`"]
  triage_theater --> document_abuse["`📱 #LiveLeak your trauma<br>on TikTok`"]

  go_nuclear --> kicked_out["`👣 Security escorts you out<br>like a contagious liability`"]
  kicked_out --> uber_refusal["`🚫 Uber refuses you:<br>'I’d have to torch my car.'`"]
  uber_refusal --> call_partner["`📞 Beg partner who can’t sit<br>to floor-crawl back to help`"]
  call_partner --> influencer_ending["`📸 TikTok stardom begins:<br>thanks, humiliation!`"]

  waiting_game --> maybe_admitted["`🛏️ A bed... finally!<br>What’s the catch?`"]
  maybe_admitted --> inconclusive_xray["`📸 They bet it’s an SBO —<br>it's not`"]
  inconclusive_xray --> ct_scan["`🧪 CT with contrast:<br>also nothing`"]
  ct_scan --> wrong_discharge["`📝 IBS pamphlet & vibes:<br>bye now`"]

  %% Shared TikTok Path
  document_abuse --> tiktok_ending["`📈 TikTok explodes:<br>#MedicalGaslight FTW`"]

  %% Influencer / Home Path
  er_return --> influencer_ending["`📸 Medfluencer arc:<br>cringe and cashflow`"]
  home_suffering --> influencer_ending
  document_abuse --> influencer_ending
  tiktok_waiting_exposed --> tiktok_ending
  meet_gladys --> triage_theater
  early_confrontation --> triage_theater

  %% Suffer From Home Arc: Snarkier + Cats
  influencer_ending --> suffer_from_home["`💀 Woke up in Ensure,<br>cat hair, no dignity`"]
  suffer_from_home --> zoomie_pounce["`🐾 Zayka launches<br>directly onto your gut`"]
  suffer_from_home --> cat_bed_thief["`🐈 Bandit stole your bed<br>and your will to live`"]
  suffer_from_home --> viral_cat_accounts["`📲 Zayka & Bandit get<br>verified before you`"]
  suffer_from_home --> cat_pr["`📣 Zayka goes live:<br>‘#UnfilteredTubieLife’`"]
  suffer_from_home --> kind_follower["`💬 Random DM hits:<br>‘You’re not alone ❤️’`"]
  suffer_from_home --> diaper_golytely_hell["`🧺 GoLYTELY + diapers:<br>you live in laundry`"]
  diaper_golytely_hell --> temu_salvation["`🛒 Praise Temu:<br>barrier pads = $0.49`"]
  temu_salvation --> er_return
