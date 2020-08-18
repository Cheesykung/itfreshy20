<template>
  <pageHFull>
    <template #headline>
      เลือก
      <span class="text-blue-500 font-semibold">เพศ</span>
    </template>
    <template #body>
      <div
        class="flex flex-row flex-wrap justify-evenly content-center items-center text-gray-400 py-6"
      >
        <div
          class="gender md:p-16 flex flex-col space-y-12 md:space-y-20 justify-center items-center cursor-pointer"
          @click="setGender('ชาย'); redirect(0)"
        >
          <ion-icon name="male-outline" class="text-4xl md:text-6xl"></ion-icon>
          <span class="text-xl md:text-2xl">ชาย</span>
        </div>
        <div
          class="gender md:p-16 flex flex-col space-y-12 md:space-y-20 justify-center items-center cursor-pointer"
          @click="setGender('หญิง'); redirect(1)"
        >
          <ion-icon name="female-outline" class="text-4xl md:text-6xl"></ion-icon>
          <span class="text-xl md:text-2xl">หญิง</span>
        </div>
      </div>
    </template>
  </pageHFull>
</template>
<script>
import pageHFull from "../../util/pageHFull";
import { mapActions } from "vuex";

export default {
  components: {
    pageHFull
  },
  methods: {
    ...mapActions("register", ["setGender"]),
    redirect(num) {
      let el = document.getElementsByClassName("gender");

      el[num].classList.toggle("selected");

      return setTimeout(() => {
        //this.$router.push({ name: "Step 1" });
      }, 4000);
    }
  }
};
</script>
<style scoped>
.gender {
  @apply rounded-md m-4 text-gray-400 font-light;
  flex: 0 1 25%;
}

.selected {
  @apply border-4 border-solid border-blue-500;
  border-radius: 100%;
}
</style>