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
  mounted() {
    this.chkSign()
  },
  methods: {
    chkSign() {
      this.signInCheck && this.getFirstTime === 1
      ? this.$router.push("/profile")
      : this.getFirstTime === 0 && this.signInCheck
      ? this.$router.push("/continue")
      : "";
    }
  },
  computed: {
    ...mapGetters("user", ["signInCheck", "getFirstTime"])
  },
  components: {
    LoginBox
  }
};
</script>