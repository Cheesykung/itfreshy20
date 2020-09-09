<template>
  <pageHFull>
    <template #headline>
      <span class="text-primary-250 font-semibold text-5xl">congrats!</span>
      <br />
      <span class="text-3xl">
        WELCOME
        <span class="text-primary-500 font-semibold">{{ name }}</span>
      </span>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              id="sub_button"
            >
              Let's Go!
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet active"></span>
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
      name: "ratchapol"
    };
  },
  methods: {}
};
</script>
