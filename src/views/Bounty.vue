<template>
  <section class="w-screen min-h-screen main-wrap py-12">
    <div v-if="bountyList">
    <div class="bounted-wrap grid-cols-1 sm:grid-cols-2">
      <div class="bounted-item space-y-4" v-for="(item, i) in bountyList.data" :key="i">
        <img :src="item.pic + '?width=200'" class="object-cover w-24 h-24 rounded-full" />
        <p class="text-lg">{{ item.nickname }}</p>
      </div>
    </div>
    </div>
    <grid-loader v-else />
  </section>
</template>

<script>
import API from "../middleware/api/userApi";
import axios from "axios";
import GridLoader from "@/components/util/gridLoader";

export default {
  data() {
    return {
      bountyList: null
    };
  },
  components: {
    GridLoader
  },
  mounted() {
    this.getBounty();
  },
  methods: {
    async getBounty() {
      try {
        const connections = await axios.get(API + "bounty");
        let data = connections.data;
        this.bountyList = data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.bounted-wrap {
  @apply grid gap-6 max-w-xl mx-auto px-6 my-12;
}

.bounted-item {
  @apply bg-primary-1100 bg-opacity-75 rounded-lg flex flex-col justify-center items-center px-3 py-12 text-primary-200;
}
</style>