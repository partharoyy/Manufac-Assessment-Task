import React from "react";

interface TableProps {
  data: any[];
  headers: string[];
}

const Table: React.FC<TableProps> = ({ data, headers }) => {
  const [mean, median, mode] = headers;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {data.map((item) => (
              <th key={item.Alcohol}>
                {item.Alcohol === 1
                  ? "Class 1"
                  : item.Alcohol === 2
                  ? "Class 2"
                  : "Class 3"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mean}</td>
            {data.map((item) => (
              <td key={item.Alcohol}>{item.Mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{median}</td>
            {data.map((item) => (
              <td key={item.Alcohol}>{item.Median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{mode}</td>
            {data.map((item) => (
              <td key={item.Alcohol}>{item.Mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
