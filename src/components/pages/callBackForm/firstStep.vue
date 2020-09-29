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
                id="age"
                v-model="firstStep[0].age"
                placeholder="อายุของคุณ"
                required
                autofocus
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <label
                for="religion"
                class="text-left text-primary-200 text-opacity-100"
              >What's your religion?</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="religion"
                v-model="firstStep[0].religion"
                placeholder="ศาสนา: พุทธ, คริสต์, อิสลาม และวากานด้า"
                required
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="branch" class="text-left text-primary-200 text-opacity-100">Your Branch</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="branch"
                v-model="firstStep[0].branch"
                required
              >
                <option value disabled selected hidden class="text-primary-400">เลือกสาขา</option>
                <option v-for="(item, i) in branch" :key="i">{{ item }}</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label
                for="year"
                class="text-left text-primary-200 text-opacity-100"
              >Your College Years</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="year"
                v-model="firstStep[0].year"
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
                id="contact"
                v-model="firstStep[0].contact"
                placeholder="Facebook, Line, Tel, etc."
                required
              />
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
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
              <span class="bullet"></span>
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
      firstStep: [{
        age: "",
        religion: "",
        branch: "",
        year: "",
        contact: null
      }],
      branch: ["IT", "DSBA", "BIT"],
      year: [1, 2, 3, 4],
      loading: false,
      prevRoute: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
    if (!store.getters["register/getGender"]) {
      next({ path: "/gender", replace: true });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    let itemRoute = item =>
        item.branch !== null &&
        item.year.length === 1 &&
        item.contact.length >= 1 &&
        item.religion.length >= 1 &&
        item.age !== null;

    if (to.path && !this.firstStep.every(itemRoute)) {
      alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
      next(false);
    } else {
      next();
    }
  },
  methods: {
    nextStep() {
      let itemRoute = item =>
        item.branch !== null &&
        item.year.length === 1 &&
        item.contact.length >= 1 &&
        item.religion.length >= 1 &&
        item.age !== null;

      this.loading = true;

      if (!this.firstStep.every(itemRoute)) {
        this.loading = false;
        alertify.notify("กรอกข้อมูลให้ถูกต้อง", "warning", 3);
      } else {
        if (this.checkLength()) {
          this.$store.dispatch("register/setFirstStep", this.firstStep[0]);
          this.$router.push({ name: "Step 2" });
        }
        this.loading = false;
      }
    },
    checkLength() {
      let intAge = parseInt(this.firstStep[0].age);

      if (
        this.firstStep[0].age.length !== 2 ||
        !intAge ||
        intAge > 26 ||
        intAge < 17
      ) {
        alertify.notify("กรอกอายุที่ถูกต้อง", "error", 3);
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
</style>