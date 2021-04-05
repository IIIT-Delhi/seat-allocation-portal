const Excel = require("exceljs");
function testExcelStuff() {
  let workbook = new Excel.Workbook();
  let workbook2 = new Excel.Workbook();
  workbook.xlsx
    .readFile("floorPlans/NewBuildingRoomPlanscopy.xlsx")
    .then(function () {
      let worksheet = workbook.getWorksheet("A-006");
      worksheet.getCell("A1").value = "gusyfjhkfjskfsfsknfsk";
      //   console.log(worksheet);
      const xx = workbook2.addWorksheet("chaljaa", worksheet);
      const xxx = workbook2.getWorksheet("chaljaa");
      console.log(xxx);
      // return workbook2;
      // console.log(xxx);
      // return workbook2.xlsx.writeFile("floorPlans/abcd2.xlsx");
    });
  // console.log(x, "whatt");

  // console.log(workbook2);
  // return workbook2;
  // await workbook2.xlsx.writeFile("floorPlans/abcd2.xlsx");
}

function crap() {
  testExcelStuff().then((response) => {
    // console.log(response);
    const xxx = response.getWorksheet("new sheet");
    // console.log(xxx);
    // return response.xlsx.writeFile("floorPlans/abcd2.xlsx");
  });
}

// crap();
testExcelStuff();
