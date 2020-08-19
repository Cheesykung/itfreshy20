<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-blue-500 font-semibold">1</span>
    <p class="text-sm">Profile</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <span class="space-y-3 flex flex-col">
          <p class="text-left text-gray-100 text-opacity-100">Name</p>
          <input type="text" class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="name" />
          </span>
           <span class="space-y-3 flex flex-col">
          <p class="text-left text-gray-100 text-opacity-100">Nickname</p>
          <input type="text" class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="nickname" />
           </span>
          <span class="space-y-3 flex flex-col">
          <p class="text-left text-gray-100 text-opacity-100">Age</p>
          <input type="text" class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="age" />
          </span>
          <span class="content-center flex-wrap">
            <button class="font-medium text-sm w-1/6 h-8 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-1 text-white rounded" type="button">
              next
            </button>
          </span>
            <span class="flex flex-row flex-no-wrap space-x-3 items-center justify-center">
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
.bullet {
  @apply w-2 h-2 bg-blue-900 block rounded-full;
}

.bullet.active {
  @apply bg-blue-500;
}
</style>