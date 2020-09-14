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
              <p class="text-left text-primary-200 text-opacity-100">First name</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ชื่อจริง"
                v-model="secondStep[0].firstName"
                autofocus
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Surname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="นามสกุล"
                v-model="secondStep[0].Surname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Nickname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ชื่อเล่น"
                v-model="secondStep[0].Nickname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Student ID</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="รหัสนักศึกษา"
                v-model="secondStep[0].id"
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
              {{ getYear !== 1 && getYear !== 2 ? "Let's Go!" : 'Next Step'}}
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="loading" v-if="loading"></span>
            <span
              class="flex flex-row flex-no-wrap space-x-3"
              :class="loading ? 'animate-bounce' : ''"
            >
              <span class="bullet"></span>
              <span class="bullet active" :class="!loading ? 'animate-bounce' : ''"></span>
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {
      secondStep: [
        {
          firstName: "",
          Surname: "",
          Nickname: "",
          id: "",
          player: ""
        }
      ],
      confirm: "",
      loading: false,
      prevRoute: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
    if (!store.getters["register/getFirstStep"]) {
      next({ name: "Step 1", replace: true });
    } else {
      next();
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    let itemRoute = item =>
      (item.firstName !== null || item.firstName !== "") &&
      (item.Surname !== null || item.Surname !== "") &&
      (item.Nickname !== null || item.Nickname !== "") &&
      (item.id !== null || item.id !== "");
      
    if (to.path && !this.secondStep.every(itemRoute)) {
      alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
      next(false);
    } else {
      next();
    }
    next();
  },
  methods: {
    /* eslint-disable */
    ...mapActions("register", ["sendForm", "sendToken"]),

    nextStep() {
      let itemRoute = item =>
        (item.firstName !== null || item.firstName !== "") &&
        (item.Surname !== null || item.Surname !== "") &&
        (item.Nickname !== null || item.Nickname !== "") &&
        (item.id !== null || item.id !== "");

      this.loading = true;

      if (!this.secondStep.every(itemRoute)) {
        alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
        this.loading = false;
      } else if (this.checkStdId()) {
        if (this.getYear === 1) {
          this.$store.dispatch("register/setSecond", this.secondStep[0]);
          this.loading = false;
          this.$router.push({ name: "Step 3" });
        } else if (this.getYear === 2) {
          alertify.confirm(
            "คุณต้องการมีน้องรหัสหรือไม่?",
            "OK เพื่อไปต่อ CANCEL หากไม่ต้องการ",
            async () => {
              //กรณีที่ต้องการเล่น
              this.secondStep[0].player = 1;

              await this.$store.dispatch("register/setSecond", this.secondStep[0]);
              this.loading = false;
              this.$router.push({ name: "Step 3" });
            },
            async () => {
              //กรณีที่ไม่ต้องการเล่น
              this.secondStep[0].player = 0;
              
              await this.$store.dispatch("register/setSecond", this.secondStep[0]);

              await this.sendForm()
                .then(res => {
                  if (res) {
                    localStorage.setItem("firstTime", "false");
                    alertify.notify("สำเร็จ!", "success", 3);
                    this.loading = false;
                    this.$router.replace("/profile");
                  }
                })
                .catch(e => {
                  console.log(e);
                  alertify.notify("พบข้อผิดพลาด :(", "error", 3);
                  this.loading = false;
                });
            }
          );
        } else if (this.getYear === 3 || this.getYear === 4) {
          this.$store.dispatch("register/setSecond", this.secondStep[0]);

          this.sendForm()
            .then(res => {
              if (res) {
                localStorage.setItem("firstTime", "false");
                alertify.notify("สำเร็จ!", "success", 3);
                this.$router.replace("/profile");
              }
            })
            .catch(e => {
              console.log(e);
              alertify.notify("พบข้อผิดพลาด :(", "error", 3);
              this.loading = false;
            });
        }
      } else {
        alertify.notify("กรอกข้อมูลให้ถูกต้อง", "warning", 3);
        this.loading = false;
      }
    },
    checkStdId() {
      if (this.secondStep[0].id.length !== 8) {
        alertify.notify("รหัสนักศึกษาต้องมี 8 หลัก", "warning", 3);
        return false;
      } else {
        let id = parseInt(this.secondStep[0].id);
        let idScope = id % 1000000;
        let getTwo = Math.floor((id * 0.1) / 100000);
        let year = parseInt(this.getYear);
        let countLast =
          this.getYear === 1
            ? Math.floor(id % 1000) > 255
            : Math.floor(id % 1000) >= 379;

        if (Math.floor((idScope / 1000) % 10000) !== 70) {
          alertify.notify(
            "กรุณากรอกรหัสนักศึกษาของคณะไอทีเท่านั้น!",
            "error",
            3
          );
          return false;
        } else if (year === 1 && getTwo !== 63) {
          alertify.notify("กรุณากรอกรหัสนักศึกษาปี 1 ให้ถูกต้อง", "error", 3);
          return false;
        } else if (year === 2 && getTwo !== 62) {
          alertify.notify("กรุณากรอกรหัสนักศึกษาปี 2 ให้ถูกต้อง", "error", 3);
          return false;
        } else if (year === 3 && getTwo !== 61) {
          console.log(year, getTwo);
          alertify.notify("กรุณากรอกรหัสนักศึกษาปี 3 ให้ถูกต้อง", "error", 3);
          return false;
        } else if (year === 4 && getTwo !== 60) {
          alertify.notify("กรุณากรอกรหัสนักศึกษาปี 4 ให้ถูกต้อง", "error", 3);
          return false;
        } else if (countLast) {
          alertify.notify("กรุณากรอกรหัสนักศึกษาให้ถูกต้อง", "warning", 3);
          return false;
        } else {
          return true;
        }
      }
    }
  },
  computed: {
    ...mapGetters("register", ["getYear"])
  }
};
</script>

<style scoped>
</style>