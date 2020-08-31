<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-primary-500 font-semibold">3</span>
      <p class="text-sm text-primary-300">What's you likes?</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4 flex mb-2 ml-4 mr-0">
            <div
              class="transition duration-500 ease-in-out hover:bg-teal-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
              :class="active === 'movie' ? 'active' : ''"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
            <div
              class="transition duration-500 ease-in-out hover:bg-gray-500 transform hover:-translate-y-1 hover:scale-150 border rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 border-teal-400 text-xs cursor-pointer"
            >music</div>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              id="sub_button"
            >
              next step
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet active"></span>
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
// import pageHFull from "../../util/pageHFull";
// import formContain from "../../util/formContainer";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {
      gender: ["", "", ""],
      active: "movie"
    };
  },
  methods: {}
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
</style>