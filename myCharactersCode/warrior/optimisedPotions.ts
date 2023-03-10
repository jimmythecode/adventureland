// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

import { resolving_promise } from "../../myguides/potionsOptimise";
import { attack, can_attack, change_target, get_nearest_monster, get_targeted_monster, is_in_range, is_moving, is_on_cooldown, loot, move, set_message, use_skill } from "../../originalExample/runner_functions";
import { character } from "../../show_json/parent.character";

function optimisedPotions() {
    if (is_on_cooldown("use_hp"))
      return resolving_promise({ success: false, reason: "cooldown" });
  
    if (character.mp / character.max_mp < 0.5) return use_skill("use_mp");
    else if (character.hp / character.max_hp < 0.5) return use_skill("use_hp");
    else if (character.hp < character.max_hp) return use_skill("regen_hp");
    else if (character.mp < character.max_mp) return use_skill("regen_mp");
    else
      return resolving_promise({ reason: "full", success: false, used: false });
  }
  
  var attack_mode=true
  
  
  setInterval(function(){
      optimisedPotions();
      loot();
  
      if(!attack_mode || character.rip || is_moving(character)) return;
  
      var target=get_targeted_monster();
      if(!target)
      {
          target=get_nearest_monster({min_xp:100,max_att:120});
          if(target) change_target(target);
          else
          {
              set_message("No Monsters");
              return;
          }
      }
      
      if(!is_in_range(target))
      {
          move(
              character.x+(target.x-character.x)/2,
              character.y+(target.y-character.y)/2
              );
          // Walk half the distance
      }
      else if(can_attack(target))
      {
          set_message("Attacking");
          attack(target);
      }
  
  },1000/4); // Loops every 1/4 seconds.