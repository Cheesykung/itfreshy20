function isAdmin(req, res, next) {
    try {
      if (req.isAuthenticated() && (req.user.role == "king")) {
        log.info("king " + req.user.name + " use");
        return next();
      } else {
        if (req.user.name != null || req.user.name != undefined) {
          log.info(req.user.name + " request admin tool");
        }
        res.render("404");
        return;
      }
    } catch (err) {
      res.status(500).send({
        statusCode: "500",
        statusText: "Internal Server Error",
        error: true,
        message: "Internal Server Error",
      });
    }
  }