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

$(document).ready(function () {
	runApp();
});

function runApp() {
	loadCROptions(BASE_DATA);
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
	document.getElementById("renderMonsterHP").innerText = monster.hp;
	document.getElementById("renderMonsterAC").innerText = monster.ac;
	document.getElementById("renderMonsterAttacks").innerText = monster.attacksPerRound;
	document.getElementById("renderMonsterAtkBonus").innerText = monster.toHit;
	document.getElementById("renderMonsterDmg").innerText = monster.damagePerHit;
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
				var staticBonus = dmgPerHit - Math.floor(multipliedAvg);

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
