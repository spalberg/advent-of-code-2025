import { defineSolution, runSolution } from "@/utils.ts";

type BatteryBank = Array<number>;

const solution = defineSolution(3, (input) => {
  const batteryBanks = input.map((line) => line.split("").map(Number));
  return {
    part1: () => solve(batteryBanks, 2),
    part2: () => solve(batteryBanks, 12),
  };
});

function solve(batteryBanks: Array<BatteryBank>, batteriesToTurnOn: number) {
  let totalJoltage = 0;
  for (const batteryBank of batteryBanks) {
    let maxIndex = -1;
    for (let i = 0; i < batteriesToTurnOn; i += 1) {
      maxIndex = findMaxIndex(
        batteryBank,
        maxIndex + 1,
        batteryBank.length - (batteriesToTurnOn - 1 - i),
      );
      const batteryJoltage = batteryBank[maxIndex] *
        Math.pow(10, batteriesToTurnOn - 1 - i);
      totalJoltage += batteryJoltage;
    }
  }
  return totalJoltage;
}

function findMaxIndex(
  batteryBank: BatteryBank,
  start = 0,
  end = batteryBank.length,
) {
  let maxIndex = -1;
  let maxValue = -1;
  for (let i = start; i < end; i += 1) {
    const currentValue = batteryBank[i];
    if (currentValue === 9) return i;
    if (currentValue > maxValue) {
      maxValue = currentValue;
      maxIndex = i;
    }
  }
  return maxIndex;
}

if (import.meta.main) {
  runSolution(solution);
}

export default solution;
