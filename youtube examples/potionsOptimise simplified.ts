// Simplified code for using potionless heal unless we have low health
export function optimisePotions() {
  const { hp, max_hp, mp, max_mp } = character;

  if (hp / max_hp < 0.5) use_skill("use_hp");
  else if (mp / max_mp < 0.5) use_skill("use_mp");
  else if (max_mp > mp) return use_skill("regen_mp");
  else if (max_mp > mp) return use_skill("regen_mp");
  else
    return resolving_promise({ reason: "full", success: false, used: false });
}
