<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-primary-500 font-semibold">1</span>
      <p class="text-sm text-primary-300">About you</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col">
              <label for="age" class="text-left text-primary-200 text-opacity-100">How old are you?</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="age"
                v-model="firstStep.age"
                placeholder="อายุของคุณ"
                required
                autofocus
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="religion" class="text-left text-primary-200 text-opacity-100">What's your religion?</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="religion"
                v-model="firstStep.religion"
                placeholder="ศาสนา: พุทธ, คริสต์, อิสลาม และวากานด้า"
                required
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="branch" class="text-left text-primary-200 text-opacity-100">Your Branch</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="branch"
                v-model="firstStep.branch"
                required
              >
                <option value disabled selected hidden class="text-primary-400">เลือกสาขา</option>
                <option v-for="(item, i) in branch" :key="i">{{ item }}</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="year" class="text-left text-primary-200 text-opacity-100">Your College Years</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="year"
                v-model="firstStep.year"
                required
              >
                <option value disabled selected hidden class="text-primary-400">เลือกชั้นปี</option>
                <option v-for="(item, i) in year" :key="i">{{ item }}</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="contact" class="text-left text-primary-200 text-opacity-100">Contact</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="contact"
                v-model="firstStep.contact"
                placeholder="Facebook, Line, Tel, etc."
                required
              />
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="nextStep()"
              v-if="!loading"
            >
              next step
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="loading" v-if="loading"></span>
            <span
              class="flex flex-row flex-no-wrap space-x-3"
              :class="loading ? 'animate-bounce' : ''"
            >
              <span class="bullet active" :class="!loading ? 'animate-bounce' : ''"></span>
              <span class="bullet"></span>
            </span>
            <span class="flex flex-row flex-no-wrap">
              <p
                class="text-primary-300 underline capitalize cursor-pointer text-sm"
                @click="$router.go(-1)"
              >Back</p>
              <!-- <span class="bullet"></span>
              <span class="bullet"></span>-->
            </span>
          </div>
          <!--- End step zone --->
        </template>
      </formContain>
      <!--- End of form area --->
    </template>
  </pageHFull>
</template>
<script>
import store from "../../../store";
import alertify from "alertifyjs";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {
      firstStep: {
        age: "",
        religion: "",
        branch: "",
        year: "",
        contact: null
      },
      branch: ["IT", "DATA", "BIT"],
      year: [1, 2, 3, 4],
      loading: false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters["register/getGender"]) {
      next({ path: "/gender", replace: true });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path &&
      !(
        this.firstStep.branch &&
        this.firstStep.year &&
        this.firstStep.contact &&
        this.firstStep.age &&
        this.firstStep.religion
      )
    ) {
      alertify.notify("PLEASE FILLED OUT!", "warning", 3);
      next(false);
    } else {
      next();
    }
  },
  methods: {
    nextStep() {
      this.loading = true;
      if (
        !(
          this.firstStep.branch &&
          this.firstStep.year &&
          this.firstStep.contact &&
          this.firstStep.age &&
          this.firstStep.religion
        )
      ) {
        this.loading = false;
        alertify.notify("PLEASE FILLED OUT!", "warning", 3);
      } else {
        if (this.checkLength()) {
          this.$store.dispatch("register/setFirstStep", this.firstStep);
          this.$router.push({ name: "Step 2" });
        }
        this.loading = false;
      }
    },
    checkLength() {
      if (this.firstStep.age.length !== 2 || !parseInt(this.firstStep.age)) {
        alertify.notify("กรอกอายุที่ถูกต้อง", "error", 3);
        return false;
      } else {
        return true;
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
</style>