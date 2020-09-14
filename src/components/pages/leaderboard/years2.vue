<template>
  <section>
    <div class="flex flex-col content-center justify-center items-center py-6">
      <div class="flex flex-col space-y-6 px-4 w-full max-w-xl">
        <div
            class="flex flex-col items-center justify-center space-y-3"
            v-if="topPlayer"
        >
        <span class="flex justify-center items-center my-2">
          <img :src="topPlayer[0].pic ? topPlayer[0].pic + '?width=180' : placeholder" :alt="topPlayer[0].name" class="object-cover rounded-full h-24 w-24" />
        </span>
          <div class="text-primary-100 text-clamp">{{ topPlayer[0].name ? topPlayer[0].name : 'Waiting for Hunter...' }}</div>
          <div class="text-secondary_b text-2xl">{{ topPlayer[0].point }}</div>
        </div>

        <div class="topsec-player" v-if="secondPlayer">
          <div class="player-item space-y-3"
               v-for="(item, i) in secondPlayer"
               :key="i">
         <span class="flex justify-center items-center my-2">
          <img :src="item.pic ? item.pic + '?width=180' : placeholder" :alt="item.name" class="object-cover rounded-full h-24 w-24" />
        </span>
            <div class="text-primary-100 text-clamp">{{ item.name ? item.name : 'Waiting for Hunter...' }}</div>
            <div class="text-secondary_b text-2xl">{{ item.point }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="secondary-container space-y-4">
      <div class="secondary-card space-x-4" v-for="item in getPlayer" :key="item.rank">
        <p class="rank">{{ item.rank }}</p>
        <img class="object-cover w-6 h-6 rounded-full img-rank" :src="item.pic !== null ? item.pic : placeholder" />
        <p class="text-xs player-txt text-clamp">{{ item.name ? item.name : 'Waiting for Hunter...' }}</p>
        <p class="text-xs player-score text-secondary_b">{{ item.point }}</p>
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
      selfRank: this.self_rank,
      placeholder: 'data:image/png;base64,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'
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