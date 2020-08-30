const { path } = require("./functions/api/controller/testController");

module.exports = {
  devServer: {
    proxy: {
      "/auth/*": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
      "/facebook/*": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
      "/api/*": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
      "/logout": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },"/checka": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },"/genqrcode": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
      "/ryutools/*": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
      "/qrcode/*": {
        target: "https://us-central1-itfreshy2020.cloudfunctions.net/test",
        secure: false,
        ws: false,
      },
    },
  },
};
