<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-primary-500 font-semibold">2</span>
      <p class="text-sm text-primary-300">Your detail</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">First name</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ชื่อจริง"
                v-model="secondStep.firstName"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Surname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="นามสกุล"
                v-model="secondStep.Surname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Nickname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ชื่อเล่น"
                v-model="secondStep.Nickname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-gray-100 text-opacity-100">Student ID</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="รหัสนักศึกษา"
                v-model="secondStep.id"
              />
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="nextStep();"
            >
              next step
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet"></span>
              <span class="bullet active"></span>
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
      secondStep: { firstName: "", Surname: "", Nickname: "", id: null }
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters["register/getFirstStep"]) {
      next({ name: "Step 1", replace: true });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path &&
      !(
        this.secondStep.firstName &&
        this.secondStep.Surname &&
        this.secondStep.Nickname &&
        this.secondStep.id
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
      if (
        !(
          this.secondStep.firstName &&
          this.secondStep.Surname &&
          this.secondStep.Nickname &&
          this.secondStep.id
        )
      ) {
        alertify.notify("PLEASE FILLED OUT!", "warning", 3);
      } else {
        this.$store.dispatch("register/setSecond", this.secondStep);
        this.$router.push({ name: "Step 3" });
      }
    }
  }
};
</script>

<style scoped>
</style>