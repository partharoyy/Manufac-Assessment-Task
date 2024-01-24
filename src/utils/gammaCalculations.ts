import { WineWithGamma, GammaClassStatistics } from "../types/types";

// Helper function to convert string or undefined to number
const convertToNumber = (value: string | number | undefined): number => {
  return typeof value === "string" ? parseFloat(value) : value || 0;
};

// Calculate Gamma and update the dataset
export const calculateGamma = (data: WineWithGamma[]): void => {
  data.forEach((wine) => {
    const gamma = (wine.Ash * wine.Hue) / wine.Magnesium;
    wine.Gamma = gamma;
  });
};

// Function to calculate mean, median, and mode for the "Gamma" property
export const calculateGammaStatistics = (
  data: WineWithGamma[]
): GammaClassStatistics[] => {
  const classes = data.map((item) => item.Alcohol);
  const uniqueClasses = Array.from(new Set(classes));

  return uniqueClasses.map((alcoholClass) => {
    const classData = data.filter((item) => item.Alcohol === alcoholClass);
    const gammaValues = classData.map((item) => convertToNumber(item.Gamma));

    const mean =
      gammaValues.reduce((sum, value) => sum + value, 0) / gammaValues.length;

    const sortedGammaValues = gammaValues.sort((a, b) => a - b);
    const middle = Math.floor(sortedGammaValues.length / 2);

    const median =
      sortedGammaValues.length % 2 === 0
        ? (sortedGammaValues[middle - 1] + sortedGammaValues[middle]) / 2
        : sortedGammaValues[middle];

    const mode = calculateMode(gammaValues);

    return {
      Alcohol: alcoholClass,
      Mean: parseFloat(mean.toFixed(3)),
      Median: parseFloat(median.toFixed(3)),
      Mode: mode.length === 0 ? null : mode[0],
    };
  });
};

// Function to calculate mode for an array of numbers
const calculateMode = (numbers: number[]): number[] => {
  const frequencyMap = new Map<number, number>();
  numbers.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  let maxFrequency = 0;
  let mode: number[] = [];

  frequencyMap.forEach((frequency, value) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = [value];
    } else if (frequency === maxFrequency) {
      mode.push(value);
    }
  });

  return mode;
};
