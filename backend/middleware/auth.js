// Simple shared-secret guard for admin-only routes.
// The admin page sends the password in the "x-admin-password" header;
// we compare it to ADMIN_PASSWORD from the environment.
//
// Note: this is intentionally lightweight for a small clinic site. For a
// larger deployment, swap this for proper user accounts + JWT sessions.
module.exports = function requireAdmin(req, res, next) {
  const provided = req.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || "";

  if (!expected) {
    return res
      .status(500)
      .json({ error: "Admin password is not configured on the server." });
  }
  if (provided !== expected) {
    return res.status(401).json({ error: "Wrong password." });
  }
  next();
};
