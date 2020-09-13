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
        <div class="text-primary-275 text-clamp">{{ topPlayer[0].name }}</div>
        <div class="text-primary-250 text-2xl">{{ topPlayer[0].point }}</div>
      </div>

      <div class="topsec-player">
        <div class="player-item space-y-3"
             v-for="(item, i) in secondPlayer"
             :key="i">
         <span class="flex justify-center items-center my-2">
          <img :src="item.pic + '?width=180'" :alt="item.name" class="object-cover rounded-full h-24 w-24" />
        </span>
          <div class="text-primary-275 text-clamp">{{ item.name }}</div>
          <div class="text-primary-250 text-2xl">{{ item.point }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="secondary-container space-y-4">
    <div class="secondary-card space-x-4" v-for="item in getPlayer" :key="item.rank">
      <p class="rank">{{ item.rank }}</p>
      <img class="object-cover w-6 h-6 rounded-full img-rank" :src="item.pic" />
      <p class="text-xs player-txt text-clamp">{{ item.name }}</p>
      <p class="text-xs player-score">{{ item.point }}</p>
    </div>
    <rank-me :item="selfRank" />
  </div>
  </section>
</template>
<script>
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