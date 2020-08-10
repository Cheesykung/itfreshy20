module.exports = {
  devServer: {
    host: "localhost",
    hot: true,
    port: 8080,
    proxy: {
      "/auth/*": {
        target: "http://localhost:5000",
        secure: false,
        ws: false,
      },
      "/facebook/*": {
        target: "http://localhost:5000",
        secure: false,
        ws: false,
      },
    },
  },
};
