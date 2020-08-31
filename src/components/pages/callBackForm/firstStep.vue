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
              <label
                for="branch"
                class="text-left text-gray-100 text-opacity-100"
              >Branch : {{ firstStep.branch }}</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="branch"
                v-model="firstStep.branch"
              >
                <option v-for="(item, i) in branch" :key="i">{{ item }}</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label
                for="year"
                class="text-left text-gray-100 text-opacity-100"
              >Year : {{ firstStep.year }}</label>
              <select
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="year"
                v-model="firstStep.year"
              >
                <option v-for="(item, i) in year" :key="i">{{ item }}</option>
              </select>
            </span>
            <span class="space-y-3 flex flex-col">
              <label for="contact" class="text-left text-gray-100 text-opacity-100">Contact</label>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="contact"
                v-model="firstStep.contact"
                placeholder="Facebook, Line, Tel, etc."
              />
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="nextStep()"
            >
              next step
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet active"></span>
              <span class="bullet"></span>
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
      firstStep: {
        branch: "",
        year: "",
        contact: null
      },
      branch: ["IT", "DATA", "BIT"],
      year: [1, 2, 3, 4]
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
      !(this.firstStep.branch && this.firstStep.year && this.firstStep.contact)
    ) {
      alertify.notify("PLEASE FILLED OUT!", "warning", 3);
      next(false);
    } else {
      next();
    }
  },
  methods: {
    nextStep() {
      if (
        !(
          this.firstStep.branch &&
          this.firstStep.year &&
          this.firstStep.contact
        )
      ) {
        alertify.notify("PLEASE FILLED OUT!", "warning", 3);
      } else {
        this.$store.dispatch("register/setFirstStep", this.firstStep);
        this.$router.push({ name: "Step 2" });
      }
    }
  }
};
</script>

<style scoped>
</style>