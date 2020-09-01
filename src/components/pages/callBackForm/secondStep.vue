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
                autofocus
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
            <span class="space-y-3 flex flex-col" v-if="getYear === '2'">
              <p class="text-left text-gray-100 text-opacity-100">คุณต้องการมีน้องรหัสใช่หรือไม่</p>
              <div
                class="flex flex-row space-x-2 text-gray-100 py-2 items-center justify-start flex-no-wrap content-center"
              >
                <label for="yes">ใช่</label>
                <input
                  type="radio"
                  id="yes"
                  name="confirm"
                  value="yes"
                  v-model="confirm"
                  class="px-2"
                />
                <label for="no">ไม่ใช่</label>
                <input
                  type="radio"
                  id="no"
                  name="confirm"
                  value="no"
                  v-model="confirm"
                  class="px-2"
                />
              </div>
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="nextStep();"
            >
              go!
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="flex flex-row flex-no-wrap space-x-3">
              <span class="bullet"></span>
              <span class="bullet active"></span>
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
import { mapGetters } from "vuex";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {
      secondStep: {
        firstName: "",
        Surname: "",
        Nickname: "",
        id: "",
        player: ""
      },
      confirm: "",
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
        this.checkStdId;
        if (this.checkStdId) {
          if (parseInt(this.getYear) === 2 && this.confirm) {
            if (this.confirm === "yes") {
               this.secondStep.player = 1;
               this.$store.dispatch("register/setSecond", this.secondStep);
            } else if (this.confirm === "no") {
              this.secondStep.player = 0;
              this.$store.dispatch("register/setSecond", this.secondStep);
            } else if (!this.confirm) {
              alertify.notify("PLEASE MAKE A CHOICE!", "warning", 3);
            }
          } else {
            this.$store.dispatch("register/setSecond", this.secondStep).then(res => console.log(res))
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters("register", ["getYear"]),
    checkStdId() {
      if (this.secondStep.id.length !== 8) {
        alertify.notify("รหัสนักศึกษาต้องมี 8 หลัก", "warning", 3);
        return false;
      } else {
        //62070102
        let id = parseInt(this.secondStep.id);
        let idScope = id % 1000000;
        if (Math.floor((idScope / 1000) % 10000) !== 70) {
          alertify.notify(
            "กรุณากรอกรหัสนักศึกษาของคณะไอทีเท่านั้น!",
            "error",
            3
          );
          return false;
        } else {
          return true;
        }
      }
    }
  }
};
</script>

<style scoped>
input:focus,
input:active,
textarea:focus,
textarea:active {
  border-bottom: 1px solid rgb(97, 97, 182) !important;
  box-shadow: 0 1px 0 0 rgb(97, 97, 182) !important;
}

input[type="radio"],
label {
  cursor: pointer;
}

input[type="radio"] {
  fill: rgb(97, 97, 182) !important;
}
</style>