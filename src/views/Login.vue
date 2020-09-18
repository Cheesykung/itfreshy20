<template>
  <section class="w-screen h-screen">
    <div class="flex justify-center content-center h-full lg:px-40">
      <LoginBox />
    </div>
  </section>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {};
  },
  /* eslint-disable */
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if(firebase.auth().currentUser) {
        next('/profile');
      } else {
        next();
      }
      next();
    })
  },
  components: {
    LoginBox: () => import("@/components/util/LoginBox")
  }
};
</script>