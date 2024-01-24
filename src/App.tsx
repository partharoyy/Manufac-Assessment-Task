import React from "react";
import "./App.css";
import {
  flavanoidsMean,
  flavanoidsMedian,
  flavanoidsMode,
  combineStatistics,
} from "./utils/calculations";
import {
  calculateGamma,
  calculateGammaStatistics,
} from "./utils/gammaCalculations";
import wineData from "./data/Wine-Data";
import Table from "./components/Table";

interface Wine {
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
}

const App: React.FC = () => {
  // Use the combineStatistics function
  const combinedStatistics = combineStatistics(
    flavanoidsMean(),
    flavanoidsMedian(),
    flavanoidsMode()
  );

  //Calculate Gamma and update the dataset
  calculateGamma(wineData as Wine[]);

  // Use the calculateGammaStatistics function
  const gammaStatistics = calculateGammaStatistics(wineData as Wine[]);

  // Render the table using combinedStatistics and gammaStatistics
  return (
    <div className="App">
      <Table
        data={combinedStatistics}
        headers={["Flavanoids Mean", "Flavanoids Median", "Flavanoids Mode"]}
      />
      <Table
        data={gammaStatistics}
        headers={["Gamma Mean", "Gamma Median", "Gamma Mode"]}
      />
    </div>
  );
};

export default App;
