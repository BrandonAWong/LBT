// Generates an excel sheet of all users with their job title

import { Button } from 'antd';
import * as Excel from 'exceljs';
import saveAs from 'file-saver';
import API_BASE_URL from '../config/api.js';

const ExcelJobUserButton = ({ setLoading }) => {
  const generateExcel = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/active-directory/titles/users`);

      if (response.ok) {
        const data = await response.json();

        const workbook = new Excel.Workbook();
        const matrixSheet = workbook.addWorksheet('Matrix');

        writeHeader(matrixSheet, ["Name", "User ID", "Email", "Department", "Title"]);
        writeData(matrixSheet, data);

        // adjust column widths
        matrixSheet.columns.forEach(col => {
          const lengths = col.values.filter(v => v != null).map(v => v.toString().length);
          col.width = Math.min(Math.max(...lengths) + 5, 75);
        });

        // save
        const date = new Date();
        workbook.xlsx.writeBuffer().then(function(buffer) {
          let blob = new Blob([buffer], { type: "application/xlsx" });
          saveAs(blob, `AD User Report ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.xlsx`);
        });
      }
    } catch (error) { } finally {
      setLoading(false);
    }
  };

  const writeHeader = (worksheet, cols) => {
    const row = worksheet.getRow(1);
    for (let i = 0; i < cols.length; ++i) {
      let cell = row.getCell(i + 1);
        cell.border  = { top: { style:'medium' }, left: { style:'medium' }, bottom: { style:'medium' }, right: { style:'medium' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF02346A'} };
        cell.alignment = { vertical: 'top', horizontal: 'center' };
        cell.font = { color: { argb: 'FFFFFFFF' }, 'bold': true }
        cell.value = cols[i];
    }
  };

  const writeData = (worksheet, data) => {
    data.forEach((record, i) => {
      let row = worksheet.getRow(i + 2);
      let j = 0;

      for (const key in record)
      {
        row.getCell(++j).value = record[key];
      }
    });
  };

  return <Button color="primary" 
                 variant="outlined"
                 onClick={generateExcel}>
            Get Users
          </Button>;
};

export default ExcelJobUserButton;