export interface Wine {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number;
  Proanthocyanins: string;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number;
}

export interface CombinedStatistics {
  Alcohol: number;
  Mean: number;
  Median: number;
  Mode: number | string;
}

export interface WineWithGamma {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number;
  "Nonflavanoid phenols": number;
  Proanthocyanins: string;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number;
  Gamma?: number; // New property
}

export interface GammaClassStatistics {
  Alcohol: number;
  Mean: number;
  Median: number;
  Mode: string | number | null;
}
