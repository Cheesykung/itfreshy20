const { path } = require("./functions/api/controller/testController");

module.exports = {
  devServer: {
    host: "localhost",
    hot: true,
    port: 8080,
    https: true,
    proxy: {
      "/auth/*": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
        secure: false,
        ws: false,
      },
      "/create": {
        target: "http://localhost:5001/itfreshy2020/us-central1/profile",
        secure: false,
        ws: false,
      },
      "/fire/*": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
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
