<template>
  <pageHFull>
    <template #headline>
      <span class="text-3xl">your</span>
      <br />
      <span class="text-primary-500 font-semibold text-5xl">gender</span>
    </template>
    <template #body>
      <!--- Start gender grid --->
      <div class="grid-container gap-2 px-4 md:px-24">
        <!--- First grid row --->
        <!--- Other --->
        <div class="row-start-1 col-start-2 col-end-3">
          <span
            class="flex flex-col space-y-8 md:space-y-10 items-center cursor-pointer"
            @click="active = gender[0].gen"
          >
            <div
              class="w-24 h-24 md:w-40 md:h-40 icon-prefix"
              :class="gender[0].gen === active ? 'active' : ''"
            >
              <ion-icon :name="gender[0].ico" class="text-4xl md:text-6xl"></ion-icon>
            </div>
            <span
              class="text-lg md:text-xl text-gray-500 text-prefix capitalize"
              :class="active ===  gender[0].gen ? 'text-active' : ''"
            >{{ gender[0].gen }}</span>
          </span>
        </div>
        <!---- Second grid row --->
        <div 
          class="row-start-2 col-start-1 col-end-4 lg:col-start-2 lg:col-end-3 flex flex-row justify-center space-x-24 md:space-x-64"
        >
          <!--- Male & Female --->
          <span
            class="flex flex-col items-center space-y-8 md:space-y-10 cursor-pointer"
            v-for="i in 2"
            :key="i"
            @click="active = gender[i].gen"
          >
            <div
              class="w-24 h-24 md:w-40 md:h-40 icon-prefix"
              :class="gender[i].gen === active ? 'active' : ''"
            >
              <ion-icon :name="gender[i].ico" class="text-4xl md:text-6xl"></ion-icon>
            </div>
            <span
              class="text-lg md:text-xl text-gray-500 text-prefix capitalize"
              :class="gender[i].gen === active ? 'text-active' : ''"
            >{{ gender[i].gen }}</span>
          </span>
        </div>
      </div>
      <!--- End gender grid --->
      <!--- Start step zone --->
      <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
        <button
          type="submit"
          class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
          :class="active ? 'animate-pulse' : ''"
          @click="submitGen(active)"
          id="sub_button"
        >
          first step
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
        <span class="flex flex-row flex-no-wrap space-x-3 animate-bounce">
          <span class="bullet"></span>
          <span class="bullet"></span>
        </span>
      </div>
      <!--- End step zone --->
    </template>
  </pageHFull>
</template>
<script>
import pageHFull from "../../util/pageHFull";
import { mapActions } from "vuex";
import alertify from "alertifyjs";

export default {
  data() {
    return {
      gender: [
        { id: 3, gen: "other", ico: "male-female-outline" },
        { id: 1, gen: "male", ico: "male-outline" },
        { id: 2, gen: "female", ico: "female-outline" }
      ],
      active: ""
    };
  },
  components: {
    pageHFull
  },
  mounted() {
    this.chkClick();
  },
  methods: {
    ...mapActions("register", ["setGender"]),
    chkClick() {},
    submitGen: function(value) {
      if (value) {
        this.setGender(value);
        this.$router.push({ name: "Step 1" });
      } else {
        alertify.notify("PLEASE MAKE A CHOICE!", 'custom-warning', 3);
      }
    }
  }
};
</script>
<style scoped>
.gender {
  flex: 0 1 25%;
  @apply rounded-md m-4 text-gray-400 font-light;
}

.selected {
  border-radius: 100%;
  @apply border-4 border-solid border-blue-500;
}

.grid-container {
  @apply grid grid-cols-3 text-gray-400 content-center;
}

.icon-prefix {
  border-radius: 100%;
  border: 0.1rem #a8a5da solid;
  @apply rounded-full flex justify-center items-center flex-col text-primary-275 opacity-75;
}

.icon-prefix.active {
  border: 0.2rem #2720a4 solid;

  @apply text-primary relative opacity-100;
}

.icon-prefix.active::before {
  content: "✓";
  position: absolute;
  right: 2%;
  top: 2%;
  transform: translate(-2%, -2%);
  @apply text-primary-275 bg-primary rounded-full w-6 h-6 flex items-center justify-center;
}

.text-prefix {
  @apply font-normal text-primary-275 opacity-75;
}

.text-prefix.text-active {
  @apply text-primary font-semibold opacity-100;
}

@media (min-width: 768px) {
  .icon-prefix.active::before {
    top: 7%;
    right: 7%;
    transform: translate(-7%);
  }
}
</style>