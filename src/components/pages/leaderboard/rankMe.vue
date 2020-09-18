<template>
      <div class="secondary-card isme space-x-4" id="last">
        <p class="rank text-secondary_b">{{ player.rank }}</p>
        <img class="object-cover w-6 h-6 rounded-full img-rank" :src="player.pic" />
        <p class="text-xs player-txt text-clamp text-secondary_b">{{ player.name }}</p>
        <p class="text-xs player-score text-secondary_b">{{ player.point }}</p>
      </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      player: this.item
    }
  }
}
</script>