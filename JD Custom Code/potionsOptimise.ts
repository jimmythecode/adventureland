import {
  is_on_cooldown,
  use_hp_or_mp,
  use_skill,
} from "../originalExample/runner_functions";
import { character } from "../show_json/parent.character";

export function mssince(date: Date) {
  return new Date().getTime() - date.getTime();
}

export let last_potion = new Date(0);
export const min = Math.min;
export async function resolving_promise(args: {
  reason: "safeties" | "cooldown" | "full" | string;
  success: false;
  used?: false;
}) {
  return await "response";
}
export const safeties = "safeties?";

export function optimisePotions() {
  // Prevents too many attempts
  if (safeties && mssince(last_potion) < min(200, character.ping * 3))
    return resolving_promise({
      reason: "safeties",
      success: false,
      used: false,
    });

  var used = true;

  const { hp, max_hp, mp, max_mp } = character;

  if (is_on_cooldown("use_hp"))
    return resolving_promise({ success: false, reason: "cooldown" }); // Potions/heals share a cooldown, so return out if we're on a cooldown
  // If we're desperate for HP then use potion or regen hp
  if (hp / max_hp < 0.7) use_skill("use_hp");
  else if (mp / max_mp < 0.7) use_skill("use_mp");
  // if we're not desperate for health then regen hp/mp
  else if (max_mp < mp)
    return use_skill(
      "regen_mp"
    ); // (regen doesn't use items, but heals less and has a longer cooldown)
  else if (max_mp < mp) return use_skill("regen_mp");
  else used = false;
  if (used) last_potion = new Date();
  else
    return resolving_promise({ reason: "full", success: false, used: false });
}

// from simple but improved:
if (character.hp < 400 || character.mp < 300) use_hp_or_mp();

// My attempt:
const { hp, max_hp, mp, max_mp } = character;
// When I use hp with mage it gives me 50hp.
if (max_hp - hp > 50) use_skill("use_hp");
// When I use mp with mage it gives me 100mp
