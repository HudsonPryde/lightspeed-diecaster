import _ from "lodash";

export function getResult(advantage) {
  let rolls = null;
  let rollsClone = null;
  let total = 0;
  // roll for no advantage
  switch (advantage) {
    case "none":
      rolls = rollDie(2);
      rollsClone = _.clone(rolls);
      total = rolls[0] + rolls[1];
      break;
    // has advantage
    case "advantage":
      rolls = rollDie(3);
      rollsClone = _.clone(rolls);
      // pull the smallest value
      _.pullAt(
        rolls,
        rolls.lastIndexOf((element) => Math.min(...rolls))
      );
      total = rolls[0] + rolls[1];
      break;
    // disadvantage
    case "disadvantage":
      rolls = rollDie(3);
      rollsClone = _.clone(rolls);
      // pull the biggest value
      _.pullAt(
        rolls,
        rolls.lastIndexOf((element) => Math.max(...rolls))
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
