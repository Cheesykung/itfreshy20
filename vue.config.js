module.exports = {
  devServer: {
    host: "localhost",
    hot: true,
    port: 8080,
    proxy: {
      "/auth/*": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
        secure: false,
        ws: false,
      },
      "/facebook/*": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
        secure: false,
        ws: false,
      },
      "/api/*": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
        secure: false,
        ws: false,
      },
      "/logout": {
        target: "http://localhost:5001/itfreshy2020/us-central1/test",
        secure: false,
        ws: false,
      }
    },
  },
};
