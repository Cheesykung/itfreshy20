<template>
  <section class="w-screen min-h-screen main-wrap py-6">
    <div v-if="bountyList">
    <div class="bounted-wrap max-w-xs sm:max-w-lg grid-cols-1 sm:grid-cols-2">
      <div class="bounted-item space-y-6" v-for="(item, i) in bountyList.data" :key="i">
        <img :src="item.pic + '?width=200'" class="object-cover w-32 h-32 sm:w-24 sm:h-24 rounded-full" />
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col">
          <p class="text-xl text-primary-200 text-clamp">{{ item.fname + " " + item.surname }}</p>
          <p class="text-primary-25 text=sm text-primary-250">{{ item.nickname }}</p>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="text-xs text-primary-275"><i class="fas fa-map-marked-alt"></i> {{ item.branch }}, Year {{ item.year }}</p>
          </div>
        </div>
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
  @apply grid gap-8 mx-auto px-6 my-12;
}

.bounted-item {
  @apply bg-primary-1100 bg-opacity-75 rounded-lg flex flex-col justify-center items-center px-8 py-16 text-primary-200;
}

.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}
</style>