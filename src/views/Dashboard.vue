<template>
  <div
    class="flex flex-col w-screen space-x-4 space-y-6 h-screen text-gray-300 justify-center items-center"
  >
    <iframe :src="apiRender + '/dashboard/test'" />
  </div>
</template>

<script>
import API from "../middleware/api/userApi";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      leaderList: null,
      apiRender: API
    };
  },
  mounted() {
  
  },
  methods: {
    ...mapActions("user", ["getToken"]),
    getDashboard() {
      this.getToken().then(async res => {
        try {
          const connections = await axios.get(
            API + "dashboard/test",
            {
              headers: {
                FIREBASE_AUTH_TOKEN: res
              }
            }
          );
          let data = connections.data;
          this.leaderList = data;
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed: {
    ...mapGetters("user", ["getYear"])
  }
};
</script>
