<template>
  <v-card
    :style="[
      selectedClass
        ? { 'background-color': '#41b883' }
        : { 'background-color': '#cefcc5', color: 'white' },
    ]"
    max-width="200"
    outlined
    @click="changeColour"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ roomName }}
        </v-list-item-title>
        <v-list-item-subtitle
          >Capacity: {{ roomCapacity }}</v-list-item-subtitle
        >
        <v-list-item-subtitle style="font-size: 10px;"
          >{{ roomBuilding }}, {{ roomFloor }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      selectedClass: false,
    };
  },
  props: {
    roomName: String,
    roomCapacity: Number,
    roomBuilding: String,
    roomFloor: String,
    selected: Boolean,
  },
  created() {
    // console.log(this.selected);
  },
  methods: {
    changeColour() {
      console.log("Original", this.selectedClass);
      this.selectedClass = !this.selectedClass;
      console.log("Changed", this.selectedClass);
      this.$emit("selected", this.roomBuilding, this.roomName);
      // emit to app.vue(index)
    },
  },
  name: "Room",
};
</script>
<style scoped>
.is-selected {
  font-style: italic;
}
</style>
