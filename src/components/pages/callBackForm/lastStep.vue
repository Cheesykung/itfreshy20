<template>
  <pageHFull>
    <template #headline>

    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>

        
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
