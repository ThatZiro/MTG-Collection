import React from "react";

import "./Table.style.scss"

interface TableHeaders {
  [key: string]: number;
}

interface TableRowData {
  id: number;
  [key: string]: unknown;
}

interface TableProps {
  headers: TableHeaders;
  data: TableRowData[];
  removeHandler: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({headers, data, removeHandler}) => {
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
      <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {headerKeys.map((header) => (
            <td key={header} style={{flex: headers[header], flexBasis: '0.000000001px'}}>
              {header === 'remove'
                ? <button onClick={() => removeHandler(item.id)} className={"button"}>Remove</button>
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
