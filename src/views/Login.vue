<template>
  <section class="w-screen h-screen">
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
    ...mapGetters(["user/getProfile", "user/getUser", "user/signInCheck"])
  },
  components: {
    LoginBox
  }
};
</script>