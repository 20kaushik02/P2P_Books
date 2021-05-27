const db = require("../DB_files");

const deleteExpiredRequests = async (req, res, next) => {
  await db.query("BEGIN");
  try {
      console.log("cleaning requests...");
      await db.query("CALL RequestCleanProc()");
      await db.query("COMMIT");
      next();
  } catch (error) {
    console.error(error);
    await db.query("ROLLBACK");
  }
};

module.exports = deleteExpiredRequests;