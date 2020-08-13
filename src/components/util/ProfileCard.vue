<template>
  <div
    class="card px-8 xl:px-10 py-12 md:py-8 justify-center flex-col md:justify-between md:flex-row cursor-pointer hover:shadow-outline"
  >
    <div class="img-place self-center md:py-0 py-3">
      <img
        :src="item.img"
        alt="profile picture"
        class="object-cover rounded-full w-32 h-32 md:w-24 md:h-24"
      />
    </div>
    <div class="profile-col justify-center md:justify-start md:text-left">
      <div class="bro-name space-y-1">
        <h2 class="text-gray-300 font-semibold">{{ item.name }}</h2>
        <span class="flex-1 text-gray-400 font-medium text-sm">{{ item.nickName }}</span>
      </div>
      <div class="flex flex-col space-y-1 my-2">
        <span
          class="flex-1 text-gray-500 font-medium text-xs"
        >{{ item.branch }} KMITL, Year {{ item.year }}</span>
        <div class="flex-1 md:self-start space-x-2">
          <i class="fas fa-pizza-slice text-gray-500 text-sm"></i>
          <i class="fas fa-football-ball text-gray-500 text-sm"></i>
          <i class="fab fa-spotify text-gray-500 text-sm"></i>
          <i class="fas fa-film text-gray-500 text-sm"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>