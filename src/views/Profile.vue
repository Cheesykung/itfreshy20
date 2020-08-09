<template>
  <section class="w-screen h-screen profile-wrap">
    <div class="flex flex-wrap content-start justify-center items-center h-full py-12">
      <div class="profile container grid-cols-1 md:gap-10 gap-12 self-center">
        <div class="img-wrap space-y-4">
          <img
            src="https://thethaiger.com/wp-content/uploads/2019/03/49949680_519372558558364_2070976338994397184_n.jpg"
            class="object-cover w-32 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <!-- <span class="text-gray-500 font-normal text-sm">#6207002</span> -->
            <h1 class="text-3xl text-gray-100 font-thin">Mr, Kitti Singhapad</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt text-gray-500"></i>
            <span>IT KMITL, รุ่น 18</span>
          </div>
          <div class="like space-x-4">
            <i class="fas fa-pizza-slice text-gray-400"></i>
            <i class="fas fa-football-ball text-gray-400"></i>
            <i class="fab fa-spotify text-gray-400"></i>
            <i class="fas fa-film text-gray-400"></i>
          </div>
        </div>
        <div class="stats">
          <div class="chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-300">268</span>
            <span class="text-sm font-medium text-gray-500">รุ่นพี่ที่ล่าไปแล้ว</span>
          </div>
          <div class="un-chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-300">2K</span>
            <span class="text-sm font-medium text-gray-500">รุ่นพี่ที่ยังไม่ได้ล่า</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style scoped>
.profile {
  @apply grid;
}

.profile-wrap {
  background-image: linear-gradient(
    to top,
    rgba(23, 35, 59, 0.9) 45%,
    transparent 70%
  );
}

.img-wrap {
  @apply flex content-start flex-col justify-center;
}

.details {
  @apply flex  flex-col flex-wrap justify-center content-center px-4;
}

.like {
  @apply flex flex-row justify-center content-center text-lg;
}

.stats {
  @apply flex flex-row justify-center content-center flex-wrap;
}

.stats .un-chased,
.stats .chased {
  flex: 0 1 15%;
}

.faculty {
  @apply text-sm text-gray-500 flex justify-center content-center;
}

@media screen and (max-width: 676.8px) {
  .stats .un-chased,
  .stats .chased {
    flex: 0 1 38%;
  }
}

@media (min-width: 678px) and (max-width: 1023.8px) {
  .stats .un-chased,
  .stats .chased {
    flex: 0 1 20%;
  }
}
</style>  