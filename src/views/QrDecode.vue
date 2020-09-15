<template>
  <section
    class="flex flex-col main-wrap min-h-screen py-12 max-w-full justify-start items-center content-center px-4"
  >
    <div class="py-16 sm:py-20 container small-contain-col space-y-12">
      <h2
        class="text-primary font-semibold text-xl border-2 border-primary rounded-full py-2 px-6"
        :class="(success && !error ) ? 'text-secondary_b border-secondary_b' : 'text-complementary-treda border-complementary-treda'"
      >SCAN YOUR QR</h2>
      <qrcode-stream @decode="onDecode" @init="onInit" class="px-2" />
      <div
        class="text-gray-400 border-complementary-treda border-2 w-full py-3 flex flex-col space-y-2 text-sm px-6 rounded-lg"
        v-if="!result"
      >
        <span class="text-complementary-treda">**คำเตือน!! ระวังลิงค์หมดอายุ</span>
      </div>
      <div
        class="border-primary border-2 p-2 rounded-lg w-full text-sm text-primary break-words"
        :class="(success && !error ) ? 'text-secondary_b border-secondary_b' : 'text-complementary-treda border-complementary-treda'"
        v-if="result"
      >{{ success ? 'สำเร็จ! คลิกที่ปุ่มเพื่อไปต่อ' : 'รับสแกนเฉพาะลิงค์บนเว็บนี้เท่านั้น!' }}</div>
      <button
        class="bg-complementary-treda block py-3 px-8 text-sm rounded-lg"
        v-if="!success && result"
        @click="$router.go()"
      >Refresh</button>
      <button
        class="bg-secondary_b block py-3 px-8 text-sm rounded-lg"
        v-if="success"
        @click="goUrl()"
      >Continue</button>
      <div
        class="border-complementary-treda border-2 p-2 rounded-lg w-full text-gray-200 break-words"
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
/* eslint-disable */
export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      result: "",
      success: false,
      error: ""
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
  methods: {
    onDecode(result) {
      var urlPattern = new URL(result);

      if (urlPattern.hostname === "itfreshy2020.web.app") {
        this.success = true;
        this.result = urlPattern;
      } else {
        this.result = "failed";
      }
    },
    async onInit(promise) {
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
    },
    goUrl() {
        return window.open(this.result, "_self")
    }
  }
};
</script>