<template>
  <section
    class="flex flex-col main-wrap min-h-screen py-12 max-w-full justify-start items-center content-center px-4"
  >
    <div class="py-16 sm:py-20 container small-contain-col space-y-12 md:space-y-6">
      <h2
        class="text-primary font-semibold text-xl border-2 border-primary rounded-full py-2 px-6"
        :class="(success && !error ) ? 'text-secondary_b border-secondary_b' : 'text-complementary-treda border-complementary-treda'"
      >SCAN YOUR QR</h2>

      <qrcode-stream @decode="onDecode" @init="onInit" class=" transition-all ease-linear duration-300 transform md:scale-75" v-if="!destroy" >
        <grid-loader v-if="loading"/>
      </qrcode-stream>

      <div
        class="text-gray-400 border-complementary-treda border-2 w-full py-3 flex flex-col space-y-2 text-sm px-6 rounded-lg max-w-sm"
        v-if="!result"
      >
        <span class="text-complementary-treda">**คำเตือน!! ระวังลิงค์หมดอายุ</span>
      </div>
      <div
        class="border-primary border-2 p-2 rounded-lg w-full text-sm text-primary break-words max-w-sm"
        :class="(success && !error ) ? 'text-secondary_b border-secondary_b' : 'text-complementary-treda border-complementary-treda'"
        v-if="result"
      >{{ success ? 'สำเร็จ!' : 'รับสแกนเฉพาะลิงค์บนเว็บนี้เท่านั้น!' }}<span class="loading" v-if="success"></span></div>
      <button
        class="bg-complementary-treda block py-3 px-8 text-sm rounded-lg"
        v-if="!success && result"
        @click="$router.go()"
      >Refresh</button>
      <div
        class="border-complementary-treda border-2 p-2 rounded-lg w-full text-gray-200 break-words max-w-sm"
        v-if="error"
      >
        <span class="text-complementary-treda font-semibold">Error!</span>
        {{ error }}
      </div>
    </div>
  </section>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import alertify from "alertifyjs"
import GridLoader from "@/components/util/gridLoader";

/* eslint-disable */
export default {
  components: {
    QrcodeStream,
    GridLoader
  },
  data() {
    return {
      result: "",
      success: false,
      error: "",
      loading: false,
      destroy: false
    };
  },
  /* eslint-disable  */

  watch: {
    "$route.path"(to, from) {
      this.success = false;
      this.result = "";
      this.error = "";
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.destroy = false;
    })
    next();
  },
  beforeRouteLeave(to, from, next) {
    if(to.path)
      this.destroy = true;
    next();
  },
  methods: {
    onDecode(result) {
      var urlPattern = new URL(result);

      if (urlPattern.hostname === "hunter.war.in.th") {
        this.success = true;
        this.result = urlPattern;
        alertify.notify("Success! Redirecting...", "success", 2)
        setTimeout(() => {
          window.open(urlPattern, "_self")
        }, 1600)
      } else {
        this.result = "failed";
      } 
    },
    async onInit(promise) {
      this.loading = true;

      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
      finally {
        this.loading = false;
      }
    },
    goUrl() {
        return window.open(this.result, "_self")
    }
  }
};
</script>