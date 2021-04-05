<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Seat Allocation Portal
      </div>
    </v-app-bar>

    <v-main style="text-align: center">
      <v-container fluid class="d-flex align-center flex-column">
        <v-textarea
          clearable
          clear-icon="mdi-close-circle"
          label="Add rollnumbers separated by comma (,), space or new line"
          style="width: 100vh"
          v-model="rollNumberString"
        ></v-textarea>
        <v-radio-group row mandatory v-model="rollNumberSeparator">
          <v-radio label="Comma separated" value=","></v-radio>
          <v-radio label="Space separated" value="' '"></v-radio>
          <v-radio label="Line separated" value="\n"></v-radio>
        </v-radio-group>
      </v-container>
      <v-progress-linear
        indeterminate
        color="cyan"
        v-if="this.loading"
      ></v-progress-linear>
      <v-container
        fluid
        grid-list-l
        style="width: 1300px; height: 250px"
        v-for="(building, index) in rooms"
        :key="index"
        class="d-flex flex-column justify-space-around"
      >
        <div>
          <h3>{{ index }}</h3>
        </div>
        <v-layout
          wrap
          class="d-flex justify-space-between align-center flex-grow-1"
        >
          <v-flex v-for="(room, name) in building" :key="name">
            <Room
              :roomName="name"
              :roomCapacity="room[0]"
              :roomBuilding="room[1]"
              :roomFloor="room[2]"
              :selected="room[3]"
              @selected="toggleSelectedValue"
            />
          </v-flex>
          <!-- event to listen, on event, update list -->
        </v-layout>
      </v-container>
      <v-btn
        depressed
        color="primary"
        @click="getRoomPlans"
        style="margin: 20px"
      >
        Generate Room Plan
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Room from "./components/Room";
import TriggerEvents from "./services/triggerEvents";

export default {
  name: "App",

  data() {
    return {
      rooms: {},
      rollNumberString: "",
      rollNumberSeparator: ",",
      loading: false,
      //selectedRooms: [],
    };
  },

  components: {
    Room,
  },

  props: {},

  created() {
    this.getRoomData();
  },

  methods: {
    async getRoomData() {
      TriggerEvents.getRooms().then(
        ((rooms) => {
          this.$set(this, "rooms", rooms);
          console.log(this.rooms);
        }).bind(this)
      );
    },
    toggleSelectedValue(building, roomName) {
      this.rooms[building][roomName][3] = !this.rooms[building][roomName][3];
    },
    getRoomPlans() {
      this.loading = true;
      let selectedRooms = [];
      let selectedRoomsCapacities = [];
      for (let building in this.rooms) {
        for (let room in this.rooms[building]) {
          if (this.rooms[building][room][3]) {
            selectedRooms.push(room);
            selectedRoomsCapacities.push(this.rooms[building][room][0]);
          }
        }
      }

      let rollnumbersList = this.rollNumberString.split(
        this.rollNumberSeparator
      );

      // console.log(selectedRooms, selectedRoomsCapacities, rollnumbersList);
      const request = [selectedRooms, selectedRoomsCapacities, rollnumbersList];
      console.log(request, "request");
      TriggerEvents.setRoomPlans(request).then((response) => {
        console.log(response, "haiiii");
        setTimeout(() => {
          TriggerEvents.getRoomPlans().then((response) => {
            const fileURL = window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"],
              })
            );
            // console.log(fileURL, "**************************");
            let fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "roomPlan.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
            this.loading = false;
          });
        }, 7000);
      });
    },
  },
};
</script>
