const fs = require("fs");
let x = fs.readFileSync("abcd.json");
const ans = JSON.parse(x);
const Excel = require("exceljs");
let rollNumbers = [];
for (let i = 1; i < 151; i++) {
  rollNumbers.push(i);
}

const allRoomSheets = new Set([
  "C101v1",
  "C101v2",
  "C102v1",
  "C102v2",
  "C201v1",
  "C201v2",
  "C208v1",
  "C208v2",
  "C209v1",
  "C209v2",
  "C210v1",
  "C210v2",
  "C211v1",
  "C211v2",
  "C212v1",
  "C212v2",
  "C213v1",
  "C213v2",
  "C214v1",
  "C214v2",
  "C215v1",
  "C215v2",
  "C216v1",
  "C216v2",
  "A006v1",
  "A006v2",
  "A007v1",
  "A007v2",
  "A106v1",
  "A106v2",
  "B105v1",
  "B105v2",
  "C24v1",
  "C24v2",
  "C23v1",
  "C23v2",
  "C22v1",
  "C22v2",
  "C21v1",
  "C21v2",
  "C13v1",
  "C13v2",
  "C12v1",
  "C12v2",
  "C11v1",
  "C11v2",
  "C03v1",
  "C03v2",
  "C02v1",
  "C02v2",
  "C01v1",
  "C01v2",
]);

function renderRoomData() {
  const obj = {
    "Seminar Hall": {
      C101: [325, "Seminar Hall", "1st Floor", false],
      C102: [540, "Seminar Hall", "1st Floor", false],
      C201: [344, "Seminar Hall", "1st Floor", false],
      C208: [32, "Seminar Hall", "2nd Floor", false],
      C209: [32, "Seminar Hall", "2nd Floor", false],
      C210: [50, "Seminar Hall", "2nd Floor", false],
      C211: [40, "Seminar Hall", "2nd Floor", false],
      C212: [50, "Seminar Hall", "2nd Floor", false],
      C213: [50, "Seminar Hall", "2nd Floor", false],
      C214: [40, "Seminar Hall", "2nd Floor", false],
      C215: [37, "Seminar Hall", "2nd Floor", false],
      C216: [25, "Seminar Hall", "2nd Floor", false],
    },
    "New Academic Block": {
      A006: [116, "New Academic Block", "Ground Floor", false],
      A007: [110, "New Academic Block", "Ground Floor", false],
      A106: [97, "New Academic Block", "1st Floor", false],
      B105: [98, "New Academic Block", "1st Floor", false],
    },
    "Old Academic Block": {
      C24: [33, "Old Academic Block", "2nd Floor", false],
      C23: [30, "Old Academic Block", "2nd Floor", false],
      C22: [33, "Old Academic Block", "2nd Floor", false],
      C21: [209, "Old Academic Block", "2nd Floor", false],
      C13: [33, "Old Academic Block", "1st Floor", false],
      C12: [50, "Old Academic Block", "1st Floor", false],
      C11: [200, "Old Academic Block", "1st Floor", false],
      C03: [33, "Old Academic Block", "Ground Floor", false],
      C02: [66, "Old Academic Block", "Ground Floor", false],
      C01: [200, "Old Academic Block", "Ground Floor", false],
    },
  };
  return obj;
}

function tryCollectiveConfig(matrix, rollNumbers, xStep, yStep) {
  // console.log("tryCollectiveConfig");
  let rollNumbersCount = rollNumbers.length;
  let k = 0;
  const totalComponents = matrix.length;
  let config = [];
  for (let p = 0; p < totalComponents; p++) {
    const component = matrix[p];
    const n = component.length;
    const m = component[0].length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (rollNumbersCount > 0) {
          if (
            i % yStep == 0 &&
            j % xStep == 0 &&
            component[i][j][0] != 0 &&
            component[i][j][1] != 0
          ) {
            config.push([i, j, rollNumbers[k].toString(), p]);
            rollNumbersCount--;
            k++;
          }
        }
      }
    }
  }
  if (rollNumbersCount == 0) {
    return config;
  }
  return null;
}

function tryConfig(matrix, rollNumbers, xStep, yStep) {
  // console.log("tryConfig");
  let rollNumbersCount = rollNumbers.length;
  let k = 0;
  const n = matrix.length;
  const m = matrix[0].length;
  let config = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rollNumbersCount > 0) {
        if (
          i % yStep == 0 &&
          j % xStep == 0 &&
          matrix[i][j][0] != 0 &&
          matrix[i][j][1] != 0
        ) {
          config.push([i, j, rollNumbers[k].toString()]);
          rollNumbersCount--;
          k++;
        }
      }
    }
  }
  if (rollNumbersCount == 0) {
    return config;
  }
  return null;
}

function setUniversalConfig(config, matrix) {
  console.log("setUniversalConfig");
  const n = config.length;
  for (let j = 0; j < n; j++) {
    const item = config[j];
    matrix[item[3]][item[0]][item[1]][2] = item[2];
  }
  return matrix;
}

function setConfig(config, matrix) {
  console.log("setConfig");
  const n = config.length;
  for (let i = 0; i < n; i++) {
    const item = config[i];
    matrix[item[0]][item[1]][2] = item[2];
  }
  return matrix;
}

function makeConfig(matrix, rollNumbers) {
  console.log("makeConfig");
  let bestConfig1 = null;
  let bestConfig2 = null;
  for (let y = 1; y < 3; y++) {
    for (let x = 1; x < 16; x++) {
      const generatedConfig = tryConfig(matrix, rollNumbers, x, y);
      if (generatedConfig == null) {
        continue;
      } else if (y == 1) {
        bestConfig1 = [generatedConfig, x];
      } else {
        bestConfig2 = [generatedConfig, x];
      }
    }
  }
  if (bestConfig2 != null && bestConfig2[1] >= 3) {
    return setConfig(bestConfig2[0], matrix);
  }
  return setConfig(bestConfig1[0], matrix);
}

function makeUniversalConfig(matrix, rollNumbers) {
  console.log("makeUniversalConfig");
  let bestConfig1 = null;
  let bestConfig2 = null;
  for (let y = 1; y < 3; y++) {
    for (let x = 1; x < 16; x++) {
      const generatedConfig = tryCollectiveConfig(matrix, rollNumbers, x, y);
      if (generatedConfig == null) {
        continue;
      } else if (y == 1) {
        bestConfig1 = [generatedConfig, x];
      } else {
        bestConfig2 = [generatedConfig, x];
      }
    }
  }
  if (bestConfig2 != null && bestConfig2[1] >= 3) {
    return setUniversalConfig(bestConfig2[0], matrix);
  }
  return setUniversalConfig(bestConfig1[0], matrix);
}

function distributeByRatio(counts, items) {
  console.log("distributeByRatio");
  const totalCount = counts.reduce((a, b) => a + b, 0);
  const totalItems = items.length;
  const numberOfComponents = counts.length;
  let distribution = [];
  for (let i = 0; i < numberOfComponents; i++) {
    let x = totalItems * counts[i];
    const count = Math.ceil(x / totalCount);
    if (count > 0) {
      distribution.push([count, i]);
    }
  }
  return distribution;
}

function divideRollNumbers(matrix, componentCounts, rollNumbers) {
  console.log("divideRollNumbers");
  const matrix1 = JSON.parse(JSON.stringify(matrix));
  const matrix2 = JSON.parse(JSON.stringify(matrix));
  const totalRollNumbers = rollNumbers.length;
  const distribution = distributeByRatio(componentCounts, rollNumbers);
  let assignedMatrix = [];
  const distributionCount = distribution.length;
  let slice = 0;
  for (let i = 0; i < distributionCount; i++) {
    const sliceEnd = Math.min(slice + distribution[i][0], totalRollNumbers);
    const rollNumberSet = rollNumbers.slice(slice, sliceEnd);
    const assignedComponent = makeConfig(
      matrix1[distribution[i][1]],
      rollNumberSet
    );
    slice = sliceEnd;
    assignedMatrix.push(assignedComponent);
  }
  const assignedMatrix2 = makeUniversalConfig(matrix2, rollNumbers);
  return [assignedMatrix, assignedMatrix2];
}

function divideRollNumbersInRooms(
  roomNames,
  roomPlans,
  roomComponentCounts,
  roomCapacities,
  rollNumbers
) {
  console.log("divideRollNumbersInRooms");
  // console.log(roomPlans[0], roomComponentCounts[0]);
  const distribution = distributeByRatio(roomCapacities, rollNumbers);
  const distributionCount = distribution.length;
  const totalRollNumbers = rollNumbers.length;
  let slice = 0;
  let assignedRooms = {};
  // console.log(distribution);
  for (let i = 0; i < distributionCount; i++) {
    const sliceEnd = Math.min(slice + distribution[i][0], totalRollNumbers);
    const rollNumberSet = rollNumbers.slice(slice, sliceEnd);
    const assignedRoom = divideRollNumbers(
      roomPlans[distribution[i][1]],
      roomComponentCounts[distribution[i][1]],
      rollNumberSet
    );
    slice = sliceEnd;
    assignedRooms[`${roomNames[i]}v1`] = assignedRoom[0];
    assignedRooms[`${roomNames[i]}v2`] = assignedRoom[1];
    // assignedRooms.push(assignedRoom);
  }
  // console.log(assignedRooms, "gee");
  return assignedRooms;
}

async function prepareRequest(rooms, roomCapacities, rollNumbers) {
  console.log(rooms, roomCapacities, rollNumbers);
  console.log("prepareRequest");
  copySheetToTemp("floorPlans/floorPlansAll2", "temp/floorPlansAll");
  let roomPlans = [];
  let roomComponentCounts = [];
  const totalRooms = rooms.length;
  for (let i = 0; i < totalRooms; i++) {
    const roomObject = JSON.parse(
      fs.readFileSync(`./floorPlansJSON/${rooms[i]}.json`)
    );
    roomPlans.push(roomObject.plan);
    roomComponentCounts.push(roomObject.sizes);
  }
  const assignedRooms = divideRollNumbersInRooms(
    rooms,
    roomPlans,
    roomComponentCounts,
    roomCapacities,
    rollNumbers
  );
  const currentRooms = new Set(Object.keys(assignedRooms));
  let sheetsToRemove = new Set(
    [...allRoomSheets].filter((x) => !currentRooms.has(x))
  );
  // console.log(sheetsToRemove.values());
  let workbook = new Excel.Workbook();
  workbook.xlsx.readFile("temp/floorPlansAll.xlsx").then(function () {
    for (let room in assignedRooms) {
      let worksheet = workbook.getWorksheet(room);
      let assignedMatrix = assignedRooms[room];
      // console.log(worksheet, "worksheet");
      const n = assignedMatrix.length;
      for (let i = 0; i < n; i++) {
        let m = assignedMatrix[i].length;
        for (let j = 0; j < m; j++) {
          let o = assignedMatrix[i][j].length;
          for (let k = 0; k < o; k++) {
            if (
              assignedMatrix[i][j][k][0] != 0 &&
              assignedMatrix[i][j][k][1] != 0
            ) {
              const index =
                assignedMatrix[i][j][k][0] +
                assignedMatrix[i][j][k][1].toString();
              worksheet.getCell(index).value = assignedMatrix[i][j][k][2];
            }
          }
        }
      }
    }
    for (let room of sheetsToRemove.values()) {
      // console.log(room);
      let worksheet = workbook.getWorksheet(room);
      workbook.removeWorksheet(worksheet.id);
    }
    // let xxx = await workbook.xlsx.writeFile("temp/floorPlansAll.xlsx");
    // return xxx;
    return workbook.xlsx.writeFile("temp/floorPlansAll.xlsx");
  });
  // console.log(assignedRooms);
  // for (let room in assignedRooms) {
  //   console.log(room);
  //   // printArrangement(assignedRooms[room]);
  //   populateSheet(assignedRooms[room], room);
  //   console.log("created sheet with room ", room);
  //   // setTimeout(() => console.log("waiting"), 20000);
  // }

  // printArrangement(assignedRooms["C102v1"]);
  // const currentRooms = new Set(Object.keys(assignedRooms));
  // let sheetsToRemove = new Set(
  //   [...allRoomSheets].filter((x) => !currentRooms.has(x))
  // );
  // const roomPlanFile = "./temp/floorPlansAll.xlsx";
  // console.log("am I here?");
  // return res.download(roomPlanFile);
  // console.log(sheetsToRemove);
  // for (let room of sheetsToRemove) {
  //   deleteWorksheet(room);
  // }
}

function populateSheet(assignedMatrix, roomName) {
  let workbook = new Excel.Workbook();
  console.log("Enter populateSheet");
  workbook.xlsx.readFile("temp/floorPlansAll.xlsx").then(function () {
    // console.log("whayyyy");
    let worksheet = workbook.getWorksheet(roomName);
    // console.log(worksheet, "worksheet");
    const n = assignedMatrix.length;
    for (let i = 0; i < n; i++) {
      let m = assignedMatrix[i].length;
      for (let j = 0; j < m; j++) {
        let o = assignedMatrix[i][j].length;
        for (let k = 0; k < o; k++) {
          if (
            assignedMatrix[i][j][k][0] != 0 &&
            assignedMatrix[i][j][k][1] != 0
          ) {
            const index =
              assignedMatrix[i][j][k][0] +
              assignedMatrix[i][j][k][1].toString();
            worksheet.getCell(index).value = assignedMatrix[i][j][k][2];
          }
        }
      }
    }
    return workbook.xlsx.writeFile("temp/floorPlansAll.xlsx");
  });
}

function generateSheet(matrix, componentCounts, rollNumbers, roomName) {
  const matrices = divideRollNumbers(matrix, componentCounts, rollNumbers);
  const assignedMatrix1 = matrices[0];
  const assignedMatrix2 = matrices[1];
  populateSheet(assignedMatrix1, `${roomName}v1`);
  populateSheet(assignedMatrix2, `${roomName}v2`);
}

function deleteWorksheet(worksheetName) {
  let workbook = new Excel.Workbook();
  workbook.xlsx.readFile("floorPlans/floorPlansAll.xlsx").then(function () {
    let worksheet = workbook.getWorksheet(worksheetName);
    workbook.removeWorksheet(worksheet.id);
    return workbook.xlsx.writeFile("floorPlans/floorPlansAll.xlsx");
  });
}

function copySheetToTemp(fileName1, fileName2) {
  // fs.createReadStream(`floorPlans/${fileName}.xlsx`).pipe(
  //   fs.createWriteStream(`temp/${fileName}.xlsx`)
  // );
  fs.copyFileSync(`./${fileName1}.xlsx`, `./${fileName2}.xlsx`);
}

function deleteSheetFromTemp(fileName) {
  fs.unlink(`temp/${fileName}.xlsx`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function resetSheet(assignedMatrix, buildingName, roomName) {
  let workbook = new Excel.Workbook();
  workbook.xlsx.readFile(`floorPlans/${buildingName}.xlsx`).then(function () {
    let worksheet = workbook.getWorksheet(roomName);
    const n = assignedMatrix.length;
    for (let i = 0; i < n; i++) {
      let m = assignedMatrix[i].length;
      for (let j = 0; j < m; j++) {
        let o = assignedMatrix[i][j].length;
        for (let k = 0; k < o; k++) {
          // console.log(assignedMatrix[i][j][k][0], assignedMatrix[i][j][k][1]);
          if (
            assignedMatrix[i][j][k][0] != 0 &&
            assignedMatrix[i][j][k][1] != 0
          ) {
            const index =
              assignedMatrix[i][j][k][0] +
              assignedMatrix[i][j][k][1].toString();
            worksheet.getCell(index).value = "V";
          }
        }
      }
    }
    return workbook.xlsx.writeFile(`floorPlans/${buildingName}.xlsx`);
  });
}

function printArrangement(assignedMatrix) {
  const n = assignedMatrix.length;
  for (let i = 0; i < n; i++) {
    let m = assignedMatrix[i].length;
    for (let j = 0; j < m; j++) {
      let o = assignedMatrix[i][j].length;
      for (let k = 0; k < o; k++) {
        if (
          assignedMatrix[i][j][k][0] != 0 &&
          assignedMatrix[i][j][k][1] != 0 &&
          assignedMatrix[i][j][k][2] != ""
        ) {
          const index =
            assignedMatrix[i][j][k][0] + assignedMatrix[i][j][k][1].toString();
          console.log(index, assignedMatrix[i][j][k][2]);
        }
      }
    }
  }
}

// generateSheet(ans["plan"], ans["sizes"], rollNumbers, "C101");

// sheetLogistics("A006");

exports.renderRoomData = renderRoomData;
exports.prepareRequest = prepareRequest;
exports.populateSheet = populateSheet;
exports.copySheetToTemp = copySheetToTemp;
