<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-orange-500 font-semibold">2</span>
    <p class="text-sm">About you</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
            <span class="space-y-3 flex flex-col">
                <p class="text-left text-gray-100 text-opacity-100">Branch : {{ branch }}</p>
                <select class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="branch" >
                    <option>IT</option>
                    <option>DSBA</option>
                    <option>BIT</option>
                </select>
            </span>
          <span class="space-y-3 flex flex-col">
                <p class="text-left text-gray-100 text-opacity-100">Year : {{ year }}</p>
                <select  class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="year" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
           </span>
          <span class="space-y-3 flex flex-col">
          <p class="text-left text-gray-100 text-opacity-100">Contact</p>
          <input type="text" class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="contact" />
          </span>
          <span class="content-center flex-wrap">
            <button class="w-1/6 h-8 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-1 text-white rounded" type="button">
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
          branch: "",
          year: "",
          contact: null
      }
  },
  methods: {

  }
};
</script>