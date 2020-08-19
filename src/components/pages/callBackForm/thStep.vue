<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-yellow-500 font-semibold">3</span>
    <p class="text-sm">What's you likes?</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
            <!-- <div class="content-center"> -->
                <!-- <div style="padding-left: 15%; padding-right: 15%"> -->
                    <div class="grid grid-flow-col grid-cols-2 grid-rows-1">
                        <div class="border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer">music</div>
                        <div class="border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs cursor-pointer">movie</div>
                    </div>
                <!-- </div> -->
                <!-- <div style="padding-left: 35%; padding-right: 35%"> -->
                    <div class="content-center border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs cursor-pointer"
                    >sport</div>
                 <!-- </div> -->
                <div>
                    <div class="grid grid-flow-col grid-cols-2 grid-rows-1">
                        <div class="border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs cursor-pointer">pet</div>
                        <div class="border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs cursor-pointer">code</div>
                    </div>
            </div>
        <span class="content-center flex-wrap">
            <button class="font-medium text-sm w-1/6 h-8 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-1 text-white rounded " type="button">
              next
            </button>
        </span>
        <span class="flex flex-row flex-no-wrap space-x-3 justify-center">
          <span class="bullet"></span>
          <span class="bullet"></span>
          <span class="bullet"></span>
          <span class="bullet active"></span>
        </span>
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
  data() {
      return {
          name: "",
          nickname: "",
          age: null
      }
  },
  methods: {

  }
};
</script>
<style scoped>

/* .border {
  border-radius: 100%;
  @apply border-4 border-solid border-yellow-500;
} */

.grid-container {
  @apply grid grid-cols-3 gap-10 text-gray-400 content-center;
}

.bullet {
  @apply w-2 h-2 bg-blue-900 block rounded-full;
}

.bullet.active {
  @apply bg-blue-500;
}
</style>