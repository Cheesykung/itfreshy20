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
                v-model="secondStep.firstName"
                autofocus
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Surname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="นามสกุล"
                v-model="secondStep.Surname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Nickname</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="ชื่อเล่น"
                v-model="secondStep.Nickname"
              />
            </span>
            <span class="space-y-3 flex flex-col">
              <p class="text-left text-primary-200 text-opacity-100">Student ID</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="รหัสนักศึกษา"
                v-model="secondStep.id"
              />
            </span>
            <span class="space-y-3 flex flex-col" v-if="getYear === 2">
              <p class="text-left text-primary-200 text-opacity-100">คุณต้องการมีน้องรหัสใช่หรือไม่</p>
              <div
                class="flex flex-row space-x-2 text-primary-250 py-2 items-center justify-start flex-no-wrap content-center"
              >
                <input
                  type="radio"
                  id="yes"
                  name="confirm"
                  value="yes"
                  v-model="confirm"
                  class="px-1"
                />
                <label for="yes" class="mx-1">ใช่</label>
                <input
                  type="radio"
                  id="no"
                  name="confirm"
                  value="no"
                  v-model="confirm"
                  class="px-1"
                />
                <label for="no" class="mx-1">ไม่ใช่</label>
              </div>
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
            <span class="flex flex-row flex-no-wrap">
              <p
                class="text-primary-300 underline cursor-pointer text-sm"
                @click="$router.go(-1)"
              >BACK</p>
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
      secondStep: {
        firstName: "",
        Surname: "",
        Nickname: "",
        id: "",
        player: ""
      },
      confirm: "",
      loading: false
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
      alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
      next(false);
    } else {
      next();
    }
  },
  methods: {
    /* eslint-disable */
    ...mapActions("register", ["sendForm", "sendToken"]),
    nextStep() {
      this.loading = true;
      if (
        !(
          this.secondStep.firstName &&
          this.secondStep.Surname &&
          this.secondStep.Nickname &&
          this.secondStep.id
        )
      ) {
        alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
        this.loading = false;
      } else {
        if (this.checkStdId()) {
          if (this.getYear === 2 && this.confirm) {
            if (this.confirm === "yes") {
              this.secondStep.player = 1;
            } else if (this.confirm === "no") {
              this.secondStep.player = 0;
            } else if (!this.confirm) {
              alertify.notify("PLEASE MAKE A CHOICE!", "warning", 3);
              this.loading = false;
              return;
            }
          }

          this.$store.dispatch("register/setSecond", this.secondStep);

          if (this.getYear === 3 && this.getYear === 4) {
            this.sendForm()
              .then(res => {
                alertify.notify("สำเร็จ!", "success", 3);
                if (res) {
                  console.log(res);
                  this.sendToken().then(result => {
                    this.$router.push("/profile");
                  });
                }
              })
              .catch(e => {
                console.log(e);
                alertify.notify("พบข้อผิดพลาด :(", "error", 3);
                this.loading = false;
              });
          } else {
            this.$router.push({ name: "Step 3" });
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      }
    },
    checkStdId() {
      if (this.secondStep.id.length !== 8) {
        alertify.notify("รหัสนักศึกษาต้องมี 8 หลัก", "warning", 3);
        return false;
      } else {
        let id = parseInt(this.secondStep.id);
        let idScope = id % 1000000;
        let getTwo = Math.floor((id * 0.1) / 100000);
        let year = parseInt(this.getYear);
        let countLast = Math.floor(id % 1000) >= 300;

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
    // checkStdId() {
    //   if (this.secondStep.id.length !== 8) {
    //     alertify.notify("รหัสนักศึกษาต้องมี 8 หลัก", "warning", 3);
    //     return false;
    //   } else {
    //     //62070102
    //     let id = parseInt(this.secondStep.id);
    //     let idScope = id % 1000000;
    //     if (Math.floor((idScope / 1000) % 10000) !== 70) {
    //       alertify.notify(
    //         "กรุณากรอกรหัสนักศึกษาของคณะไอทีเท่านั้น!",
    //         "error",
    //         3
    //       );
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // }
  }
};
</script>

<style scoped>
</style>