<template>
  <section class="w-screen h-screen">
    <div class="flex justify-center content-center h-full lg:px-40">
      <LoginBox />
    </div>
  </section>
</template>
<script>
import LoginBox from "@/components/util/LoginBox.vue";

export default {
  data() {
    return {};
  },
  methods: {
    
  },
  components: {
    LoginBox
  }
};
</script>