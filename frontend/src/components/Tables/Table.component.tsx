import React from "react";

import "./Table.style.scss"

interface TableHeaders {
  [key: string]: number;
}

interface TableRowData {
  id: number | string;
  [key: string]: unknown;
}

interface TableProps {
  headers: TableHeaders;
  data: TableRowData[];
  removeHandler: (id: number) => void;
  height: number
}

export const Table: React.FC<TableProps> = ({headers, data, removeHandler, height}) => {
  const headerKeys = Object.keys(headers);

  return (
    <table className={"table"}>
      <thead>
      <tr>
        {headerKeys.map((key) => (
          <th key={key} style={{flex: headers[key], flexBasis: '0.000000001px'}}>{key}</th>
        ))}
      </tr>
      </thead>
      <tbody style={{"height": `${height}px`}}>
      {data.map((item, index) => (
        <tr key={index}>
          {headerKeys.map((header) => (
            <td key={header} style={{flex: headers[header], flexBasis: '0.000000001px'}}>
              {header === 'remove'
                ? <button onClick={() => removeHandler(index)} className={"button"}>X</button>
                : (item[header] as React.ReactNode) // assert as ReactNode here
              }
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};
