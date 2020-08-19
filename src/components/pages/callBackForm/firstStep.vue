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
            <button class="font-medium text-sm w-1/6 h-8 btn bg-blue-600 hover:bg-blue-800 border-1 text-white rounded" type="button">
              next
            </button>
          </span>
          <span class="flex flex-row flex-no-wrap space-x-3 justify-center">
            <span class="bullet"></span>
            <span class="bullet active"></span>
            <span class="bullet"></span>
            <span class="bullet"></span>
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
  mounted() {
    this.chkClick();
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

<style scoped>
.bullet {
  @apply w-2 h-2 bg-blue-900 block rounded-full;
}

.bullet.active {
  @apply bg-blue-500;
}
</style>