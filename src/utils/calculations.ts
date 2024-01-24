import data from "../data/Wine-Data";
import { CombinedStatistics } from "../types/types";

export const convertToNumber = (value: string | number): number => {
  const parsedValue = parseFloat(value as string);
  return isNaN(parsedValue) ? 0 : parsedValue;
};

export const flavanoidsMean = () => {
  const classes = data.map((item) => item.Alcohol);
  const uniqueClasses = Array.from(new Set(classes));

  const meanData = uniqueClasses.map((alcoholClass) => {
    const classData = data.filter((item) => item.Alcohol === alcoholClass);

    const totalFlavanoids = classData.reduce(
      (sum, wine) => sum + convertToNumber(wine.Flavanoids),
      0
    );
    const mean = totalFlavanoids / classData.length;

    return { Alcohol: alcoholClass, Mean: mean };
  });

  return meanData;
};

export const flavanoidsMedian = () => {
  const classes = data.map((item) => item.Alcohol);
  const uniqueClasses = Array.from(new Set(classes));

  const calculateMedian = (sortedData: number[]): number => {
    const length = sortedData.length;
    if (length % 2 === 0) {
      const middle1 = sortedData[length / 2 - 1];
      const middle2 = sortedData[length / 2];
      return (middle1 + middle2) / 2;
    } else {
      return sortedData[Math.floor(length / 2)];
    }
  };

  const medianData = uniqueClasses.map((alcoholClass) => {
    const classData = data.filter((item) => item.Alcohol === alcoholClass);

    const flavanoidsValues = classData.map((wine) =>
      convertToNumber(wine.Flavanoids)
    );
    const sortedFlavanoids = flavanoidsValues.sort((a, b) => a - b);

    const median = calculateMedian(sortedFlavanoids);

    return { Alcohol: alcoholClass, Median: median };
  });

  return medianData;
};

export const flavanoidsMode = () => {
  const classes = data.map((item) => item.Alcohol);
  const uniqueClasses = Array.from(new Set(classes));

  const calculateMode = (data: number[]): number | string => {
    const frequencyMap = new Map<number, number>();

    data.forEach((value) => {
      const count = frequencyMap.get(value) || 0;
      frequencyMap.set(value, count + 1);
    });

    let mode: number | string = "";
    let maxFrequency = 0;

    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        mode = value;
        maxFrequency = frequency;
      }
    });

    return mode;
  };

  const modeData = uniqueClasses.map((alcoholClass) => {
    const classData = data.filter((item) => item.Alcohol === alcoholClass);

    const flavanoidsValues = classData.map((wine) =>
      convertToNumber(wine.Flavanoids)
    );

    const mode = calculateMode(flavanoidsValues);

    return { Alcohol: alcoholClass, Mode: mode };
  });

  return modeData;
};

export const combineStatistics = (
  mean: { Alcohol: number; Mean: number }[],
  median: { Alcohol: number; Median: number }[],
  mode: { Alcohol: number; Mode: number | string }[]
): CombinedStatistics[] => {
  const combinedData: CombinedStatistics[] = [];

  const addOrUpdateItem = (
    alcohol: number,
    meanValue: number,
    medianValue: number,
    modeValue: number | string
  ) => {
    const existingItem = combinedData.find((item) => item.Alcohol === alcohol);

    if (existingItem) {
      existingItem.Mean = meanValue;
      existingItem.Median = medianValue;
      existingItem.Mode = modeValue;
    } else {
      combinedData.push({
        Alcohol: alcohol,
        Mean: meanValue,
        Median: medianValue,
        Mode: modeValue,
      });
    }
  };

  mean.forEach((meanItem) => {
    const medianItem = median.find((item) => item.Alcohol === meanItem.Alcohol);
    const modeItem = mode.find((item) => item.Alcohol === meanItem.Alcohol);

    if (medianItem && modeItem) {
      addOrUpdateItem(
        meanItem.Alcohol,
        meanItem.Mean,
        medianItem.Median,
        modeItem.Mode
      );
    }
  });

  return combinedData;
};
