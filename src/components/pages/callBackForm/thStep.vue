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
            <div class="content-center">
                <div style="padding-left: 15%; padding-right: 15%">
                    <div class="grid grid-flow-col grid-cols-2 grid-rows-1">
                        <div class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs">music</div>
                        <div class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs">movie</div>
                    </div>
                </div>
                <div style="padding-left: 35%; padding-right: 35%">
                    <div class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs ">sport</div>
                </div>
                <div style="padding-left: 15%; padding-right: 15%">
                    <div class="grid grid-flow-col grid-cols-2 grid-rows-1">
                        <div class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs">pet</div>
                        <div class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-600 text-xs">code</div>
                    </div>
                </div>
            </div>
        <span class="content-center flex-wrap">
            <button class="text-sm w-1/6 h-8 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-1 text-white rounded" type="button">
              next
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
          name: "",
          nickname: "",
          age: null
      }
  },
  methods: {

  }
};
</script>