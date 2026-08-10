/**
 * Attach request metadata used for token audit trails.
 */
export const attachRequestMeta = (req, _res, next) => {
  req.requestMeta = {
    userAgent: req.get("user-agent") || null,
    ipAddress: req.ip || req.socket?.remoteAddress || null,
  };
  next();
};

export default attachRequestMeta;
