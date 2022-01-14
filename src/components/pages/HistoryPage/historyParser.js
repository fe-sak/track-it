export default function historyParser(history) {
  let completeDays = [];
  let incompleteDays = [];
  for (let j = 0; j < history.length; j++) {
    for (let i = 0; i < history[j].habits.length; i++) {
      if (history[j].habits[i].done === false) {
        incompleteDays.push(history[j]);
        break;
      }
    }
  }
  completeDays = history.filter((element) => !incompleteDays.map((e) => e.day).includes(element.day)
  )

  return [completeDays, incompleteDays]
}