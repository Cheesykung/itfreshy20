<template>
  <div
    class="bounted-wrap max-w-xs sm:max-w-lg grid-cols-1 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-3"
  >
    <div
      class="bounted-item space-y-6"
      v-for="(item, i) in player_data"
      :key="i"
    >
      <img
        :src="item.pic + '?width=200'"
        class="object-cover w-32 h-32 sm:w-24 sm:h-24 rounded-full"
      />
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <p class="text-xl text-primary-200 text-clamp">{{ item.fname + " " + item.surname }}</p>
          <p class="text-primary-25 text=sm text-primary-250">{{ item.nickname }}</p>
        </div>
        <div class="flex flex-col space-y-2">
          <p class="text-xs">
            <i class="fas fa-map-marked-alt text-secondary_b"></i>
            {{ item.branch }}, Year {{ item.year }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "year2",
  props: ["player_data"]
};
</script>