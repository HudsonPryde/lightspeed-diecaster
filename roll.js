import _ from "lodash";

export function getResult(advantage) {
  let rolls = null;
  let total = 0;
  // roll for no advantage
  switch (advantage) {
    case 0:
      rolls = rollDie(2);
      total = rolls[0].roll + rolls[1].roll;
      break;
    // has advantage
    case 1:
      rolls = rollDie(3);
      // sort the rolls into ascending order
      rolls = _.orderBy(rolls, ["roll"], ["asc"]);
      total = rolls[0].roll + rolls[1].roll;
      break;
    // disadvantage
    case 2:
      rolls = rollDie(3);
      // sort the rolls into ascending order
      rolls = _.orderBy(rolls, ["roll"], ["desc"]);
      total = rolls[0].roll + rolls[1].roll;
      break;
  }

  return { rolls, total };
}

function rollDie(num) {
  let rolls = Array.from({ length: num }, (v, i) => {
    return { roll: _.random(1, 6) };
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
