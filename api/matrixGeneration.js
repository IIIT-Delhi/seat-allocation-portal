// var xlsx = require('node-xlsx')
// var obj = xlsx.parse(__dirname + '/floorPlans/SeminarBlock.xlsx'); 
// console.log(obj[0]['data']);
const fs = require('fs');
let x = fs.readFileSync("abcd.json");
const ans = JSON.parse(x);
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('floorPlans/SeminarBlockcopy.xlsx')//Change file name here or give file path
.then(function() {
    var worksheet = workbook.getWorksheet('C101');
    const n = ans.length;
    for (let i = 0; i < n; i++){
      let m = ans[i].length;
      for (let j = 0; j < m; j++){
        let o = ans[i][j].length;
        for (let k = 0; k < o; k++){
          let index = ans[i][j][k][0] + ans[i][j][k][1].toString();
          worksheet.getCell(index).value = "V!V"
        }
      }
    }
    // worksheet.getCell('B3').value = "";//Change the cell number here
return workbook.xlsx.writeFile('floorPlans/SeminarBlockcopy.xlsx')//Change file name here or give     file path
   });