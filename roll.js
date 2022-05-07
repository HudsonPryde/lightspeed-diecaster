import _ from "lodash";

export function getResult(advantage) {
  let rolls = null;
  let rollsClone = null;
  let total = 0;
  // roll for no advantage
  switch (advantage) {
    case "none":
      rolls = rollDie(2);
      rollsClone = rolls;
      total = rolls[0] + rolls[1];
      break;
    // has advantage
    case "advantage":
      rolls = rollDie(3);
      rollsClone = rolls;
      // pull the smallest value
      _.pullAt(
        rolls,
        rolls.findIndex((element) => Math.min(...rolls))
      );
      total = rolls[0] + rolls[1];
      break;
    // disadvantage
    case "disadvantage":
      rolls = rollDie(3);
      rollsClone = rolls;
      // pull the biggest value
      _.pullAt(
        rolls,
        rolls.findIndex((element) => Math.max(...rolls))
      );
      total = rolls[0] + rolls[1];
      break;
  }
  // create a formated string to represent the rolls
  let rollString = "";
  rollsClone.forEach((roll, i) => {
    if (i > 0) {
      rollString += `, ${roll}`;
    } else {
      rollString += `${roll}`;
    }
  });

  return { rollString, total };
}

function rollDie(num) {
  let rolls = Array.from({ length: num }, (v, i) => {
    return _.random(1, 6);
  });

  return rolls;
}

// this is just to figure out winner + verb
const RollChoices = {
  none: { value: 0, label: "no advantage" },
  advantage: { value: 1, label: "advantage" },
  disadvantage: { value: 2, label: "disadvantage" },
};

export function getRollChoices() {
  return Object.keys(RollChoices);
}
