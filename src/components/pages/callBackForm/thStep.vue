<template>
  <pageHFull>
    <template #headline>
      STEP
      <span class="text-primary-500 font-semibold">3</span>
      <p class="text-sm text-primary-300">What's you likes?</p>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 mb-5 flex flex-col content-center justify-center items-center">
              <h4 class="text-xl text-primary-250 font-semibold">
                กรอกสิ่งที่ชอบทำ 5 อันดับ
              </h4>
              <p class="text-sm text-primary-300">เรียงลำดับจากมากไปน้อย</p>
            </span>
            <span class="space-y-3 flex flex-col" v-for="(item, i) in likes" :key="i">
              <p class="text-left text-primary-200 text-opacity-100">ลำดับที่ {{ i+1 }}</p>
              <input
                type="text"
                class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                placeholder="กรอกสิ่งที่ชอบ"
                v-model="likes[i]"
              />
            </span>
          </div>
          <!--- Start step zone --->
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="submit()"
              v-if="!loading"
            >
              Let's Go!
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            <span class="loading" v-if="loading"></span>
            <span
              class="flex flex-row flex-no-wrap space-x-3"
              :class="loading ? 'animate-bounce' : ''"
            >
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet active" :class="!loading ? 'animate-bounce' : ''"></span>
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
/* eslint-disable */
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
      likes: new Array(5),
      loading: false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      !store.getters["register/getSecondStep"] &&
      store.getters["register/getYear"] === 3 &&
      store.getters["register/getYear"] === 4
    ) {
      if(store.getters["register/getYear"] === 3 &&
      store.getters["register/getYear"] === 4) {
        next({ path: "/profile", replace: true })
      } else {
        next({ name: "Step 2", replace: true });
      }
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path && !this.likes.every(item => item.length > 2 && item !== null && item !== "" && !item.length < 3)) {
      alertify.notify("PLEASE FILL UP THE FORM!", "warning", 3);
      next(false);
    } else {
      next();
    }
  },
  methods: {
    ...mapActions("register", ["sendForm", "getGate", "sendToken", "setLikes"]),
    ...mapActions("user", ["setProfile", "sendToken"]),
    async submit() {
      this.loading = true;
      const ifArrayEmpty = (item) => item.length > 2 && item !== null && item !== "" && !item.length < 3;
      if (this.getYear === 2) {
        if (this.likes.every(ifArrayEmpty)) {
          this.setLikes(this.likes);
          this.sendForm()
            .then(res => {
              this.loading = false;
              if (res) {
                this.sendToken().then((res) => {
                  this.$router.push({ path: "/profile" });
                })
              }
            })
            .catch(e => {
              console.log(e);
              alertify.notify("พบข้อผิดพลาด :(", "error", 3);
              this.loading = false;
            });
        } else {
          this.loading = false
          alertify.notify("ATLEAST 3 CHARACTERS", "warning", 3);
          return;
        }
      } else {
        if (this.likes.every(ifArrayEmpty)) {
          await this.setLikes(this.likes);
          await this.getGate().then((gate) => {
            if(gate.data.length > 0) {
               this.sendForm()
              .then(res => {
                if (res) {
                  this.setProfile(res.data.data);
                  this.$router.push({ name: 'Your Gate' })
                }
              })
              .catch(e => {
                console.log(e);
                alertify.notify("พบข้อผิดพลาด :(", "error", 3);
                this.loading = false;
              });
            } else {
              alertify.notify("พบข้อผิดพลาด :(", "error", 3);
                this.loading = false;
            }
          })
          
        } else {
          this.loading = false
          alertify.notify("ATLEAST 3 CHARACTERS", "warning", 3);
          return;
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
/* .border {
  border-radius: 100%;
  @apply border-4 border-solid border-yellow-500;
} */

.grid-container {
  @apply grid grid-cols-3 gap-10 text-gray-700 content-center;
}
</style>