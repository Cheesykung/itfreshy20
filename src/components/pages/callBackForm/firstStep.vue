<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-orange-500 font-semibold">1</span>
      <p class="text-sm">About you</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col">
              <label
                for="branch"
                class="text-left text-gray-100 text-opacity-100"
              >Branch : {{ branch }}</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="branch"
                v-model="branch"
              >
                <option>IT</option>
                <option>DSBA</option>
                <option>BIT</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="year" class="text-left text-gray-100 text-opacity-100">Year : {{ year }}</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="year"
                v-model="year"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="contact" class="text-left text-gray-100 text-opacity-100">Contact</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="contact"
                v-model="contact"
              />
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
      branch: "",
      year: "",
      contact: null
    };
  },
  methods: {}
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