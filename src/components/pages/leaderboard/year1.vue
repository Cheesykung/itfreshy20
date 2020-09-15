<template>
  <section>
  <div class="flex flex-col content-center justify-center items-center py-6">
    <div class="flex flex-col space-y-6 px-4 w-full max-w-xl">
      <div
          class="flex flex-col items-center justify-center space-y-3"
      >
        <span class="flex justify-center items-center my-2">
          <img :src="topPlayer[0].pic + '?width=180'" :alt="topPlayer[0].name" class="object-cover rounded-full h-24 w-24" />
        </span>
        <div class="text-primary-100 text-clamp">{{ topPlayer[0].name }}</div>
        <div class="text-secondary_b text-2xl">{{ topPlayer[0].point }}</div>
      </div>

      <div class="topsec-player">
        <div class="player-item space-y-3"
             v-for="(item, i) in secondPlayer"
             :key="i">
         <span class="flex justify-center items-center my-2">
          <img :src="item.pic + '?width=180'" :alt="item.name" class="object-cover rounded-full h-24 w-24" />
        </span>
          <div class="text-primary-100 text-clamp">{{ item.name }}</div>
          <div class="text-secondary_b text-2xl">{{ item.point }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="secondary-container space-y-4">
    <div class="secondary-card space-x-4" v-for="item in getPlayer" :key="item.rank">
      <p class="rank">{{ item.rank }}</p>
      <img class="object-cover w-6 h-6 rounded-full img-rank" :src="item.pic" />
      <p class="text-xs player-txt text-clamp">{{ item.name }}</p>
      <p class="text-xs player-score text-secondary_b">{{ item.point }}</p>
    </div>
    <rank-me :item="selfRank" v-if="getYear < 3" />
  </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex"

export default {
  components: {
    RankMe: () => import("./rankMe")
  },
  data() {
    return {
      player: this.player_data,
      selfRank: this.self_rank
    }
  },
  props: ["player_data", "self_rank"],
  computed: {
    ...mapGetters("user", ["getYear"]),
    getPlayer() {
      return this.player.filter((item) => { return item.rank >= 4 })
    },
    topPlayer() {
      return this.player.filter((item) => { return item.rank === 1 })
    },
    secondPlayer() {
      return this.player.filter((item) => { return item.rank > 1 && item.rank < 4 })
    }
  }
}
</script>
<style>
.secondary-container {
  @apply flex flex-col justify-center items-stretch px-4 my-6 max-w-lg mx-auto text-primary-300;
}

.secondary-card {
  flex: 1 1;
  @apply rounded-full py-3 px-4 bg-primary-1100 bg-opacity-75 flex flex-row justify-start items-center content-center;
}

.secondary-card.isme {
  @apply relative mt-24 mb-10;
}

.secondary-card.isme:before {
  content: 'Your Rank';
  @apply absolute text-primary-200 text-2xl;
  top: -3.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.secondary-card .rank {
  flex: 0 1 5%;
}

.secondary-card .img-rank {
  flex: 0 1 5%;
}

.secondary-card .player-txt {
  flex: 1 1 50%;
  @apply text-left;
}

.secondary-card .player-score {
  flex: 1 1 10%;
}

.topsec-player {
  @apply flex flex-row justify-center items-stretch;
}

.topsec-player .player-item {
  flex: 1 1 50%;
  @apply flex flex-col justify-start items-center px-2;
}

.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}
</style>