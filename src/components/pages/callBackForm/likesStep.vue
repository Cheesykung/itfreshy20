<template>
  <pageHFull>
    <template #headline>
      LAST STEP
    <p class="font-semibold text-5xl text-blue-500">Congratulation!</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
            
          <span class="content-center flex-wrap">
            <button class="font-medium text-sm w-1/6 h-8 btn bg-blue-600 hover:bg-blue-800 border-1 text-white rounded" type="button">
              Finish
            </button>
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
      }
  },
  methods: {

  }
};
</script>
