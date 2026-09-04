// GET /api/userProfile - profile built from the verified app JWT claims.
function getUserProfile(req, res) {
  const user = req.user || {};

  res.status(200).json({
    userId: user.sub || null,
    name: user.name || null,
    email: user.email || null,
    tenantId: user.tenantId || null,
    selectedCityCode: user.selectedCityCode || null,
  });
}

module.exports = { getUserProfile };
