export default function countProgress(todaysHabits) {
  let done = 0;
  const valuesOfTodaysHabits = todaysHabits.map((habit) => Object.values(habit));
  const habitsDone = valuesOfTodaysHabits.map((habitValue) => habitValue.find(element => element === true));
  habitsDone.forEach((doneOrNot) => { 
    if (doneOrNot === true) done++; 
  });

  return [done, habitsDone.length];
}