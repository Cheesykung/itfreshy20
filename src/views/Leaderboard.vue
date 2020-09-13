<template>
  <section class="w-screen min-h-screen main-wrap overflow-hidden">
    <div class="filter space-x-4">
      <div class="filter-item bg-primary-1100 bg-opacity-75"
           :class="active === i ? 'bg-secondary_b bg-opacity-100' : ''" v-for="i in 2" :key="i" @click="active = i">
        Year {{ i }}
      </div>
    </div>

    <keep-alive max="2" v-if="leaderList">
      <year1 v-if="active === 1" :player_data="leaderList.year1" :self_rank="leaderList.rankMe"/>
      <year2 v-else :player_data="leaderList.year2" :self_rank="leaderList.rankMe" />
    </keep-alive>
    <div class="flex flex-row justify-center items-center h-full my-24" v-else>
      <grid-loader />
    </div>
  </section>
</template>

<script>
import API from "../middleware/api/userApi";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import GridLoader from "@/components/util/gridLoader";

export default {
  components: {
    GridLoader,
    year1: () => import("../components/pages/leaderboard/year1"),
    year2: () => import("../components/pages/leaderboard/years2"),
  },
  data() {
    return {
      leaderList: null,
      active: 1
    };
  },
  mounted() {
    this.getLeader();
  },
  methods: {
    ...mapActions("user", ["getToken"]),
    getDataByYear(year) {
      return year
    },
    getLeader() {
      this.getToken().then(async res => {
        try {
          const connections = await axios.post(
            API + "ldrboard/ranking",
            { year: this.getYear },
            {
              headers: {
                FIREBASE_AUTH_TOKEN: res
              }
            }
          );
          let data = connections.data;
          this.leaderList = data;
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed: {
    ...mapGetters("user", ["getYear"])
  }
};
</script>

<style scoped>
.filter {
  @apply flex flex-row justify-center items-center flex-no-wrap px-4 py-8 max-w-sm mx-auto;
}

.filter .filter-item {
  flex: 1 1 10%;
  @apply text-primary-200 p-3 text-xs cursor-pointer rounded-full;
}

>>> .secondary-container {
  @apply flex flex-col justify-center items-stretch px-4 my-6 max-w-lg mx-auto text-primary-300;
}

>>> .secondary-card {
  flex: 1 1;
  @apply rounded-full py-3 px-4 bg-primary-1100 bg-opacity-75 flex flex-row justify-start items-center content-center;
}

>>> .secondary-card:last-child {
  @apply relative mt-24 mb-10;
}

>>> .secondary-card:last-child:before {
  content: 'Your Rank';
  @apply absolute text-primary-200 text-2xl;
  top: -3.5rem;
  left: 50%;
  transform: translateX(-50%);
}

>>> .secondary-card .rank {
  flex: 0 1 5%;
}

>>> .secondary-card .img-rank {
  flex: 0 1 5%;
}

>>> .secondary-card .player-txt {
  flex: 1 1 50%;
  @apply text-left;
}

>>> .secondary-card .player-score {
  flex: 1 1 10%;
}

>>> .topsec-player {
  @apply flex flex-row justify-center items-stretch;
}

>>> .topsec-player .player-item {
  flex: 1 1 50%;
  @apply flex flex-col justify-start items-center px-2;
}

>>> .text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}
</style>