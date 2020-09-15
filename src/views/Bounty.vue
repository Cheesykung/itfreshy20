<template>
  <section class="w-screen min-h-screen main-wrap py-12 px-6">
    <div v-if="bountyList !== null">
    <div class="announcement mx-4 max-w-xs sm:max-w-lg lg:max-w-3xl space-y-3">
      <h2 class="text-secondary_b font-semibold text-2xl md:text-3xl">นักล่า..ค่าหัวสูง</h2>
      <p class="font-light text-gray-300 text-sm">แหล่งรวมนักล่ามือฉมัง หากคุณล่าพวกเขาได้ จะได้รับเหรียญมากกว่าเรทปกติ</p>
      <p class="text-xs text-gray-400">**รายชื่อจะถูกสุ่มขึ้นมาตามระยะเวลาที่กำหนด</p>
    </div>
    <h2 class="text-xl md:text-2xl mx-auto mt-12 -mb-3 text-gray-300">เลือกปี</h2>
     <div class="filter space-x-4 -mb-6">
      <div class="filter-item bg-primary-1100 bg-opacity-75 h-8 w-8 flex flex-col justify-center"
           :class="year === i ? 'bg-secondary_b bg-opacity-100' : ''" v-for="i in 4" :key="i" @click="year = i; current = 'Year' + i">
        {{ i }}
      </div>
    </div>
    <keep-alive max="4" :key="year">
      <component v-bind="{player_data: getBountyByYear(year)}" :is="current" ></component>
    </keep-alive>
    </div>
    <grid-loader v-else />
  </section>
</template>

<script>
import API from "../middleware/api/userApi";
import axios from "axios";
import GridLoader from "@/components/util/gridLoader";
/* eslint-disable */
export default {
  data() {
    return {
      bountyList: null,
      filteredYear: [],
      year: 1,
      current: 'Year1'
    };
  },
  components: {
    GridLoader,
    Year1: () => import("../components/pages/bounty/year1"),
    Year2: () => import("../components/pages/bounty/year2"),
    Year3: () => import("../components/pages/bounty/year3"),
    Year4: () => import("../components/pages/bounty/year4"),
  },
  mounted() {
    this.getBounty();
  },
  methods: {
    async getBounty() {
      try {
        const connections = await axios.get(API + "bounty");
        let data = connections.data;
        this.bountyList = data.data;

      } catch (e) {
        console.log(e);
      }
    },
      getBountyByYear(year) {
      return this.bountyList.filter((item) => { return parseInt(item.year) === year })
    }
  },
};
</script>

<style>
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