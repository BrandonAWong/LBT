import { Button } from 'antd';
import * as Excel from 'exceljs';
import saveAs from 'file-saver';

const ExcelJobGroupButton = ({ setLoading }) => {
  const generateExcel = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5041/api/active-directory/titles/groups/common-per-title");

      if (response.ok) {
        const data = await response.json();

        const transformed = Object.entries(data).map(([key, value]) => ({
          jobTitle: key,
          groups: value
        }));

        const workbook = new Excel.Workbook();
        const matrixSheet = workbook.addWorksheet('Matrix');

        writeHeader(matrixSheet, ["Job Title", "Group"]);
        writeData(matrixSheet, transformed);

        // adjust column widths
        matrixSheet.columns.forEach(col => {
          const lengths = col.values.filter(v => v != null).map(v => v.toString().length);
          col.width = Math.min(Math.max(...lengths) + 5, 75);
        });

        // save
        const date = new Date();
        workbook.xlsx.writeBuffer().then(function(buffer) {
          let blob = new Blob([buffer], { type: "application/xlsx" });
          saveAs(blob, `Report ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.xlsx`);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
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
    let i = 0;
    data.forEach((titleGroup) => {
      let row = worksheet.getRow(i + 2);
      row.getCell(1).value = titleGroup.jobTitle;
      
      titleGroup.groups.forEach(group => {
        row.getCell(2).value = group;
        row = worksheet.getRow(++i + 2);
      });

      ++i;
      for (let j = 1; j < 50 ; ++j) {
        row.getCell(j).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD7A68B' } };  
      }
    });
  };

  return <Button color="primary" 
                 variant="outlined"
                 onClick={generateExcel}>Generate Matrix</Button>;
};

export default ExcelJobGroupButton;