<template>
  <section
    class="edit flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 main-wrap px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24"
  >
    <!--- Form area --->
    <div class="flex flex-col justify-center items-center sub-col">test</div>
    <formContain class="sub-col">
      <template #subHeader></template>
      <template #content>
        <div class="flex flex-col flex-wrap space-y-8">
          <span class="space-y-3 flex flex-col">
            <label for="fname" class="text-left text-primary-200 text-opacity-100">Your First Name</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="fname"
              v-model="dataState.fname"
              placeholder="ชื่อจริงของคุณ"
              required
              autofocus
              id="fname"
            />
          </span>
          <span class="space-y-3 flex flex-col">
            <label for="surname" class="text-left text-primary-200 text-opacity-100">Your Surname</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="surname"
              v-model="dataState.surname"
              placeholder="นามสกุลของคุณ"
              required
              id="surname"
            />
          </span>
          <span class="space-y-3 flex flex-col">
            <label for="nickname" class="text-left text-primary-200 text-opacity-100">Your Nickname</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="nickname"
              v-model="dataState.nickname"
              placeholder="ชื่อเล่นของคุณ"
              required
              id="nickname"
            />
          </span>
          <span class="space-y-3 flex flex-col">
            <label for="age" class="text-left text-primary-200 text-opacity-100">Your Age</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="age"
              v-model="dataState.age"
              placeholder="อายุของคุณ"
              required
              id="age"
            />
          </span>
          <span class="space-y-3 flex flex-col">
            <label for="religion" class="text-left text-primary-200 text-opacity-100">Your Religion</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="religion"
              v-model="dataState.religion"
              placeholder="ศาสนาของคุณ"
              required
              id="religion"
            />
          </span>
          <span class="space-y-3 flex flex-col">
            <label for="contact" class="text-left text-primary-200 text-opacity-100">Your Contact</label>
            <input
              type="text"
              class="base-input rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="contact"
              v-model="dataState.contact"
              placeholder="ข่องทางการติดต่อ"
              required
              id="contact"
            />
          </span>
        </div>
        <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
          <button
            type="submit"
            class="btn hover:bg-opacity-75 text-primary-100 bg-primary px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
            @click="submit()"
          >Save</button>
        </div>
      </template>
    </formContain>
  </section>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("user");

export default {
  components: {
    // pageHFull: () => import("../components/util/pageHFull"),
    formContain: () => import("../components/util/formContainer")
  },
  data() {
    return {
      dataState: {
        fname: null,
        surname: null,
        nickname: null,
        age: null,
        religion: null,
        contact: null
      }
    };
  },
  computed: {

  }
};
</script>
<style scoped>
.edit {
  @apply flex justify-around content-center py-24;
}

.sub-col {
  flex: 1 1 25%;
}
</style>