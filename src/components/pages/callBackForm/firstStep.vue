<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-blue-500 font-semibold">1</span>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <input type="text" class="base-input" v-model="name" />
          <input type="text" class="base-input" v-model="nickname" />
          <input type="text" class="base-input" v-model="age" />
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