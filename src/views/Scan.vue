<template>
  <section
    class="flex flex-col main-wrap min-h-screen py-12 max-w-full justify-start items-center content-center px-4"
  >
    <div
      class="container bg-primary-1100 bg-opacity-75 py-16 sm:py-20 px-8 max-w-xl rounded-lg text-primary-200"
    >
      <div v-if="dataRecieved !== null">
        <div
          class="flex flex-col space-y-8 justify-center items-center content-center text-center"
          v-if="dataRecieved.name"
          v-lazy-container="{ selector: 'img' }"
        >
          <img
            :data-src="dataRecieved.pic + '?width=500'"
            class="object-cover w-32 sm:w-40 rounded-full"
            :alt="dataRecieved.name"
          />
          <span class="flex flex-col space-y-1 text-center">
            <h1 class="text-3xl text-primary-100">{{ dataRecieved.name }}</h1>
            <span class="font-semibold text-primary-250">Year {{ dataRecieved.year }}</span>
          </span>
          <span class="flex flex-col space-y-6 items-center justify-center" v-if="getYear === '1'">
            <h3 class="flex relative items-center text-2xl sm:text-3xl text-secondary_b">
              How About..
              <span class="lines"></span>
            </h3>
            <ul class="px-1">
              <li v-for="(item, i) in dataRecieved.like" :key="i" class="mb-8 flex-col space-y-4">
                <h4
                  class="text-capitalize sm:text-lg lg:text-xl font-normal text-primary-200"
                >{{ item }}</h4>
                <ul class="flex flex-row justify-center space-x-4 text-primary-275">
                  <li
                    v-for="(icon, index) in icons"
                    :key="index"
                    class="text-3xl sm:text-4xl cursor-pointer"
                    :class="ansActive[i-1].id == i-1 && ansActive[i-1].state == index-2 ? 'text-secondary_b' : ''"
                    @click="getLevel(i, index);"
                  >
                    <i :class="icon.class"></i>
                  </li>
                </ul>
              </li>
            </ul>
            <span>
              <button
                class="block px-8 py-3 text-sm bg-secondary_b text-gray-100 rounded-lg"
                @click="setAns()"
              >Go!</button>
            </span>
          </span>
          <div class="stats" v-if="dataRecieved.point">
            <div class="chased flex flex-col space-y-2 justify-center content-center">
              <span class="text-2xl font-semibold text-primary-200 uppercase">{{ getPoints }}</span>
              <span class="text-sm font-normal text-primary-275">Total Points</span>
            </div>
            <div class="un-chased flex flex-col space-y-2 justify-center content-center">
              <span class="text-2xl font-semibold">++{{ dataRecieved.point }}</span>
              <span class="text-sm font-normal">Added Points</span>
            </div>
          </div>
          <div v-if="getYear !== '1'">
            <button
              class="block mt-6 px-8 py-3 text-sm bg-secondary_b text-green-100 rounded-lg"
              @click="$router.go(-1)"
            >Go Back</button>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center space-y-12" v-else>
          <div class="flex flex-col space-y-4 items-center">
            <ion-icon name="close-circle-outline" class="text-6xl text-complementary-treda"></ion-icon>
            <span class="uppercase text-lg">{{ dataRecieved.message }}</span>
          </div>
          <span>
            <button
              class="block px-8 py-3 text-sm bg-complementary-treda text-gray-100 rounded-lg"
              @click="$router.go(-1)"
            >Go Back</button>
          </span>
        </div>
      </div>
      <div v-else>
        <gridLoader />
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import alertify from "alertifyjs";

export default {
  components: {
    gridLoader: () => import("../components/util/gridLoader")
  },
  data() {
    return {
      dataRecieved: null,
      icons: [
        { class: "far fa-frown", name: "never" },
        { class: "far fa-grin-beam-sweat", name: "some" },
        { class: "far fa-meh-blank", name: "normal" },
        { class: "far fa-grin-wink", name: "like" },
        { class: "far fa-grin-hearts", name: "love" }
      ],
      ansActive: [
        { id: 0, state: null },
        { id: 1, state: null },
        { id: 2, state: null },
        { id: 3, state: null },
        { id: 4, state: null }
      ],
      answer: []
    };
  },
  mounted() {
    this.setQr(this.$route.path.replace("/scan/", "")).then(res => {
      this.dataRecieved = res;
    });
  },
  methods: {
    ...mapActions("user", ["setQr", "setAnswer"]),
    getLevel(i, index) {
      this.ansActive[i - 1].id = i - 1;
      this.ansActive[i - 1].state = index - 2;
    },
    async setAns() {
      const isNull = item => item.state !== null;
      const ans = this.ansActive;
      if (ans.every(isNull)) {
        this.answer = {
          first: this.ansActive[0].state,
          second: this.ansActive[1].state,
          third: this.ansActive[2].state,
          fourth: this.ansActive[3].state,
          fifth: this.ansActive[4].state
        };

        await this.setAnswer(this.answer).then(res => console.log(res));
      } else {
        alertify.notify("PLEASE FILL UP THE FORM");
      }
    }
  },
  computed: {
    ...mapGetters("user", ["getPoints", "getYear"])
  }
};
</script>
<style scoped>
.stats {
  @apply flex flex-row justify-center content-center text-center flex-wrap;
  flex: 1 0 100%;
  width: 100%;
}
.stats .un-chased,
.stats .chased {
  flex: 1 1 25%;
  @apply px-1;
}

.stats .un-chased {
  @apply text-secondary_b;
}

.stats .chased {
  border-right: solid 1px;
  @apply border-primary-800;
}

span.lines {
  content: "";
  flex: 1 1 auto;
  border-top: 1px solid;
  @apply border-primary-850;
}
</style>