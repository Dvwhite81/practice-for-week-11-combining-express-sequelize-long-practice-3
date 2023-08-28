const paginator = (req, res, next) => {
  const size =
    req.query.size && !isNaN(req.query.size) ? parseInt(req.query.size) : 10;
  const page =
    req.query.page && !isNaN(req.query.page) ? parseInt(req.query.page) : 1;

  if (size === 0 && page === 0) {
    req.query.limit = null;
    req.query.offset = 0;
  } else if (1 <= size <= 200 && page >= 1) {
    req.query.limit = size;
    req.query.offset = size * (page - 1);
  } else {
    next({ message: "Requires valid page and size params" });
  }

  next();
};
