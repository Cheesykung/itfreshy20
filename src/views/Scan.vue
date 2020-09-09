<template>
  <div>{{ getQrData }}</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data() {
    return {
    };
  },
  created() {
      this.setQr(this.$route.path.replace("/scan/", ""))
  },
  methods: {
    ...mapActions("user", ["setQr"])
  },
  computed: {
      ...mapGetters("user", ["getQrData"])
  }
};
</script>