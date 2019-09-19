"use strict";

var BASE_DATA = {
	"1/8": {
		"AC": 12,
		"HP": 9,
		"Attack": 3,
		"Damage": 3,
		"DC": 10,
		"Save": 2
	},
	"1/4": {
		"AC": 13,
		"HP": 15,
		"Attack": 3,
		"Damage": 5,
		"DC": 10,
		"Save": 2
	},
	"1/2": {
		"AC": 13,
		"HP": 24,
		"Attack": 4,
		"Damage": 8,
		"DC": 11,
		"Save": 3
	},
	"0": {
		"AC": 12,
		"HP": 3,
		"Attack": 2,
		"Damage": 1,
		"DC": 9,
		"Save": 1
	},
	"1": {
		"AC": 13,
		"HP": 30,
		"Attack": 4,
		"Damage": 10,
		"DC": 11,
		"Save": 3
	},
	"2": {
		"AC": 13,
		"HP": 45,
		"Attack": 5,
		"Damage": 15,
		"DC": 12,
		"Save": 4
	},
	"3": {
		"AC": 14,
		"HP": 60,
		"Attack": 5,
		"Damage": 20,
		"DC": 12,
		"Save": 4
	},
	"4": {
		"AC": 14,
		"HP": 75,
		"Attack": 6,
		"Damage": 25,
		"DC": 13,
		"Save": 5
	},
	"5": {
		"AC": 14,
		"HP": 90,
		"Attack": 6,
		"Damage": 30,
		"DC": 13,
		"Save": 5
	},
	"6": {
		"AC": 15,
		"HP": 105,
		"Attack": 7,
		"Damage": 35,
		"DC": 14,
		"Save": 6
	},
	"7": {
		"AC": 15,
		"HP": 120,
		"Attack": 7,
		"Damage": 40,
		"DC": 14,
		"Save": 6
	},
	"8": {
		"AC": 15,
		"HP": 120,
		"Attack": 8,
		"Damage": 40,
		"DC": 15,
		"Save": 7
	},
	"9": {
		"AC": 16,
		"HP": 135,
		"Attack": 8,
		"Damage": 45,
		"DC": 15,
		"Save": 7
	},
	"10": {
		"AC": 16,
		"HP": 150,
		"Attack": 9,
		"Damage": 50,
		"DC": 16,
		"Save": 8
	},
	"11": {
		"AC": 16,
		"HP": 165,
		"Attack": 9,
		"Damage": 55,
		"DC": 16,
		"Save": 8
	},
	"12": {
		"AC": 17,
		"HP": 180,
		"Attack": 10,
		"Damage": 60,
		"DC": 17,
		"Save": 9
	},
	"13": {
		"AC": 17,
		"HP": 195,
		"Attack": 10,
		"Damage": 65,
		"DC": 17,
		"Save": 9
	},
	"14": {
		"AC": 17,
		"HP": 210,
		"Attack": 11,
		"Damage": 70,
		"DC": 18,
		"Save": 10
	},
	"15": {
		"AC": 18,
		"HP": 225,
		"Attack": 11,
		"Damage": 75,
		"DC": 18,
		"Save": 10
	},
	"16": {
		"AC": 18,
		"HP": 240,
		"Attack": 12,
		"Damage": 80,
		"DC": 19,
		"Save": 11
	},
	"17": {
		"AC": 18,
		"HP": 255,
		"Attack": 12,
		"Damage": 85,
		"DC": 19,
		"Save": 11
	},
	"18": {
		"AC": 19,
		"HP": 270,
		"Attack": 13,
		"Damage": 90,
		"DC": 20,
		"Save": 12
	},
	"19": {
		"AC": 19,
		"HP": 285,
		"Attack": 13,
		"Damage": 95,
		"DC": 20,
		"Save": 12
	},
	"20": {
		"AC": 19,
		"HP": 300,
		"Attack": 14,
		"Damage": 100,
		"DC": 21,
		"Save": 13
	},
	"21": {
		"AC": 20,
		"HP": 315,
		"Attack": 14,
		"Damage": 105,
		"DC": 21,
		"Save": 13
	},
	"22": {
		"AC": 20,
		"HP": 330,
		"Attack": 15,
		"Damage": 110,
		"DC": 22,
		"Save": 14
	},
	"23": {
		"AC": 20,
		"HP": 345,
		"Attack": 15,
		"Damage": 115,
		"DC": 22,
		"Save": 14
	},
	"24": {
		"AC": 21,
		"HP": 360,
		"Attack": 16,
		"Damage": 120,
		"DC": 23,
		"Save": 15
	},
	"25": {
		"AC": 21,
		"HP": 375,
		"Attack": 16,
		"Damage": 125,
		"DC": 23,
		"Save": 15
	},
	"26": {
		"AC": 21,
		"HP": 390,
		"Attack": 17,
		"Damage": 130,
		"DC": 24,
		"Save": 16
	}
};

var MONSTER = {
	name: "",
	type: "Standard",
	cr: 0,
	hp: 0,
	ac: 0,
	attacksPerRound: 0,
	toHit: 0,
	damagePerHit: 0,
	saveDC: 0,
	savingThrow: 0
};

var SINGLE_DICE_AVG = {
	"d4": 2.5,
	"d6": 3.5,
	"d8": 4.5,
	"d10": 5.5,
	"d12": 6.5,
	"d20": 10.5
};

var MONSTER_TRAITS = [
	{
		"name": "Abberant Ground",
		"text": "The ground in a 10-foot radius around the creature is doughlike difficult terrain. Each target that starts its turn in that area must succeed on a Strength saving throw (DC = 8 + proficiency bonus + Strength modifier) or have its speed reduced to 0 until the start of its next turn.",
		"reference": "(Gibbering Mouther pp. 157, MM)"
	},
	{
		"name": "Action Surge",
		"text": "Recharges after Short or Long rest. On its turn, the creature can take one additional action.",
		"reference": "(Langedrosa Cyanwrath, pp. 91, HotDQ)"
	},
	{
		"name": "Adhesive",
		"text": "The creature adheres to anything that touches it. A Huge or smaller target adhered to the creature is also grappled by it (escape DC = 8 + proficiency bonus + Strength modifier). Ability checks made to escape this grapple have disadvantage.",
		"reference": "(Mimic, pp. 220, MM)"
	},
	{
		"name": "Advanced Telepathy",
		"text": "The creature can perceive the content of any telepathic communication used within 60 feet of it, and it can’t be surprised by creatures with any form of telepathy.",
		"reference": "(Fluumph, pp. 135, MM)"
	},
	{
		"name": "Aggressive",
		"text": "As a bonus action, the creature can move up to its speed towards a hostile creature that it can see.",
		"reference": "(Orc, pp. 246, MM)"
	},
	{
		"name": "Air Form",
		"text": "The creature can enter a hostile creature’s space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
		"reference": "(Air Elemental, pp. 124, MM)"
	},
	{
		"name": "Ambusher",
		"text": "The creature has advantage on attack rolls against any creature it has surprised.",
		"reference": "(Doppelganger, pp. 82, MM)"
	},
	{
		"name": "Amorphous",
		"text": "The creature can move through a space as narrow as 1 inch wide without squeezing.",
		"reference": "(Black Pudding, pp. 241, MM)"
	},
	{
		"name": "Amphibious",
		"text": "The creature can breathe air and water.",
		"reference": "(Aboleth, pp. 13, MM)"
	},
	{
		"name": "Angelic Weapons",
		"text": "The creature’s weapon attacks are magical. When the creature hits with any weapon, the weapon deals an extra X radiant damage (included in the attack).",
		"reference": "(Deva, pp. 16, MM)"
	},
	{
		"name": "Antimagic Cone",
		"text": "The creature’s central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone. At the start of each of its turns, the creature decides which way the cone faces and whether the cone is active. The area works against the creatures own eye rays.",
		"reference": "(Beholder, pp. 28, MM)"
	},
	{
		"name": "Antimagic Susceptibility",
		"text": "The creature is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the creature must succeed on a Constitution saving throw against the caster’s spell save DC or fall unconscious for 1 minute.",
		"reference": "(Animated Armor, pp. 19, MM)"
	},
	{
		"name": "Artificer’s Lore",
		"text": "Whenever the creature makes Intelligence (History) check related to magic items, alchemical objects, or technological devices, it can add twice its proficiency bonus, instead of any proficiency bonus it normally applies.",
		"reference": "(Rock Gnome, pp. 37, PH)"
	},
	{
		"name": "Assassinate",
		"text": "During it’s first turn, the creature has advantage on attack rolls against any target that hasn’t taken a turn. Any hit the creature scores against a surprised target is a critical hit.",
		"reference": "(Assassin, pp. 343, MM)"
	},
	{
		"name": "Aversion of Damage Type",
		"text": "If the creature takes the associated damage type, it has disadvantage on attack rolls and ability checks until the end of its next turn.",
		"reference": "(Flesh Golem, pp. 169, MM)"
	},
	{
		"name": "Avoidance",
		"text": "If the creature is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.",
		"reference": "(Demilich, pp. 48, MM)"
	},
	{
		"name": "Axiomatic Mind",
		"text": "The creature can’t be compelled to act in a manner contrary to its nature or its instructions.",
		"reference": "(Monodrone, pp. 224, MM)"
	},
	{
		"name": "Band of the Black Earth",
		"text": "The creature is magically bound to a bulette trained to serve as it’s mount. While mounted on it’s bulette, the creature shares the bulette’s senses and can ride the bulette while it burrows. The bonded bulette obeys the creature’s commands. If it’s mount dies, the creature can train a new bulette to serve as its bonded mount, a process requiring a month.",
		"reference": "(Burrowshark, pp. 196, PotA)"
	},
	{
		"name": "Barbed Hide",
		"text": "At the start of each of its turns, the creature deals X (1d10) piercing damage to any creature grappling it.",
		"reference": "(Barbed Devil, pp. 70, MM)"
	},
	{
		"name": "Beast of Burden",
		"text": "The creature is considered to be a Large animal for the purpose of determining its carrying capacity.",
		"reference": "(Mule, pp. 333, MM)"
	},
	{
		"name": "Berserk",
		"text": "Whenever the creature starts its turn with X hit points or fewer, roll a d6. On a 6, the creature goes berserk. On each of its turns while berserk, the creature attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the creature goes berserk, it continues to do so until it is destroyed or regains all its hit points. The creature’s creator, if within 60 feet of the berserk creature, can try to calm it by speaking firmly and persuasively. The creature must be able to hear its creator, who must take an action to make a DC 15 Charisma (Persuasion) check. If the check succeeds, the creature ceases being berserk. If it takes damage while still at X hitpoints or fewer, the creature might go berserk again.",
		"reference": "(Flesh Golem, pp. 169, MM)"
	},
	{
		"name": "Berserk",
		"text": "Whenever the creature starts its turn with X hit points or fewer, roll a d6. On a 6, the creature goes berserk. On each of its turns while berserk, the creature attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the creature goes berserk, it continues to do so until it is destroyed or regains all its hit points.",
		"reference": "(Clay Golem, pp. 168, MM)"
	},
	{
		"name": "Blessing of Mother Night",
		"text": "The creature is shielded against divination magic, as though protected by a nondetection spell.",
		"reference": "(Baba Lysaga, pp. 228. CoS)"
	},
	{
		"name": "Blind Senses",
		"text": "The creature can’t use its blindsight while deafened and unable to smell.",
		"reference": "(Grimlock, pp. 175, MM)"
	},
	{
		"name": "Blood Frenzy",
		"text": "The creature has advantage on melee attack rolls against any creature that doesn’t have all its hit points.",
		"reference": "(Sahuagin, pp. 263, MM)"
	},
	{
		"name": "Bonded Mount",
		"text": "The creature is magically bound to a beast with an innate swimming speed trained to serve as its mount. While mounted on this beast, the creature gains the beast’s senses and ability to breathe underwater. The bonded mount obeys the creature’s commands. If its mount dies, the creature can train a new beast to serve as its bonded mount, a process requiring a month.",
		"reference": "(Dark Tide Knight, pp. 205, PotA)"
	},
	{
		"name": "Bound",
		"text": "The creature is magically bound to an amulet. As long as the creature and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the creature to travel to it, and the creature knows the distance and direction to the amulet. If the creature is within 60 feet of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the creature.",
		"reference": "(Shield Guardian, pp. 271, MM)"
	},
	{
		"name": "Brave",
		"text": "The creature has advantage on saving throws against being frightened.",
		"reference": "(Gladiator, pp. 346, MM)"
	},
	{
		"name": "Brave Devotion",
		"text": "The creature has advantage on saving throws against being charmed or frightened.",
		"reference": "(Wiggan Nettlebee, pp. 211, PotA)"
	},
	{
		"name": "Brute",
		"text": "A melee weapon deals one extra die of its damage when the creature hits with it (included in the attack).",
		"reference": "(Bugbear, pp. 33, MM)"
	},
	{
		"name": "Call to the Wave",
		"text": "The creature knows the shape water cantrip. When it reaches 3rd level it can cast create or destroy water spell as a 2nd level spell once per long rest. Constitution is its spellcasting ability for these spells.",
		"reference": "(Water Genasi, pp. 10, EEPH)"
	},
	{
		"name": "Cantrip",
		"text": "The creature knows one cantrip of its choice from the wizard spell list. Intelligence is its spellcasting ability for it.",
		"reference": "(High Elf, pp. 24, PH)"
	},
	{
		"name": "Cavalry Training",
		"text": "When the creature hits a target with a melee attack while mounted, the mount can make a melee attack against the same target as a reaction.",
		"reference": "(Duergar Kavalrachni, pp. 226, OotA)"
	},
	{
		"name": "Celestial Legacy",
		"text": "The creature knows the light can trip. Once it reaches 3rd level, it can cast the lesser restoration spell once per long rest. Once it reaches 5th level, the creature can cast the daylight spell once as a 3rd-level spell per long rest. Charisma is the creature’s spellcasting ability for these spells.",
		"reference": "(Aasimar, pp. 287, DMG)"
	},
	{
		"name": "Celestial Resistance",
		"text": "The creature has resistance to necrotic damage and radiant damage.",
		"reference": "(Aasimar, pp. 287, DMG)"
	},
	{
		"name": "Chameleon Carapace",
		"text": "The creature can change the color of its carapace to match the color and texture of its surroundings. As a result, it has advantage on Dexterity (Stealth) checks made to hide.",
		"reference": "(Thri-kreen, pp. 288, MM)"
	},
	{
		"name": "Chameleon Skin",
		"text": "The creature has advantage on Dexterity (Stealth) checks made to hide.",
		"reference": "(Troglodyte, pp. 290, MM)"
	},
	{
		"name": "Charge",
		"text": "If the creature moves at least X feet straight toward a target and then hits it with a melee weapon attack on the same turn, the target takes an extra Y damage.",
		"reference": "(Centaur, pp. 38, MM)"
	},
	{
		"name": "Chilling Mist",
		"text": "While it is alive, the creature projects an aura of cold mist within X feet of itself. If the creature deals damage to a target in this area, the target also takes Y cold damage.",
		"reference": "(One-Eyed Shiver, pp. 207, PotA)"
	},
	{
		"name": "Cold Aura",
		"text": "Any target that starts it’s turn within 5 feet of the creature takes X cold damage.",
		"reference": "(Ice Toad, pp. 90, RoT)"
	},
	{
		"name": "Confer X Resistance",
		"text": "The creature can grant resistance to X damage to anyone riding it.",
		"reference": "(Nightmare, pp. 235, MM)"
	},
	{
		"name": "Confusing Gaze",
		"text": "When a target starts its turn within 30 feet of the creature and is able to see the creatures’ eyes, the creature can magically force it to make a DC 15 Charisma saving throw, unless the creature is incapacitated. On a failed saving throw, the target can't take reactions until the start of its next turn and rolls a d8 to determine what it does during that turn. On a 1 to 4, the target does nothing. On a 5 or 6, the target takes no action but uses all its movement to move in a random direction. On a 7 or 8, the target makes one melee attack against a random target, or it does nothing if no target is within reach. Unless surprised, a target can avert its eyes to avoid the saving throw at the start of its turn. If the target does so, it can’t see the creature until the start if uts next turn, when it can aver its eyes again. If the target looks at the creature in the meantime, it must immediately make the save.",
		"reference": "(Umber Hulk, pp. 292, MM)"
	},
	{
		"name": "Consume Life",
		"text": "As a bonus action, the creature can target one target it can see within 5 feet of it that has 0 hit points and is still alive. The target must succeed on a DC 10 Constitution saving throw against this magic or die. If the target dies, the creature regains X hit points.",
		"reference": "(Will-o’-Wisp, pp. 301, MM)"
	},
	{
		"name": "Corrode Metal",
		"text": "Any nonmagical weapon made of metal that hits the creature corrodes. After dealing damage, the weapon takes a permanent and cumulative 1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the creature is destroyed after dealing damage. The creature can eat through 2-inch-thick, nonmagical metal in 1 round.",
		"reference": "(Grey Ooze, pp. 243, MM)"
	},
	{
		"name": "Corrosive Form",
		"text": "A target that touches the creature or hits it with a melee attack while within 5 feet of it takes X acid damage. Any nonmagical weapon made of metal or wood that hits the creature corrodes. After dealing damage, the weapon takes a permanent cumulative -1 penalty to damage rolls. If its penalty drops to 5, the weapon is destroyed. Non magical ammunition made of metal or wood that hits the creature is destroyed after dealing damage. The creature can eat through 2-inch-thick, non-magical wood or metal in 1 round.",
		"reference": "(Black Pudding, pp. 241, MM)"
	},
	{
		"name": "Cunning Action",
		"text": "On each of its turns, the creature can use a bonus action to take the Dash, Disengage, or Hide action.",
		"reference": "(Spy, pp. 349, MM)"
	},
	{
		"name": "Damage Absorption",
		"text": "Whenever the creature is subjected to the associated damage type, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.",
		"reference": "(Iron Golem, pp. 170, MM)"
	},
	{
		"name": "Damage Resistance (Draconic Ancestry)",
		"text": "The creature has resistance to the damage type associated with its draconic ancestry.",
		"reference": "(Dragonborn, pp. 34, PH)"
	},
	{
		"name": "Damage Resistance",
		"text": "The creature has resistance to X damage.",
		"reference": "(Fire Genasi, pp. 10, EEPH)"
	},
	{
		"name": "Damage Transfer",
		"text": "While grappling a target, the creature takes only half the damage dealt to it, and the target grappled by the creature takes the other half.",
		"reference": "(Rug of Smothering, pp. 20, MM)"
	},
	{
		"name": "Dark Advantage",
		"text": "Once per turn, the creature can deal an extra X damage when it hits with a weapon attack, provided the creature has advantage on the attack roll.",
		"reference": "(Rezmir, pp. 93, HotDQ)"
	},
	{
		"name": "Dark Devotion",
		"text": "The creature has advantage on saving throws against being charmed or frightened.",
		"reference": "(Cultist, pp. 345, MM)"
	},
	{
		"name": "Darkvision",
		"text": "The creature can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light. It can’t discern color in darkness, only shades of grey.",
		"reference": "(Elf, pp. 23, PH)"
	},
	{
		"name": "Death Burst",
		"text": "When the creature dies, it explodes in a burst of fire and magma. Each target within X feet of it must make a Dexterity saving throw (DC = 8 + proficiency bonus + Constitution modifier), taking Y fire damage on a failed save, or half as much damage on a successful one. Flammable objects that aren’t being worn or carried in that area are ignited.",
		"reference": "(Magmin, pp. 212, MM)"
	},
	{
		"name": "Death Burst",
		"text": "The creature explodes when it drops to 0 hit points. Each creature within 20 feet of it must succeed on a DC 15 Constitution saving throw or take X poison damage and become infected with a disease on a failed save. Target’s immune to the poisoned condition are immune to this disease. Spores invade an infected target’s system, killing the target in a number of hours equal to 1d12 + the creature’s Constitution score, unless the disease is removed. In half that time, the creature becomes poisoned for the rest of the duration. After the target dies, it sprouts 2d4 Tiny gas spores that grow to full size in 7 days.",
		"reference": "(Gas Spore, pp. 138, MM)"
	},
	{
		"name": "Deathly Choir",
		"text": "Any target within X feet of the creature that isn’t protected by a mind blank spell hears in its mind the screams of the thousands of people the creature has killed. As a bonus action, the creature can force all targets that can hear the screams to make a Wisdom saving throw (DC = 8 + proficiency bonus + Charisma modifier). Each target takes Y psychic damage on a failed save, or half as much damage on a successful one.",
		"reference": "(Rahadin, pp. 237, CoS)"
	},
	{
		"name": "Death Throes",
		"text": "See Death Burst (fire). More powerful.",
		"reference": "(Balor, pp. 55, MM)"
	},
	{
		"name": "Detect Invisibility",
		"text": "Within X feet of the creature, magical invisibility fails to conceal anything from the creature’ s sight.",
		"reference": "(Tressym, pp. 242, SKT)"
	},
	{
		"name": "Detect Life",
		"text": "The creature can magically sense the presence of living targets up to 5 miles away. It knows the general direction they’re in but not their exact locations.",
		"reference": "(Banshee, pp. 23, MM)"
	},
	{
		"name": "Detect Sentience",
		"text": "The creature can sense the presence and location of any target within 300 feet of it that has an Intelligence score of 3 or higher, regardless of interposing barriers, unless the target is protected by a mind blank spell.",
		"reference": "(Intellect Devourer, pp. 191, MM)"
	},
	{
		"name": "Devil’s Sight",
		"text": "Magical darkness doesn’t impede the creature’s darkvision.",
		"reference": "(Bone Devil, pp. 71, MM)"
	},
	{
		"name": "Devil’s Tongue",
		"text": "The creature knows the vicious mockery cantrip. When it reaches 3rd level, it can cast the charm person spell as a 2nd-level spell once with this trait. When it reaches 5th level, it can cast the enthral spell once with this trait. It must finish a long rest to cast these spells once again with this trait. Charisma is its spellcasting ability for them.",
		"reference": "(Tiefling Variants, pp. 118, SCAG)"
	},
	{
		"name": "Discorporation",
		"text": "When the creature drops to 0 hit points or dies, it’s body is destroyed but it’s essence travels back to it’s domain in the Nine Hells, and it is unable to take physical form for a time.",
		"reference": "(Tiamat, pp. 92, RoT)"
	},
	{
		"name": "Disintegration",
		"text": "If the creature dies, its body disintegrates into dust, leaving behind its weapons and anything else it was carrying.",
		"reference": "(Monodrone, pp. 224, MM)"
	},
	{
		"name": "Displacement",
		"text": "The creature projects a magical illusion that makes it appear to be standing near its actual location, causing attack rolls against it to have disadvantage. If it is hit by an attack, this trait is disrupted until the end of its next turn. This trait is also disrupted while the creature is incapacitated or has a speed of 0.",
		"reference": "(Displacer Beast, pp. 81, MM)"
	},
	{
		"name": "Distress Spores",
		"text": "When the creature takes damage, all other myconids within 240 feet can sense its pain.",
		"reference": "(Myconid Sprout, pp. 230)"
	},
	{
		"name": "Dive",
		"text": "If the creature is flying and dives at least 30 feet straight toward a target and then hits it with a melee weapon attack, the attack deals an extra X damage to the target.",
		"reference": "(Aarakocra, pp. 12, MM)"
	},
	{
		"name": "Divine Awareness",
		"text": "The creature knows if it hears a lie.",
		"reference": "(Planetar, pp. 17, MM)"
	},
	{
		"name": "Divine Eminence",
		"text": "As a bonus action, the creature can expend a spell slot to cause its melee weapons to magically deal an extra X radiant damage to the target on a hit. This benefit lasts until the end of the turn. If the creature expends a spell slot of 2nd level or higher, the extra damage increases by Y for each level above 1st.",
		"reference": "(Priest, pp. 348, MM)"
	},
	{
		"name": "Draconic Majesty",
		"text": "The creature has draconic ancestry. Choose one type of dragon from the Draconic Majesty table (page 34 PH). Its breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
		"reference": "(Dragonborn, pp. 34, PH)"
	},
	{
		"name": "Draconic Majesty",
		"text": "While wearing no armor and wearing a Dragon Mask, the creature adds it’s Charisma bonus to it’s AC (included).",
		"reference": "(Rezmir, pp. 92, HotDQ)"
	},
	{
		"name": "Draconic Majesty",
		"text": "The creature adds it’s Charisma bonus to it’s AC (included).",
		"reference": "(Neronvain, pp. 91, RoT)"
	},
	{
		"name": "Dragon Fanatic",
		"text": "The creature has advantage on saving throws against being charmed or frightened. While the creature can see a dragon or a higher-ranking Cult of the Dragon cultist friendly to it, the creature ignores the effects of being charmed or frightened.",
		"reference": "(Dragonclaw, pp. 89, HotDQ)"
	},
	{
		"name": "Drone",
		"text": "The creature produces a horrid droning sound to which demons are immune. Any other target that starts its turn within 30 feet of the creature must succeed on a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) or fall unconscious for 10 minutes. A target that can't hear the drone automatically succeeds on the save. The effect on the target ends if it takes damage or if another target takes an action to splash it with holy water. If a target's saving throw is successful or the effect ends for it, it is immune to the drone for the next 24 hours.",
		"reference": "(Chasme, pp. 57, MM)"
	},
	{
		"name": "Drow Magic",
		"text": "The creature knows the dancing lights cantrip. When it reaches 3rd level, it can cast the faerie fire spell once per day. When it reaches 5th level, it can also cast the darkness spell once per day. Charisma is its spellcasting ability for these spells.",
		"reference": "(Drow, pp. 24, PH)"
	},
	{
		"name": "Drow Weapon Training",
		"text": "The creature has proficiency with rapiers, shortswords, and hand crossbows.",
		"reference": "(Drow, pp. 24, PH)"
	},
	{
		"name": "Duergar Magic",
		"text": "When the creature reaches 3rd level it can cast the enlarge\/reduce spell on itself once with this trait, using only the spell’s enlarge option. When it reaches 5th level, it can cast the invisibility spell on itself once with this trait. It doesn’t need material components for either spell, and it can’t cast them while it’s in direct sunlight, although sunlight has no effect on them once cast. It regains the ability to cast these spells with this trait when it finishes a long rest. Intelligence is its’s spellcasting ability for these spells.",
		"reference": "(Duergar, pp. 104, SCAG)"
	},
	{
		"name": "Duergar Resilience",
		"text": "The creature has advantage on saving throws against poison, spells, and illusions, as well as to resist being charmed or paralyzed.",
		"reference": "(Duergar, pp. 122, MM)"
	},
	{
		"name": "Duergar Resilience",
		"text": "The creature has advantage on saving throws against illusions and against being charmed or paralysed.",
		"reference": "(Duergar, pp. 104, SCAG)"
	},
	{
		"name": "Dwarven Armor Training",
		"text": "The creature has proficiency with light and medium armor.",
		"reference": "(Mountain Dwarf, pp. 20, PH)"
	},
	{
		"name": "Dwarven Combat Training",
		"text": "The creature has proficiency with the battleaxe, handaxe, throwing (light) hammer, and warhammer.",
		"reference": "(Dwarf, pp. 20, PH)"
	},
	{
		"name": "Dwarven Resilience",
		"text": "The creature has advantage on saving throws against poison, and it has resistance against poison damage.",
		"reference": "(Dwarf, pp. 20, PH)"
	},
	{
		"name": "Dwarven Toughness",
		"text": "The creatures hit point maximum increases by 1, and increases by 1 every time it gains a level.",
		"reference": "(Hill Dwarf, pp. 20, PH)"
	},
	{
		"name": "Earthen Defeat",
		"text": "When the creature drops to 0 hit points, it’s body transforms into mud and collapses into a pool. Anything he is wearing or carrying is left behind.",
		"reference": "(Marlos Urnrayle, pp. 199, PotA)"
	},
	{
		"name": "Earthen Passage",
		"text": "The creature can move in difficult terrain composed of anything made from earth or stone as if it were normal terrain. It can move through solid earth and rock as if it were difficult terrain. If it ends it’s turn there, it is shunted into the nearest space it last occupied.",
		"reference": "(Marlos Urnrayle, pp. 199, PotA)"
	},
	{
		"name": "Earth Glide",
		"text": "The creature can burrow through nonmagical, unworked earth and stone. While doing so, the creature doesn’t disturb the material it moves through.",
		"reference": "(Earth Elemental, pp. 124, MM)"
	},
	{
		"name": "Earth Walk",
		"text": "The creature can move across difficult terrain made of earth or stone without expending extra movement.",
		"reference": "(Earth Genasi, pp. 9, EEPH)"
	},
	{
		"name": "Echolocation",
		"text": "The creature can’t use its blindsight while deafened.",
		"reference": "(Darkmantle, pp. 46, MM)"
	},
	{
		"name": "Eerie Resemblance",
		"text": "The creature resembles a beholder. A target that can see the creature can discern its true nature with a successful DC 15 Intelligence (Nature) check.",
		"reference": "(Gas Spore, pp. 138, MM)"
	},
	{
		"name": "Elemental Demise",
		"text": "If the creature dies, its body disintegrates into (associated element) leaving behind only equipment the creature was wearing or carrying.",
		"reference": "(Dao, pp. 143, MM)"
	},
	{
		"name": "Elf Weapon Training",
		"text": "The creature has proficiency with the longsword, shortsword, shortbow, and longbow.",
		"reference": "(High Elf, pp. 23, PH)"
	},
	{
		"name": "Empowered Attacks",
		"text": "The creature’s attacks are treated as magical for the purpose of bypassing resistance and immunity to nonmagical weapons.",
		"reference": "(Imix, pp. 214, PotA)"
	},
	{
		"name": "Ephemeral",
		"text": "The creature can’t wear or carry anything.",
		"reference": "(Will-o’Wisp, pp. 301, MM)"
	},
	{
		"name": "Ethereal Jaunt",
		"text": "As a bonus action, the creature can magically shift from the Material Plane to the Ethereal Plane, or vice versa",
		"reference": "(Phase Spider, pp. 334, MM)"
	},
	{
		"name": "Ethereal Sight",
		"text": "The creature can see 60 feet into the Ethereal Plane when it is on the Material Plane, and vice versa.",
		"reference": "(Ghost, pp. 147, MM)"
	},
	{
		"name": "Evasion",
		"text": "If the creature is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creature instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.",
		"reference": "(Assassin, pp. 343, MM)"
	},
	{
		"name": "Extra Language",
		"text": "The creature can speak, read, and write one extra language of its choice.",
		"reference": "(High Elf, pp. 24, PH)"
	},
	{
		"name": "Extraordinary Feature",
		"text": "The creature has one of the following extraordinary features, determined randomly by rolling a d20 or chosen by the DM",
		"reference": "(Mongrelfolk, pp. 234, CoS)"
	},
	{
		"name": "False Appearance",
		"text": "While the creature remains motionless, it is indistinguishable from an object (pick most suitable, likely statue).",
		"reference": "(Gargoyle, pp. 140, MM)"
	},
	{
		"name": "Fanatical Advantage",
		"text": "Once per turn, if the creature makes a weapon attack with advantage on the attack roll and hits, it deals an extra X damage.",
		"reference": "(Dragonclaw, pp. 89, HotDQ)"
	},
	{
		"name": "Faultless Tracker",
		"text": "The creature is given a quarry by its summoner. The creature knows the direction and distance to its quarry as long as the two of them are on the same plane of existence. The creature also knows the location of its summoner.",
		"reference": "(Invisible Stalker, pp. 192, MM)"
	},
	{
		"name": "Fear Aura",
		"text": "Any hostile target to the creature that starts its turn within 20 feet of the creature must make a Wisdom saving throw (DC = 8 + proficiency bonus + Charisma modifier), unless the creature is incapacitated. On a failed save, the target is frightened until the start of its next turn. If the target’s saving throw is successful, the target is immune to the creature’s Fear Aura for the next 24 hours.",
		"reference": "(Pit Fiend, pp. 76, MM)"
	},
	{
		"name": "Fear of Damage",
		"text": "If the creature takes X type of damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.",
		"reference": "(Yeti, pp. 305, MM)"
	},
	{
		"name": "Feat",
		"text": "The creature gains one feat of its choice.",
		"reference": "(Human, pp. 31, PH)"
	},
	{
		"name": "Feral",
		"text": "The creature’s intelligence increases by 1, and its Dexterity score increases by 2.",
		"reference": "(Tiefling Variants, pp. 118, SCAG)"
	},
	{
		"name": "Fey Ancestry",
		"text": "The creature has advantage on saving throws against being charmed, and magic can’t put the creature to sleep.",
		"reference": "(Drow, pp. 128, MM)"
	},
	{
		"name": "Fey Step",
		"text": "The creature can cast the misty step spell once per short or long rest.",
		"reference": "(Eladrin, pp. 286, DMG)"
	},
	{
		"name": "Fiendish Blessing",
		"text": "The AC of the creature includes its Charisma modifier.",
		"reference": "(Cambion, pp. 36, MM)"
	},
	{
		"name": "Fire Aura",
		"text": "At the start of each of the creature’s turns, each creature within 5 feet of it takes X fire damage, and flammable objects in the aura that aren’t being worn or carried ignite. A target that touches the creature or hits it with a melee attack while within 5 feet of it takes Y fire damage.",
		"reference": "(Balor, pp. 55, MM)"
	},
	{
		"name": "Fire Form",
		"text": "The creature can move through a space as narrow as 1 inch wide without squeezing. Targets that touch the creature or hits it with a melee attack while within 5 feet off it takes X fire damage. In addition, the creature can enter a hostile target's space and stop there. The first time it enters a target’s space on a turn, that target takes Y fire damage and catches fire; until someone takes an action to douse the fire, the target takes Z fire damage at the start of each of its turns.",
		"reference": "(Fire Elemental, pp. 125, MM)"
	},
	{
		"name": "Fleet of Foot",
		"text": "The creature’s base walking speed increases to X feet.",
		"reference": "(Wood Elf, pp. 24, PH)"
	},
	{
		"name": "Flaming Weapon",
		"text": "Recharge after a Short or Long rest. As a bonus action, the creature can wreath one melee weapon it is wielding in flame. The creature is unharmed by this fire, which lasts until the end of the guard’s next turn. While wreathed in flame, the weapon deals an extra X fire damage on a hit.",
		"reference": "(Eternal Flame Guardian, pp. 200, PotA)"
	},
	{
		"name": "Flight",
		"text": "The creature has a flying speed of X feet. To use this speed, it can’t be wearing medium or heavy armor.",
		"reference": "(Aarakocra, pp. 5, EEPH)"
	},
	{
		"name": "Flyby",
		"text": "The creature doesn’t provoke opportunity attacks when it flies out of an enemy’s reach.",
		"reference": "(Pteranodon, pp. 80, MM)"
	},
	{
		"name": "Foul",
		"text": "Any other creature that starts its turn within 10 feet of the creature must succeed on a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) or be poisoned until the start of the target creature’s next turn.",
		"reference": "(Jubilex, pp. 243, OotA)"
	},
	{
		"name": "Freedom of Movement",
		"text": "The creature ignores difficult terrain, and magical effects can’t reduce its speed or cause it to be restrained. It can spend 5 feet of movement to escape from nonmagical restraints or being grappled.",
		"reference": "(Kraken, pp. 197, MM)"
	},
	{
		"name": "Freeze",
		"text": "If the creature takes cold damage, it partially freezes, its speed is reduced by 20 feet until the end of its next turn.",
		"reference": "(Water Elemental, pp. 125, MM)"
	},
	{
		"name": "Funeral Pyre",
		"text": "When the creature drops to 0 hit points, it’s body is consumed in a flash of fire and smoke. Anything it was wearing or carrying is left behind among ashes.",
		"reference": "(Vanifer, pp. 203, PotA)"
	},
	{
		"name": "Fungus Stride",
		"text": "Once on its turn, the creature can use 10 feet of its movement to step magically into one living mushroom or fungus patch within 5 feet and emerge from another within 60 feet of the first one, appearing in an unoccupied space within 5 feet of the second mushroom or fungus patch. The mushrooms and patches must be Large or bigger.",
		"reference": "(Bridesmaid of Zuggtmoy, pp. 230, OotA)"
	},
	{
		"name": "Giant Slayer",
		"text": "Any weapon attack that the creature makes against a giant deals an extra X damage on a hit.",
		"reference": "(Urgala Meltimer, pp. 254, SKT)"
	},
	{
		"name": "Gibbering",
		"text": "The creature babbles incoherently while it can see any target and isn't incapacitated. Each creature that starts its turn within 20 feet of the creature and can hear the gibbering must succeed on a Wisdom saving throw (DC = 8 + proficiency bonus + Wisdom modifier). On a failure, the target can't take reactions until the start of its next turn and rolls a d8 to determine what it does during its turn. On a 1 to 4, the target does nothing. On a 5 or 6, the target takes no action or bonus action and uses all its movement to move in a randomly determined direction. On a 7 or 8, the target makes a melee attack against a randomly determined target within its reach or does nothing if it can’t make such an attack.",
		"reference": "(Gibbering Mouther pp. 157, MM)"
	},
	{
		"name": "Gnome Cunning",
		"text": "The creature has advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
		"reference": "(Deep Gnome, pp. 164, MM)"
	},
	{
		"name": "Grappler",
		"text": "The creature has advantage on attack rolls against any target grappled by it.",
		"reference": "(Mimic, pp. 220, MM)"
	},
	{
		"name": "Grasping Tendrils",
		"text": "The creature can have up to six tendrils at a time. Each tendril can be attacked (AC 20; 10 hit points; immunity to poison and psychic damage). Destroying a tendril deals no damage to the creature, which can extrude a replacement tendril on its next turn. A tendril can also be broken if a target takes an action and succeeds on a Strength check (DC = 8 + proficiency bonus + Strength modifier) against it.",
		"reference": "(Roper, pp. 261, MM)"
	},
	{
		"name": "Grim Harvest",
		"text": "Once per turn when the creature kills one or more targets with a spell of 1st level or higher, it regains hit points equal to twice the spell’s level.",
		"reference": "(Oreioth, pp. 211, PotA)"
	},
	{
		"name": "Gruumsh’s Fury",
		"text": "The creature deals an extra X damage when it hits with a weapon attack (included in the attack).",
		"reference": "(Orc War Chief, pp. 246, MM)"
	},
	{
		"name": "Guiding Wind",
		"text": "Recharges after a Short or Long rest. As a bonus action, the creature gains advantage on the next ranged attack roll it makes before the end of it’s next turn.",
		"reference": "(Howling Hatred Initiate, pp. 190, PotA)"
	},
	{
		"name": "Halfling Nimbleness",
		"text": "The creature can move through the space of any creature that is of a size larger than it.",
		"reference": "(Halfling, pp. 28, PH)"
	},
	{
		"name": "Heart of Hruggek",
		"text": "The creature has advantage on saving throws against being charmed, frightened, paralyzed, poisoned, stunned, or put to sleep.",
		"reference": "(Bugbear Chief, pp. 33, MM)"
	},
	{
		"name": "Heated Body",
		"text": "A target that touches the creature or hits it with a melee attack while within 5 feet of it takes X fire damage.",
		"reference": "(Azer, pp. 22, MM)"
	},
	{
		"name": "Heated Weapon",
		"text": "When the creature hits with a metal melee weapon, it deals an extra X fire damage (included in the attack).",
		"reference": "(Azer, pp. 22, MM)"
	},
	{
		"name": "Hellfire",
		"text": "Once the creature reaches 3rd level, it can cast the burning hands spell once as a 2nd-level spell. It must finish a long rest to cast this spell again.",
		"reference": "(Tiefling Variant, pp. 118, SCAG)"
	},
	{
		"name": "Hellish Weapons",
		"text": "The creature’s weapon attacks are magical and deal an extra X poison damage on a hit (included in the attack).",
		"reference": "(Erinyes, pp. 73, MM)"
	},
	{
		"name": "Hellish Rejuvenation",
		"text": "If the creature dies in the Nine Hells it comes back to life with all its hit points in 1d10 days unless it is killed by a good-aligned creature with a bless spell cast on that creature or its remains are sprinkled with holy water.",
		"reference": "(Lemure, pp. 76, MM)"
	},
	{
		"name": "Hellish Resistance",
		"text": "The creature has resistance to fire damage.",
		"reference": "(Tiefling, pp. 43, PH)"
	},
	{
		"name": "Hold Breath",
		"text": "The creature can hold its breath for X length of time.",
		"reference": "(Lizardfolk, pp. 204, MM)"
	},
	{
		"name": "Horrific Appearance",
		"text": "Any humanoid that starts its turn within 30 feet of the creature and can see the creature's true form must make a Wisdom saving throw (DC = 8 + proficiency bonus + Charisma modifier). On a failed save, the humanoid is frightened for 1 minute. A humanoid can repeat the saving throw at the end of each of its turns, with disadvantage if the creature is within line of sight, ending the effect on itself on a success. If a humanoid’s saving throw is successful or the effect ends for it, the humanoid is immune to the creature's Horrific Appearance for the next 24 hours. Unless the humanoid is surprised or the revelation of the creature’s true form is sudden, the humanoid can avert its eyes and avoid making the initial saving throw. Until the start of its next turn, a humanoid that averts its eyes has disadvantage on attack rolls against the creature.",
		"reference": "(Sea Hag, pp. 179, MM)"
	},
	{
		"name": "Howling Defeat",
		"text": "When the creature drops to 0 hit points, it’s body disappears in a howling whirlwind that disperses quickly and harmlessly. Anything it is wearing or carrying is left behind.",
		"reference": "(Aerisi Kalinoth, pp. 192, PotA)"
	},
	{
		"name": "Ice Walk",
		"text": "The creature can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn’t cost it extra movement.",
		"reference": "(Ancient White Dragon, pp. 100, MM)"
	},
	{
		"name": "Ignite Enemy",
		"text": "If the creature deals fire damage to a target while wearing the Mask of the Dragon Queen, the target catches fire. At the start of each of it’s turns, the burning target takes X fire damage. A target within reach of the fire can use an action to extinguish it.",
		"reference": "(Severin, pp. 92, RoT)"
	},
	{
		"name": "Ignited Illumination",
		"text": "As a bonus action, the creature can set itself ablaze or extinguish its flames. While ablaze, the creature sheds bright light in a 10-foot radius and dim light for an additional 10 feet.",
		"reference": "(Magmin, pp. 212, MM)"
	},
	{
		"name": "Illumination",
		"text": "The creature sheds either dim light in a X-foot radius, or bright light in a Y-foot radius and dim light for an additional Z feet. It can switch between the options as an action.",
		"reference": "(Flameskull, pp. 134, MM)"
	},
	{
		"name": "Immolation",
		"text": "When the creature is reduced to 0 hit points, it’s body disintegrates into a pile of ash.",
		"reference": "(Rezmir, pp. 92, HotDQ)"
	},
	{
		"name": "Immutable Form",
		"text": "The creature is immune to any spell or effect that would alter its form.",
		"reference": "(Clay Golem, pp. 168, MM)"
	},
	{
		"name": "Improved Critical",
		"text": "The creature’s weapon attacks score a critical hit on a roll of 19 or 20.",
		"reference": "(Langedrosa Cyanwrath, pp. 91, HotDQ)"
	},
	{
		"name": "Incorporeal Movement",
		"text": "The creature can move through other creatures and objects as if they were difficult terrain. It takes X force damage if it ends its turn inside an object.",
		"reference": "(Ghost, pp. 147, MM)"
	},
	{
		"name": "Indomitable",
		"text": "Recharges after a Short or Long rest. The creature can reroll a saving throw that it fails. It must use the new roll.",
		"reference": "(Drannin Splithelm, pp. 209, PotA)"
	},
	{
		"name": "Infernal Legacy",
		"text": "The creature knows the thaumaturgy cantrip. Once it reaches 3rd level, it can cast the hellish rebuke spell once per day as a 2nd-level spell. Once it reaches 5th level, it can also cast the darkness spell once per day. Charisma is the creature’s spellcasting ability for these spells.",
		"reference": "(Tiefling, pp. 43, PH)"
	},
	{
		"name": "Innate Spellcasting",
		"text": "The creature can innately cast a number of spells, requiring no material components.",
		"reference": "(Djinni, pp. 144, MM)"
	},
	{
		"name": "Insanity",
		"text": "The creature has advantage on saving throws against being charmed or frightened.",
		"reference": "(Derro, pp. 224, OotA)"
	},
	{
		"name": "Inscrutable",
		"text": "The creature is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom (Insight) checks made to ascertain the creatures’ intentions or sincerity have disadvantage.",
		"reference": "(Androsphinx, pp. 281, MM)"
	},
	{
		"name": "Invisibility",
		"text": "The creature is invisible.",
		"reference": "(Invisible Stalker, pp. 192, MM)"
	},
	{
		"name": "Invisible in Water",
		"text": "The creature is invisible while fully immersed in water.",
		"reference": "(Water Weird, pp. 299)"
	},
	{
		"name": "Iron Scent",
		"text": "The creature can pinpoint, by scent, the location of ferrous metal within 30 feet of it.",
		"reference": "(Rust Monster, pp. 262, MM)"
	},
	{
		"name": "Keen Senses",
		"text": "The creature has advantage on Wisdom (Perception) checks that rely on the associated sense.",
		"reference": "(Griffon, pp. 174, MM)"
	},
	{
		"name": "Keen Senses (Elf racial)",
		"text": "The creature has proficiency in the Perception skill.",
		"reference": "(Elf, pp. 23, PH)"
	},
	{
		"name": "Labyrinthine Recall",
		"text": "The creature can perfectly recall any path it has travelled.",
		"reference": "(Minotaur, pp. 223, MM)"
	},
	{
		"name": "Legendary Resistance",
		"text": "If the creature fails a saving throw, it can choose to succeed instead. (1-3 per day typically)",
		"reference": "(Ancient Green Dragon, pp. 93, MM)"
	},
	{
		"name": "Light Sensitivity",
		"text": "While in bright light, the demon has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
		"reference": "(Cloaker, pp. 41, MM)"
	},
	{
		"name": "Limited Amphibiousness",
		"text": "The creature can breathe air and water, but needs to be submerged at least once every 4 hours to avoid suffocating.",
		"reference": "(Saguagin Baron, pp. 264, MM)"
	},
	{
		"name": "Limited Flight",
		"text": "The creature can use a bonus action to gain a flying speed of 30 feet until the end of it’s turn.",
		"reference": "(Dragonfang, pp. 89, RoT)"
	},
	{
		"name": "Limited Magic Immunity",
		"text": "The creature is immune to spells of 6th level or lower unless it wishes to be affected. It has advantage on saving throws against all other spells and magical effects.",
		"reference": "(Rakshasa, pp. 257, MM)"
	},
	{
		"name": "Limited Spines",
		"text": "The creature has twelve spines. Used spines regrow by the time the creature finishes a long rest.",
		"reference": "(Spined Devil, pp. 78, MM)"
	},
	{
		"name": "Limited Telepathy",
		"text": "The creature can magically communicate simple ideas, emotions and images telepathically to any target within 100 feet if that target understands at least one language.",
		"reference": "(Pseudodragon, pp. 254, MM)"
	},
	{
		"name": "Limited Telepathy",
		"text": "Using telepathy, the creature can magically communicate with any other faerie dragon within 60 feet.",
		"reference": "(Faerie Dragon, pp. 133, MM)"
	},
	{
		"name": "Limited Telepathy",
		"text": "The creature can magically transmit simple messages and images to any creature within 120 feet of it that can understand a language. This form of telepathy doesn’t allow the receiving creature to telepathically respond.",
		"reference": "(Otyugh, pp. 248, MM)"
	},
	{
		"name": "Living Shadow",
		"text": "While in dim light or darkness, the creature has resistance to damage that isn’t force, psychic or radiant.",
		"reference": "(Young Red Shadow Dragon, pp. 85, MM)"
	},
	{
		"name": "Lucky",
		"text": "When the creature rolls a 1 on an attack roll, ability check, or saving throw, it can reroll the die and must use the new roll.",
		"reference": "(Halfling, pp. 28, PH)"
	},
	{
		"name": "Magic Resistance",
		"text": "The creature has advantage on saving throws against spells and other magical effects.",
		"reference": "(Erinyes, pp. 73, MM)"
	},
	{
		"name": "Magic Weapons",
		"text": "The creatures’ weapon attacks are magical.",
		"reference": "(Empyrean, pp. 130, MM)"
	},
	{
		"name": "Malison Type",
		"text": "The creature has one of the following types",
		"reference": "(Yuan-ti Maliaon, pp. 309)"
	},
	{
		"name": "Marshal Undead",
		"text": "Unless the creature is incapacitated, it and undead creatures of its choice within 60 feet of it have advantage on saving throws against features that turn undead.",
		"reference": "(Death Knight, pp. 47, MM)"
	},
	{
		"name": "Martial Advantage",
		"text": "Once per turn, the creature can deal an extra X damage to a target it hits with a weapon attack if that creature is within 5 feet of an ally of the creature that isn’t incapacitated.",
		"reference": "(Hobgoblin, pp. 186, MM)"
	},
	{
		"name": "Mask of the Wild",
		"text": "The creature can attempt to hide even when it is only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
		"reference": "(Wood Elf, pp. 24, PH)"
	},
	{
		"name": "Master of Undeath",
		"text": "When the creature casts animate dead or create undead, it chooses the level at which the spell is cast, and the creatures created by the spells remain under its control indefinitely. Additionally, it can cast create undead even when it isn’t night.",
		"reference": "(Orcus, pp. 245. OotA)"
	},
	{
		"name": "Menacing",
		"text": "The creature gains proficiency in the Intimidation skill.",
		"reference": "(Half-Orc, pp. 41, PH)"
	},
	{
		"name": "Merge with Stone",
		"text": "The creature can cast the pass without trace spell once per long rest. Constitution is its spellcasting ability for this spell.",
		"reference": "(Earth Genasi, pp. 9, EEPH)"
	},
	{
		"name": "Mimicry",
		"text": "The creature can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful Wisdom (Insight) check (DC = 8 + proficiency bonus + Charisma modifier).",
		"reference": "(Kenku, pp. 194, MM)"
	},
	{
		"name": "Mingle with the Wind",
		"text": "The creature can cast the levitate spell once per long rest. Constitution is the creature’s spellcasting ability for this spell.",
		"reference": "(Air Genasi, pp. 9, EEPH)"
	},
	{
		"name": "Misty Escape",
		"text": "When it drops to 0 hit points outside its resting place, the creature transforms into a cloud of mist (as in the Shapechanger trait) instead of falling unconscious, provided that it isn't in sunlight or running water. If it can't transform, it is destroyed. While it has 0 hit points in mist form, it can’t revert to its creature form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it reverts to its creature form. It is then paralysed until it regains at least 1 hit point. After spending 1 hour in its resting place with 0 hit points, it regains 1 hit point.",
		"reference": "(Vampire, pp. 297, MM)"
	},
	{
		"name": "Mountain Born",
		"text": "The creature is acclimated to high altitude, including elevations above 20,000 feet. It is also naturally adapted to cold climates, as described on page 110 DMG.",
		"reference": "(Goliath, pp. 11, EEPH)"
	},
	{
		"name": "Mucous Cloud",
		"text": "While underwater, the creature is surrounded by transformative mucus. A target that touches the creature or that hits it with a melee attack while within 5 feet of it must make a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier). On a failure, the target is diseased for 1d4 hours. The diseased target can breathe only underwater.",
		"reference": "(Aboleth, pp.12, MM)"
	},
	{
		"name": "Multiple Heads",
		"text": "The creature has X heads. While it has more than one head, the creature has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious. Whenever the creature takes Y or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies. At the end of its turn, it grows Z heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains A hit points for each head regrown in this way.",
		"reference": "(Hydra, pp. 190, MM)"
	},
	{
		"name": "Mushroom Portal",
		"text": "The creature counts as a mushroom for the Fungus Stride feature.",
		"reference": "(Chamberlain of Zuggtmoy, pp. 230, OotA)"
	},
	{
		"name": "Natural Athlete",
		"text": "The creature is proficient in the Athletics skill.",
		"reference": "(Goliath, pp. 11, EEPH)"
	},
	{
		"name": "Natural Illusionist",
		"text": "The creature knows the minor illusion cantrip. Intelligence is its spellcasting ability for it.",
		"reference": "(Forest Gnome, pp. 37, PH)"
	},
	{
		"name": "Naturally Stealthy",
		"text": "The creature can attempt to hide even when it is obscured only by a target that is at least one size larger than it.",
		"reference": "(Lightfoot Halfling, pp. 28, PH)"
	},
	{
		"name": "Negative Energy Cone",
		"text": "The creature's central eye emits an invisible, magical 150foot cone of negative energy. At the start of each of its turns, the creature decides which way the cone faces and whether the cone is active. Any target in that area can't regain hit points. Any humanoid that dies there becomes a zombie under the creature’s command. The dead humanoid retains its place in the initiative order and animates at the start of its next turn, provided that its body hasn't been completely destroyed.",
		"reference": "(Death Tyrant, pp. 29, MM)"
	},
	{
		"name": "Nimble Escape",
		"text": "The creature can take the Disengage or Hide action as a bonus action on each of its turns.",
		"reference": "(Goblin, pp. 163, MM)"
	},
	{
		"name": "Nondetection",
		"text": "The creature can’ t be targeted or detected by any divination magic or perceived through magical scrying sensors.",
		"reference": "(Crag Cat, pp. 240, SKT)"
	},
	{
		"name": "Olyhydra’s Armor",
		"text": "The creature can cast mage armor at will, without expending material components.",
		"reference": "(Fathomer, pp. 207, PotA)"
	},
	{
		"name": "Ooze Cube",
		"text": "The creature takes up its entire space. Other targets can enter the space, but a target that does so is subjected to the creature's Engulf action and has disadvantage on the saving throw. Targets inside the creature can be seen but have total cover. A target within 5 feet of the creature can take an action to pull a target or object out of the creature. Doing so requires a successful Strength check (DC = 8 + proficiency bonus + Strength modifier), and the target making the attempt takes X acid damage. The creature can hold only one Large creature or up to four Medium or smaller creatures inside it at a time.",
		"reference": "(Gelatinous Cube, pp. 242, MM)"
	},
	{
		"name": "Otherworldly Perception",
		"text": "The creature can sense the presence of any creature within 30 feet of it that is invisible or on the Ethereal Plane. It can pinpoint such a creature that is moving.",
		"reference": "(Kuo-toa, pp. 199, MM)"
	},
	{
		"name": "Pack Tactics",
		"text": "The creature has advantage on an attack roll against a target if at least one of the creature’s allies is within 5 feet of the creature and the ally isn’t incapacitated.",
		"reference": "(Kobold, pp. 195, MM)"
	},
	{
		"name": "Petrifying Gaze",
		"text": "If a target starts its turn within 30 feet of the creature and the two of them can see each other, the creature can force the target to make a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) if the creature isn't incapacitated. On a failed save, the target magically begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the target is petrified until freed by the greater restoration spell or other magic. A target that isn't surprised can avert its eyes to avoid the saving throw at the start of its turn. If it does so, it can't see the creature until the start of its next turn, when it can avert its eyes again. If it looks at the creature in the meantime, it must immediately make the save. If the creature sees its reflection within 30 feet of it in bright light, it mistakes itself for a rival and targets itself with its gaze.",
		"reference": "(Basilisk, pp. 24, MM)"
	},
	{
		"name": "Petrifying Gaze",
		"text": "When a target which can see the creature’s eyes starts its turn within 30 feet of the creature the creature can force the target to make a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) if the creature isn't incapacitated and can see the target. If the saving throw fails by 5 or more the target is instantly petrified. Otherwise on a failed save, the target magically begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the target is petrified until freed by the greater restoration spell or other magic. A target that isn't surprised can avert its eyes to avoid the saving throw at the start of its turn. If it does so, it can't see the creature until the start of its next turn, when it can avert its eyes again. If it looks at the creature in the meantime, it must immediately make the save. If the creature sees itself on a polished surface within 30 feet of it and in an area of bright light the creature is, due to its curse, affected by its own gaze.",
		"reference": "(Medusa, pp. 214, MM)"
	},
	{
		"name": "Poison Sense",
		"text": "A creature can detect whether a substance is poisonous by taste, touch, or smell.",
		"reference": "(Tressym, pp. 242, SKT)"
	},
	{
		"name": "Poison Spores",
		"text": "Whenever the creature takes damage, it releases a cloud of spores. Other creatures within 5 feet of the creature when this happens must succeed on a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) or be poisoned for one minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
		"reference": "(Chamberlain of Zuggtmoy, pp. 230. OotA)"
	},
	{
		"name": "Poor Depth Perception",
		"text": "The creature has disadvantage on any attack roll against a target more than 30 feet away.",
		"reference": "(Cyclops, pp. 45, MM)"
	},
	{
		"name": "Phalanx Formation",
		"text": "The creature has advantage on attack rolls and Dexterity saving throws while standing within 5 feet of an ally wielding a shield.",
		"reference": "(Duergar Stone Guard, pp. 227, OotA)"
	},
	{
		"name": "Potent Cantrips",
		"text": "When the creature casts an evocation cantrip and misses, or the target succeeds on its saving throw, the target still takes half the cantrip’s damage but suffers no other effect.",
		"reference": "(Azbara Jos, pp. 88, HotDQ)"
	},
	{
		"name": "Pounce",
		"text": "If the creature moves at least X feet straight toward a target and then hits it with a claw attack on the same turn, that target must succeed on a Strength saving throw (DC = 8 + proficiency bonus + Strength modifier) or be knocked prone. If the target is prone, the creature can make one weapon attack against it as a bonus action.",
		"reference": "(Allosaurus, pp. 79, MM)"
	},
	{
		"name": "Powerful Build",
		"text": "The creature counts as one size larger when determining it’s carrying capacity and the weight it can push, drag, or lift.",
		"reference": "(Goliath, pp. 11, EEPH)"
	},
	{
		"name": "Probing Telepathy",
		"text": "If a target communicates telepathically with the creature, the creature learns the target’s greatest desire if the creature can see the target.",
		"reference": "(Aboleth, pp. 13, MM)"
	},
	{
		"name": "Prone Deficiency",
		"text": "If the creature is knocked prone, roll a die. On an odd result, the creature lands upside-down and is incapacitated. At the end of each of its turns, the creature can make a DC 10 Dexterity saving throw, righting itself and ending the incapacitated condition if it succeeds.",
		"reference": "(Fluumph, pp. 135, MM)"
	},
	{
		"name": "Psychic Defense",
		"text": "While the creature is wearing no armor and wielding no shield, its AC includes its Wisdom modifier.",
		"reference": "(Githzerai Monk, pp. 161, MM)"
	},
	{
		"name": "Rampage",
		"text": "When the creature reduces a target to 0 hit points with a melee attack on its turn, the creature can take a bonus action to move up to half its speed and make a weapon attack.",
		"reference": "(Gnoll, pp. 163, MM)"
	},
	{
		"name": "Reach to the Blaze",
		"text": "The creature knows the produce flame cantrip. Once it reaches 3rd level it can cast burning hands once as a 1st level spell per long rest. Constitution is its spellcasting ability for these spells.",
		"reference": "(Fire Genasi, pp. 10, EEPH)"
	},
	{
		"name": "Reactive",
		"text": "The creature can take one reaction on every turn in a combat.",
		"reference": "(Marilith, pp. 61, MM)"
	},
	{
		"name": "Reactive Heads",
		"text": "For each head the creature has beyond one, its gets an extra reaction that can be used only for opportunity attacks.",
		"reference": "(Hydra, pp. 190, MM)"
	},
	{
		"name": "Reckless",
		"text": "At the start of its turn, the creature can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn.",
		"reference": "(Berserker, pp. 344, MM)"
	},
	{
		"name": "Reflective Carapace",
		"text": "Any time the creature is targeted by a magic missile spell, a line spell, or a spell that requires a ranged attack roll, roll a d6. On a 1 to 5, the creature is unaffected. On a 6, the creature is unaffected, and the effect is reflected back at the caster as though it originated from the creature turning the caster into the target.",
		"reference": "(Tarrasque, pp. 286, MM)"
	},
	{
		"name": "Regeneration",
		"text": "The creature regains X hit points at the start of its turn. If the creature takes Y type or Z type damage, this trait doesn’t function at the start of the creature’s next turn. The creature dies\/is destroyed only if it starts its turn with 0 hit points and doesn’t regenerate.",
		"reference": "(Troll, pp. 291, MM)"
	},
	{
		"name": "Regeneration",
		"text": "The creature regains X hit points at the start of its turn if it has at least Y hit points.",
		"reference": "(Oni , pp. 239, MM)"
	},
	{
		"name": "Rejuvenation",
		"text": "If it has a phylactery, a destroyed creature gains a new body in 1d10 days, regaining all its hit points and becoming active again. The new body appears within 5 feet of the phylactery.",
		"reference": "(Lich, pp. 202, MM)"
	},
	{
		"name": "Rejuvenation",
		"text": "If the creature is destroyed, it regains all its hit points in 1 hour unless holy water is sprinkled on its remains or a dispel magic or remove curse spell is cast on them.",
		"reference": "(Flame Skull, pp. 134, MM)"
	},
	{
		"name": "Rejuvenation",
		"text": "A destroyed creature gains a new body in 24 hours if its heart is intact, regaining all its hit points and becoming active again. The new body appears within 5 feet of the creature’s heart.",
		"reference": "(Mummy Lord, pp. 229, MM)"
	},
	{
		"name": "Rejuvenation",
		"text": "If it dies, the creature returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning.",
		"reference": "(Guardian Naga, pp. 234, MM)"
	},
	{
		"name": "Rejuvenation",
		"text": "When the creature’s body is destroyed, its soul lingers. After 24 hours, the soul inhabits and animates another corpse on the same plane of existence and regains all of its hit points. While the soul is bodiless, a wish spell can be used to force the soul to go to the afterlife and not return.",
		"reference": "(Revenant, pp. 259, MM)"
	},
	{
		"name": "Relentless",
		"text": "Recharges after a Short or Long rest. If the creature takes X damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead.",
		"reference": "(Boar, pp. 319, MM)"
	},
	{
		"name": "Relentless Endurance",
		"text": "When the creature is reduced to 0 hit points but not killed outright, it can drop to 1 hit point instead. The creature can’t use this feature again until it finishes a long rest.",
		"reference": "(Half-Orc, pp. 41, PH)"
	},
	{
		"name": "Rolling Charge",
		"text": "If the creature rolls at least X feet straight toward a target and then hits it with a slam attack on the same turn, the target takes an extra Y bludgeoning damage. If the target is a creature, it must succeed on a Strength saving throw (DC = 8 + proficiency bonus + Strength modifier) or be knocked prone.",
		"reference": "(Galeb Duhr, pp. 139, MM)"
	},
	{
		"name": "Running Leap",
		"text": "The creature’s long jump is up to X feet and its high jump is up to Y feet when it has a running start.",
		"reference": "(Barlgura, pp. 56, MM)"
	},
	{
		"name": "Rust Metal",
		"text": "Any nonmagical weapon made of metal that hits the creature corrodes. After dealing damage, the weapon takes a permanent and cumulative 1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the creature is destroyed after dealing damage.",
		"reference": "(Rust Monster, pp. 262, MM)"
	},
	{
		"name": "Savage Attacks",
		"text": "When the creature scores a critical hit with a melee weapon attack, it can roll one of the weapon’s damage dice one additional time and add it to the extra damage of the critical.",
		"reference": "(Half-Orc, pp. 41, PH)"
	},
	{
		"name": "Sculpt Spells",
		"text": "When the creature casts an evocation spell that affects other targets that it can see, it can choose a number of them equal to 1 + the spell’s level to succeed on their saving throws against the spell. Those targets take no damage if they would normally take half damage from the spell.",
		"reference": "(Azbara Jos, pp. 88, HotDQ)"
	},
	{
		"name": "Searing Armor",
		"text": "The creature’s armor is hot. Any target grappling the creature or grappled by it takes X fire damage at the end of that target’s turn.",
		"reference": "(Razerblast, pp. 201, PotA)"
	},
	{
		"name": "Second Wind",
		"text": "Recharges after a Short or Long rest. The creature can use a bonus action to regain X hit points.",
		"reference": "(Drannin Splithelm, pp. 209, PotA)"
	},
	{
		"name": "Sense Magic",
		"text": "The creature senses magic within X feet of it at will. This trait otherwise works like the detect magic spell but isn’t itself magical.",
		"reference": "(Chuul, pp. 40, MM)"
	},
	{
		"name": "Shadow Stealth",
		"text": "While in dim light or darkness, the creature can take the Hide action as a bonus action.",
		"reference": "(Shadow, pp. 269, MM)"
	},
	{
		"name": "Shapechanger",
		"text": "The creature can use its action to polymorph into X hybrid or Y beast, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies.",
		"reference": "(Werewolf, pp. 211, MM)"
	},
	{
		"name": "Shapechanger",
		"text": "The creature can use it’s action to polymorph into a Small or Medium humanoid it has seen, or back into it’s true form. It’s statistics, other than it’s size, are the same in each form. Any equipment it is carrying or wearing isn’t transformed with it. It reverts to it’s true form if it dies.",
		"reference": "(Doppelganger, pp. 82, MM)"
	},
	{
		"name": "Shark Telepathy",
		"text": "The creature can magically command any shark within 120 feet of it, using a limited telepathy.",
		"reference": "(Sahuagin Priestess, pp. 264, MM)"
	},
	{
		"name": "Shell Camouflage",
		"text": "While the creature remains motionless with its limbs and appendages tucked close to its body, it resembles a natural formation or a pile of detritus. A creature within 30 feet of it can discern its true nature with a successful DC 15 Intelligence (Nature) check.",
		"reference": "(Hulking Crab, pp. 241, SKT)"
	},
	{
		"name": "Shielded Mind",
		"text": "The creature is immune to scrying and to any effect that would sense its emotions, read its thoughts or detect its location.",
		"reference": "(Coautl, pp. 43, MM)"
	},
	{
		"name": "Shrapnel Explosion",
		"text": "When the creature drops to 0 hit points, a flaming orb in its chest explodes, destroying the creature’s body and scattering its armor as shrapnel. Targets within X feet of the creature when it explodes must succeed on a Dexterity saving throw (DC = 8 + proficiency bonus + Charisma modifier), taking Y piercing damage on a failed save, or half as much damage on a successful one.",
		"reference": "(Razerblast, pp. 201, PotA)"
	},
	{
		"name": "Siege Monster",
		"text": "The creature deals double damage to objects and structures.",
		"reference": "(Kraken, pp. 197, MM)"
	},
	{
		"name": "Silent Speech",
		"text": "The creature can speak telepathically to any creature within 30 feet of it. The target creature understands it only if the two creatures share a language. It can speak telepathically in this way to one creature at a time.",
		"reference": "(Ghostwise Halflings, pp. 109, SCAG)"
	},
	{
		"name": "Slippery",
		"text": "The creature has advantage on ability checks and saving throws made to escape a grapple.",
		"reference": "(Kuo-toa, pp. 199, MM)"
	},
	{
		"name": "Skewer",
		"text": "Once per turn, when the creature makes a melee attack with its trident and hits, the target takes an extra X damage, and the creature gains temporary hit points equal to the extra damage dealt.",
		"reference": "(Lizard King\/Queen, pp. 205, MM)"
	},
	{
		"name": "Skill Versatility",
		"text": "The creature gains proficiency in two skills of its choice.",
		"reference": "(Half-Elf, pp. 39, PH)"
	},
	{
		"name": "Skills",
		"text": "The creature gains proficiency in one skill of its choice.",
		"reference": "(Human, pp. 30, PH)"
	},
	{
		"name": "Sneak Attack",
		"text": "X\/Turn. The creature deals an extra Y damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 feet of an ally of the creature that isn't incapacitated and the creature doesn’t have disadvantage on the attack roll.",
		"reference": "(Assassin, pp. 343, MM)"
	},
	{
		"name": "Speak with Beasts and Plants",
		"text": "The creature can communicate with beasts and plants as if they shared a language.",
		"reference": "(Dryad, pp. 121, MM)"
	},
	{
		"name": "Speak with Frogs and Toads",
		"text": "The creature can communicate simple concepts to frogs and toads when it speaks in Bullywug.",
		"reference": "(Bullywug, pp. 35, MM)"
	},
	{
		"name": "Speak with Small Beasts",
		"text": "Through sounds and gestures, the creature can communicate simple ideas with Small or smaller beasts.",
		"reference": "(Forest Gnome, pp. 37, PH)"
	},
	{
		"name": "Spectral Armor and Shield",
		"text": "The creature’s AC accounts for its spectral armor and shield.",
		"reference": "(Phantom Warrior, pp. 235, CoS)"
	},
	{
		"name": "Spell Turning",
		"text": "The creature has advantage on saving throws against any spell which targets only the creature and not an area. If the creature’s saving throw succeeds and the spell is of 7th level or lower, the spell has no effect on the creature and instead targets the caster.",
		"reference": "(Crag Cat, pp. 240, SKT)"
	},
	{
		"name": "Spell Storing",
		"text": "A spellcaster who wears the creature’s amulet (See Bound) can cause the creature to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the creature. The spell has no effect but is stored within the creature. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the creature casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost.",
		"reference": "(Shield Guardian, pp. 271, MM)"
	},
	{
		"name": "Special Equipment",
		"text": "The creature is equipped with X\/Y\/Z etc items.",
		"reference": "(Rath Modar, pp. 92, HotDQ)."
	},
	{
		"name": "Spellcasting",
		"text": "The creature has the ability to cast spells using a class system.",
		"reference": "(Archmage, pp. 342, MM)"
	},
	{
		"name": "Spell Immunity",
		"text": "The creature is immune to three spells chosen by its creator. Typical immunities include fireball, heat metal, and lightning bolt.",
		"reference": "(Helmed Horror, pp. 183, MM)"
	},
	{
		"name": "Spider Climb",
		"text": "The creature can climb difficult surfaces, including upside down on ceilings, without needing to make ability check.",
		"reference": "(Ettercap, pp. 131, MM)"
	},
	{
		"name": "Standing Leap",
		"text": "The creature’s long jump is up to X feet and its high jump is up to Y feet, with or without a running start.",
		"reference": "(Bulette, pp. 34, MM)"
	},
	{
		"name": "Steadfast",
		"text": "The creature can’t be frightened while it can see an allied creature within 30 feet of it.",
		"reference": "(Bearded Devil, pp. 70, MM)"
	},
	{
		"name": "Stench",
		"text": "Any target other than the creature that starts its turn within 5 feet of the creature must succeed on a Constitution saving throw (DC = 8 + proficiency bonus + Constitution modifier) or be poisoned until the start of the target’s next turn. On a successful saving throw, the creature is immune to the Stench of all creatures for 1 hour.",
		"reference": "(Troglodyte, pp. 290, MM)"
	},
	{
		"name": "Stonecunning",
		"text": "Whenever the creature makes an Intelligence (History) check related to the origin of stonework, the creature is considered proficient in the History skill and adds double its proficiency bonus to the check, instead of its normal proficiency bonus.",
		"reference": "(Dwarf, pp. 20, PH)"
	},
	{
		"name": "Stone’s Endurance",
		"text": "The creature can focus itself to occasionally shrug off injury. When it takes damage, it can use its reaction to roll a d12. Add its Constitution modifier to the number rolled, and reduce the damage by that total. After it uses this trait, it can’t use it again until it finishes a short or long rest.",
		"reference": "(Goliath, pp. 11, EEPH)"
	},
	{
		"name": "Stout Resilience",
		"text": "The creature has advantage on saving throws against poison, and it has resistance against poison.",
		"reference": "(Stout Halfling, pp. 28, PH)"
	},
	{
		"name": "Stunning Strike",
		"text": "Recharge 5-6. When the creature hits a target with a melee weapon attack, the target mus succeed on a Constitution saving throw (DC = 8 + proficiency bonus + Wisdom modifier) or be stunned until the end of the creature’s next turn.",
		"reference": "(Hellenrae, pp. 198, PotA)"
	},
	{
		"name": "Summon Mephits",
		"text": "Recharges after a Long rest. By puffing on it’s pipe, a creature can use an action to cast conjure minor elementals. If it does so, it summons four smoke mephitis.",
		"reference": "(Elizar Dryflagon, pp. 202, PotA)"
	},
	{
		"name": "Sun Sickness",
		"text": "While in sunlight, the creature has disadvantage on ability checks, attack rolls, and saving throws. The creature dies if it spends more than 1 hour in direct sunlight.",
		"reference": "(Myconid Sovereign, pp. 232, MM)"
	},
	{
		"name": "Sunlight Sensitivity",
		"text": "While in sunlight, the creature has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
		"reference": "(Drow Elite Warrior, pp. 128, MM)"
	},
	{
		"name": "Sunlight Weakness",
		"text": "While in sunlight, the creature has disadvantage on attack rolls, ability checks, and saving throws.",
		"reference": "(Shadow, pp. 269, MM)"
	},
	{
		"name": "Superior Darkvision",
		"text": "The creature’s darkvision has a radius of 120 feet.",
		"reference": "(Deep Gnome, pp. 7, EEPH)"
	},
	{
		"name": "Superior Invisibility",
		"text": "As a bonus action, the creature can magically turn invisible until its concentration ends (as if concentrating on a spell). Any equipment the creature wears or carries is invisible with it.",
		"reference": "(Faerie Dragon, pp. 133, MM)"
	},
	{
		"name": "Sure-Footed",
		"text": "The creature has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.",
		"reference": "(Giant Goat, pp. 326, MM)"
	},
	{
		"name": "Surprise Attack",
		"text": "If the creature surprises a target and hits it with an attack during the first round of combat, the target takes an extra X damage from the attack.",
		"reference": "(Bugbear, pp. 33, MM)"
	},
	{
		"name": "Swarm",
		"text": "The creature can occupy another target’s space and vice versa, and the creature can move through any opening large enough for a Tiny creature. The creature can’t regain hit points or gain temporary hit points.",
		"reference": "(Swarm of Bats, pp. 337, MM)"
	},
	{
		"name": "Swift Animation",
		"text": "Recharges after a Long Rest. When a living Medium or Small humanoid within X feet of the creature dies, it can use an action it’s next turn to cast animate dead on that humanoid’s corpse, instead of using the spell’s normal casting time.",
		"reference": "(Oreioth, pp. 211, PotA)"
	},
	{
		"name": "Swim",
		"text": "The creature has a swimming speed of X feet.",
		"reference": "(Water Genasi, pp. 10, EEPH)"
	},
	{
		"name": "Tail Spike Regrowth",
		"text": "The creature has X tail spikes. Used spikes regrow when the creature finishes a long rest.",
		"reference": "(Manticore, pp. 213, MM)"
	},
	{
		"name": "Talons",
		"text": "The creature is proficient with its unarmed strikes, which deal 1d4 slashing damage on a hit.",
		"reference": "(Aarakocra, pp. 5, EEPH)"
	},
	{
		"name": "Telepathic Bond",
		"text": "While the creature is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically.",
		"reference": "(Homunculus, pp. 188, MM)"
	},
	{
		"name": "Telepathic Bond",
		"text": "The creature ignores the range restrictions on its telepathy when communicating with a target it has charmed. The two don’t even need to be on the same plane of existence.",
		"reference": "(Succubus\/Incubus, pp. 285, MM)"
	},
	{
		"name": "Telepathic Shroud",
		"text": "The creature is immune to any effect that would sense its emotions or read its thoughts, as well as divination spells.",
		"reference": "(Fluumph, pp. 135, MM)"
	},
	{
		"name": "Terrain Camouflage",
		"text": "The creature has advantage on Dexterity (Stealth) checks made to hide in the associated terrain.",
		"reference": "(Grick, pp. 173, MM)"
	},
	{
		"name": "Tiamat’s Blessing of Retribution",
		"text": "When the creature takes damage that reduces them to 0 hit points, they immediately regain X hit points. If the creature has X hit points or fewer at the end of his next turn, he dies.",
		"reference": "(Captain Othelstan, pp. 89, HotDQ)"
	},
	{
		"name": "Tinker",
		"text": "The creature has proficiency with artisan’s tools (tinker’s tools). Using those tools, it can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless it spends 1 hour repairing it to keep the device functioning), or when the creature uses its action to dismantle it; at that time, it can reclaim the materials used to create the device. The creature can have up to three such devices active at a time. When the creature creates a device, choose one of the following options",
		"reference": "(Rock Gnome, pp. 37, PH)"
	},
	{
		"name": "Tool Proficiency",
		"text": "The creature gain’s proficiency with the artisan’s tools of it’s choice",
		"reference": "(Dwarf, pp. 20, PH)"
	},
	{
		"name": "Trampling Charge",
		"text": "If the creature moves at least X feet straight toward a target and then hits it with a gore attack on the same turn, that target must succeed on a Strength saving throw (DC = 8 + proficiency bonus + Strength modifier) or be knocked prone. If the target is prone, the creature can make one stomp attack against it as a bonus action.",
		"reference": "(Gorgon, pp. 171, MM)"
	},
	{
		"name": "Trance",
		"text": "The creature doesn’t need to sleep. Instead it meditates deeply, remaining semiconscious for 4 hours a day. While meditating, it can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, the creature gains the same benefit that a human does from 8 hours of sleep.",
		"reference": "(Elf, pp. 23, PH)"
	},
	{
		"name": "Transparent",
		"text": "Even when the creature is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot the creature if it has neither moved nor attacked. A target that tries to enter the creature’s space while unaware of the creature is surprised by the creature.",
		"reference": "(Gelatinous Cube, pp. 242, MM)"
	},
	{
		"name": "Treasure Sense",
		"text": "The creature can pinpoint, by scent, the location of precious metals and stones, such as coins and gems, within 60 feet of it.",
		"reference": "(Xorn, pp. 304, MM)"
	},
	{
		"name": "Tree Stride",
		"text": "Once on its turn, the creature can use 10 feet of its movement to step magically into one living tree within its reach and emerge from a second living tree within 60 feet of the first tree, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger.",
		"reference": "(Dryad, pp. 121, MM)"
	},
	{
		"name": "Tunneler",
		"text": "The creature can burrow through solid rock at half its burrowing speed and leaves an X-footwide, Y-foot-high tunnel in its wake.",
		"reference": "(Purple Worm, pp. 255, MM)"
	},
	{
		"name": "Turn Immunity",
		"text": "The creature is immune to the effects that turn undead.",
		"reference": "(Crawling Claw, pp. 44, MM)"
	},
	{
		"name": "Turn Resistance",
		"text": "The creature has advantage on saving throws against any effect that turns undead.",
		"reference": "(Lich, pp. 202, MM)"
	},
	{
		"name": "Turning Defiance",
		"text": "The creature and any ghouls within 30 feet of it have advantage on saving throws against effects that turn undead.",
		"reference": "(Ghast, pp. 148, MM)"
	},
	{
		"name": "Two Heads",
		"text": "The creature has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.",
		"reference": "(Ettin, pp. 132, MM)"
	},
	{
		"name": "Unarmoured Defence",
		"text": "While the creature is wearing no armor and wielding no shield, its AC includes it’s Wisdom modifier.",
		"reference": "(Hurricane, pp. 191, PotA)"
	},
	{
		"name": "Unarmoured Movement",
		"text": "While the creature is wearing no armor and wielding no shield, it’s walking speed increases by X feet.",
		"reference": "(Hurricane, pp. 191, PotA)"
	},
	{
		"name": "Unending Breath",
		"text": "The creature can hold its breath indefinitely while it is not incapacitated.",
		"reference": "(Air Genasi, pp. 9, EEPH)"
	},
	{
		"name": "Undead Fortitude",
		"text": "If damage reduces the creature to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.",
		"reference": "(Zombie, pp. 316, MM)"
	},
	{
		"name": "Undead Slayer",
		"text": "When the creature hits an undead with a weapon attack, the undead takes an extra X damage of the weapon’s type.",
		"reference": "(Rictavio, pp. 238, CoS)"
	},
	{
		"name": "Undetectable",
		"text": "The creature can’t be targeted by divination magic, perceived through magical scrying sensors, or detected by abilities that sense demons or fiends.",
		"reference": "(Fraz-Urb’Luu, pp. 238, OotA)"
	},
	{
		"name": "Vampire Weaknesses",
		"text": "The creature has the following flaws",
		"reference": "(Vampire, pp. 297, MM)"
	},
	{
		"name": "Variable Illumination",
		"text": "The creature sheds bright light in a 5- to 20-foot radius and dim light for an additional number of feet equal to the chosen radius. The creature can alter the radius as a bonus action.",
		"reference": "(Will-o’-Wisp, pp. 301, MM)"
	},
	{
		"name": "Vengeful Tracker",
		"text": "The creature knows the distance to and direction of any target against which it seeks revenge, even if the target and the creature are on different planes of existence. If the target being tracked by the creature dies, the creature knows.",
		"reference": "(Revenant, pp. 259, MM)"
	},
	{
		"name": "Wakeful",
		"text": "When one of the creature’s heads is asleep, its other head is awake.",
		"reference": "(Ettin, pp. 132, MM)"
	},
	{
		"name": "Wakeful",
		"text": "While the creature sleeps, at least one of it’s heads is awake.",
		"reference": "(Hydra, pp. 190, MM)"
	},
	{
		"name": "War Magic",
		"text": "When the creature uses its action to cast a cantrip, it can also take a bonus action to make one weapon attack.",
		"reference": "(Dralmorrer Borngray, pp. 90, HotDQ)"
	},
	{
		"name": "Water Bond",
		"text": "The creature dies if it leaves the water to which it is bound or if that water is destroyed.",
		"reference": "(Water Weird, pp. 299)"
	},
	{
		"name": "Water Breathing",
		"text": "The creature can breathe only underwater.",
		"reference": "(Giant Octopus, pp. 326, MM)"
	},
	{
		"name": "Water Form",
		"text": "The creature can enter a hostile target’s space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
		"reference": "(Water Elemental, pp. 125, MM)"
	},
	{
		"name": "Water Susceptibility",
		"text": "For every 5 feet the creature moves in water, or for every gallon splashed on it, it takes X cold damage.",
		"reference": "(Fire Elemental, pp. 125, MM)"
	},
	{
		"name": "Water Walk",
		"text": "The creature can stand and move on liquid surfaces as if they were solid ground.",
		"reference": "(Gar Shatterkeel, pp. 208, PotA)"
	},
	{
		"name": "Watery Fall",
		"text": "When the creature drops to 0 hit points, it’s body collapses into a pool of inky water that rapidly disperses. Anything he was wearing or carrying is left behind.",
		"reference": "(Gar Shatterkeel, pp. 208, PotA)"
	},
	{
		"name": "Weapon Bond",
		"text": "Provided it’s weapon is on the same plane, the creature can take a bonus action to teleport it to it’s hand.",
		"reference": "(Dralmorrer Borngray, pp. 90, HotDQ)"
	},
	{
		"name": "Web Sense",
		"text": "While in contact with a web, the creature knows the exact location of any other target in contact with the same web.",
		"reference": "(Giant Spider, pp. 328, MM)"
	},
	{
		"name": "Web Walker",
		"text": "The creature ignores movement restrictions caused by webbing.",
		"reference": "(Drider, pp. 120, MM)"
	},
	{
		"name": "Winged",
		"text": "The creature has bat-like wings sprouting from its shoulder blades. It has a flying speed of 30ft.",
		"reference": "(Tiefling Variants, pp. 118, SCAG)"
	},
	{
		"name": "Wounded Fury",
		"text": "While it has X hit points or fewer, the creature has advantage on attack rolls. In addition, it deals an extra Y damage to any target it hits with a melee attack.",
		"reference": "(Quaggoth, pp. 256, MM"
	},
	{
		"name": "Wreathed in Flame",
		"text": "For the creature, the warm version of the fire shield spell has a duration of “until dispelled”. The fire shield burns for X minutes after the creature dies, consuming it’s body.",
		"reference": "(Flamewrath, pp. 201, PotA)"
	}
];

$(document).ready(function () {
	runApp();
});

function runApp() {
	loadCROptions(BASE_DATA);
	loadMonsterTraits(MONSTER_TRAITS);
	addEventHandlers();
}

function loadCROptions(crOptions) {
	var crSelect = $("#crSelect");
	Object.keys(crOptions).forEach(function (crKey) {
		var opt = document.createElement('OPTION');
		opt.innerText = crKey;
		opt.value = crKey;
		crSelect.append(opt);
	});
}

function loadMonsterTraits(traitsList) {
	$("#monsterTraits").DataTable({
		data: traitsList,
		columns: [
			{ title: 'Trait Name', data: 'name' },
			{ title: 'Trait Description', data: 'text' },
			{ title: 'Reference', data: 'reference' }
		]
	});
}

function addEventHandlers() {
	$("#generateMonsterBtn").click(generate);
}

function generate() {
	validate(function () {
		var cr = $("#crSelect").val();
		var type = $("#modifier").val();
		var magicBonus = $("#highMagicBoost").is(':checked');
		var attacksPerRound = $("#atkPerRnd").val();
		var monster = buildMonster(cr, type, magicBonus, attacksPerRound);
		monster.name = $("#monsterName").val();
		render(monster);
	});
}

function validate(onValidCallback) {
	var frm = document.getElementById('monsterForm');
	if(frm.checkValidity()) {
		onValidCallback();
	}

	frm.classList.add('was-validated');
}

function buildMonster(cr, type, shouldAddMagicBonus, attacksPerRound) {
	var magicBonus = getMagicBonus(shouldAddMagicBonus, cr);
	var monster = null;
	switch (type) {
		case "Standard":
			monster = buildStandard(cr, magicBonus, attacksPerRound);
			break;
		case "Weakened":
			monster = buildWeakened(cr, magicBonus, attacksPerRound);
			break;
		case "Strengthened":
			monster = buildStrengthened(cr, magicBonus, attacksPerRound);
			break;
		default:
			break;
	}

	return monster;
}

function getMagicBonus(shouldAddMagicBonus, cr) {
	var ret = 0;
	var crNum = convertCrStringToNumber(cr);
	if(shouldAddMagicBonus) {
		if(crNum >= 13) {
			ret = 3;
		} else if(crNum >= 7) {
			ret = 2;
		} else if(crNum >= 3) {
			ret = 1;
		}
	}

	return ret;
}

function buildStandard(cr, magicBonus, attacksPerRound) {
	var working = getMonsterTemplate(BASE_DATA[cr], cr, "Standard");
	working.attacksPerRound = attacksPerRound;

	working.toHit += magicBonus;
	working.damageTotal += magicBonus;

	working.damagePerHit = working.damageTotal / working.attacksPerRound;

	working.ac += magicBonus;
	working.saveDC += magicBonus;
	working.savingThrow += magicBonus;

	return working;
}

function buildWeakened(cr, magicBonus, attacksPerRound) {
	var working = buildStandard(cr, magicBonus, attacksPerRound);
	working.ac -= 3;
	working.hp -= (working.hp / 2);
	working.toHit -= 2;
	working.damageTotal -= (working.damageTotal / 2);
	working.damagePerHit = working.damageTotal / working.attacksPerRound;
	working.saveDC -= 2;
	working.savingThrow -= 2;
	return working;
}

function buildStrengthened(cr, magicBonus, attacksPerRound) {
	var working = buildStandard(cr, magicBonus, attacksPerRound);
	working.ac += 3;
	working.hp += (working.hp / 2);
	working.toHit += 2;
	working.damageTotal += (working.damageTotal / 2);
	working.damagePerHit = working.damageTotal / working.attacksPerRound;
	working.saveDC += 2;
	working.savingThrow += 2;
	return working;
}

function getMonsterTemplate(base, cr, type) {
	var working = JSON.parse(JSON.stringify(MONSTER));
	working.type = type;
	working.cr = cr;

	working.hp = base.HP;
	working.ac = base.AC;
	working.toHit = base.Attack;
	working.damageTotal = base.Damage;
	working.saveDC = base.DC;
	working.savingThrow = base.Save;

	return working;
}

function convertCrStringToNumber(cr) {
	if(cr === "1/8") { return 0.2; }
	else if(cr === "1/4") { return 0.4; }
	else if(cr === "1/2") { return 0.6; }
	else { return parseInt(cr); }
}

function render(monster) {
	document.getElementById("renderMonsterName").innerText = monster.name;
	document.getElementById("renderMonsterCR").innerText = monster.cr;
	document.getElementById("renderMonsterHP").innerText = Math.floor(monster.hp).toString();
	document.getElementById("renderMonsterAC").innerText = monster.ac;
	document.getElementById("renderMonsterAttacks").innerText = monster.attacksPerRound;
	document.getElementById("renderMonsterAtkBonus").innerText = monster.toHit;
	document.getElementById("renderMonsterDmg").innerText = Math.floor(monster.damagePerHit).toString();
	document.getElementById("renderMonsterDC").innerText = monster.saveDC;
	document.getElementById("renderMonsterSave").innerText = monster.savingThrow;

	var tbody = document.getElementById('potentialDiceRollsTableBody');
	var potentialDiceRollsList = generatePotentialDamageRolls(monster.damagePerHit);
	tbody.innerHTML = "";
	for(var i = 0; i < potentialDiceRollsList.length; i++) {
		tbody.appendChild(generateDamageRollsRow(potentialDiceRollsList[i]));
	}
}

function generatePotentialDamageRolls(dmgPerHit) {
	var results = [];
	for(var diceMultiplier = 1; diceMultiplier < 100; diceMultiplier++) {
		var keys = Object.keys(SINGLE_DICE_AVG);
		for(var i = 0; i < keys.length; i++) {
			var k = keys[i];
				var average = SINGLE_DICE_AVG[k];
				var multipliedAvg = average * diceMultiplier;
				var staticBonus = Math.floor(dmgPerHit - Math.floor(multipliedAvg));

				// escape early case
				if(staticBonus < 0) {
					if(results.length < 1) {
						results.push({ txt: "1d4", dice: "d4", amount: 1, average: 2.5, staticBonus: 0 })
					}
					return results;
				}

				var row = { txt: diceMultiplier + k + " + " + staticBonus, dice: k, amount: diceMultiplier, average: multipliedAvg, staticBonus: staticBonus };
				results.push(row);
		}
	}

	if(results.length < 1) {
		results.push({ txt: "1d4", dice: "d4", amount: 1, average: 2.5, staticBonus: 0 })
	}

	return results;
}

function generateDamageRollsRow(row) {
	var rowElem = document.createElement('TR');

	var diceRollElem = document.createElement('TD');
	diceRollElem.innerText = row.txt;
	rowElem.appendChild(diceRollElem);

	var diceDataElem = document.createElement('TD');
	diceDataElem.innerText = row.dice;
	rowElem.appendChild(diceDataElem);

	var diceMulElem = document.createElement('TD');
	diceMulElem.innerText = row.amount;
	rowElem.appendChild(diceMulElem);

	var diceAvgElem = document.createElement('TD');
	diceAvgElem.innerText = row.average;
	rowElem.appendChild(diceAvgElem);

	var diceBonusElem = document.createElement('TD');
	diceBonusElem.innerText = row.staticBonus;
	rowElem.appendChild(diceBonusElem);

	return rowElem;
}
