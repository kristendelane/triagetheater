---
config:
  layout: dagre
---
flowchart TD
  %% Start Scene
  start["`🧨 Welcome to the ER<br>— Please Take a Number`"]

  %% Add paramedics argument before ER arrival
  start --> bad_paramedics["`🚑 Paramedics think<br>you're pregnant with twins`"]
  bad_paramedics --> im_injection["`💉 They skip the vein:<br>IM fentanyl into your soul`"]
  im_injection --> rorschach_arm["`🖐️ Arm becomes a<br>Rorschach test of failure`"]
  rorschach_arm --> er_arrival_expanded["`🚑 Finally dumped<br>into ER hallway`"]

  %% Reconnect other branches
  start --> tiktok_waiting_exposed["`📱 Start a TikTok<br>while literally dying`"]
  start --> meet_gladys["`🧓 Talk to Gladys,<br>waiting longer than you`"]
  start --> early_confrontation["`📢 Advocate politely<br>for yourself`"]
  start --> ambulance_refusal["`🚪 Refuse the ambulance<br>and hobble home medieval-style`"]
