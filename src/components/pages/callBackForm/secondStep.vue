<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-blue-500 font-semibold">2</span>
      <p class="text-sm">Profile</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Name</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                v-model="name"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Nickname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                v-model="nickname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Student ID</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                v-model="nickname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">National : {{ national }}</p>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                v-model="national"
              >
                <option>Buddhism</option>
                <option>Christ</option>
                <option>Islam</option>
              </select>
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-blue-600 hover:bg-blue-800 text-blue-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              id="sub_button"
            >
              next step
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet active"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
            </span>
          </div>
          <!--- End step zone --->
        </template>
      </formContain>
      <!--- End of form area --->
    </template>
  </pageHFull>
</template>
<script>
//import { mapGetters } from "vuex"
import pageHFull from "../../util/pageHFull";
import formContain from "../../util/formContainer";

export default {
  components: {
    pageHFull,
    formContain
  },
  mounted() {
   
  },
  data() {
      return {
          name: "",
          nickname: "",
          national: ""
      }
  },
  methods: {
  }
};
</script>

<style scoped>
.bullet {
  @apply w-2 h-2 bg-blue-900 block rounded-full;
}

.bullet.active {
  @apply bg-blue-500;
}
</style>