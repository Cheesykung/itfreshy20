<template>
  <section></section>
</template>
<script>
import Axios from "axios";
import API from "../../middleware/api/userApi";

export default {
  mounted() {
      this.getCaptain();
  },
  methods: {
     getCaptain() {
      this.$store.dispatch("user/getToken").then(async res => {
        await Axios.get(API + "test/getsecert", {
          headers: {
            FIREBASE_AUTH_TOKEN: res
          }
        });
      }).catch(e => {
          throw e;
      })
    }
  },

};
</script>