<template>
  <section class="w-screen h-screen" v-if="!signInCheck">
    <div class="flex justify-center content-center h-full lg:px-40">
      <LoginBox />
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import LoginBox from "@/components/util/LoginBox.vue";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProfile", "getUser", "signInCheck"])
  },
  components: {
    LoginBox
  }
};
</script>