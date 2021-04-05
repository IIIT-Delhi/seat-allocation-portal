const express = require("express");
const seatAllocation = require("./algo");

const path = require("path");
const cors = require("cors");
const app = express(),
  bodyParser = require("body-parser");
port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../dashboard/public')));

// app.get('/api/users', (req, res) => {
//   console.log('api/users called!')
//   res.json(users);
// });

// app.post('/api/user', (req, res) => {
//   const user = req.body.user;
//   console.log('Adding user:::::', user);
//   users.push(user);
//   res.json("user addedd");
// });

async function abcdef() {
  await setTimeout(() => {
    console.log("waiting");
  }, 50000);
}

app.get("/home", (req, res) => {
  const roomObjects = seatAllocation.renderRoomData();
  res.send(roomObjects);
});

app.post("/setPlans", async (req, res) => {
  console.log("start post request *********************");
  await seatAllocation.prepareRequest(
    req.body.rooms,
    req.body.capacities,
    req.body.rollNumbers
  );
  // .then(function () {
  console.log("end post request ************************");
  res.send("yo done?");
  // const roomPlanFile = "./temp/floorPlansAll.xlsx";
  // console.log(roomPlanFile);
  // res.download(roomPlanFile);
  // });
});
app.get("/downloadPlans", async function (req, res) {
  // await setTimeout(() => {
  //   console.log("waiting");
  // }, 50000);
  console.log("get request **************");
  const roomPlanFile = "./temp/floorPlansAll.xlsx";
  res.download(roomPlanFile);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
