import axios from "axios";

export default {
  async getRooms() {
    let res = await axios.get("http://localhost:4000/home");
    return res.data;
  },
  async setRoomPlans(request) {
    console.log(request, "what");
    let res = await axios.post("http://localhost:4000/setPlans", {
      rooms: request[0],
      capacities: request[1],
      rollNumbers: request[2],
    });
    // console.log(res);
    return res;
  },
  async getRoomPlans() {
    let res = await axios.get("http://localhost:4000/downloadPlans", {
      responseType: "arraybuffer",
    });
    console.log(res);
    return res;
  },
};
