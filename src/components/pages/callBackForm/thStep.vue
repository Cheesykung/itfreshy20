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
            <div class="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4 flex mb-2 ml-4 mr-0">
                <div class="transition duration-500 ease-in-out hover:bg-teal-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer "
                    :class="active === 'movie' ? 'active' : ''"
                >music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
                <div class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer ">music</div>
            </div>
        <span class="content-center flex-wrap">
            <button class="font-medium text-sm w-1/6 h-8 btn bg-blue-600 hover:bg-blue-800 border-1 text-white rounded" type="button">
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
          gender: ["", "", ""],
          active: "movie"
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
  @apply grid grid-cols-3 gap-10 text-gray-700 content-center;
}

.bullet {
  @apply w-2 h-2 bg-blue-900 block rounded-full;
}

.bullet.active {
  @apply bg-blue-500;
}




</style>