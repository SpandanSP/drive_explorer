const fs = require("fs");

module.exports = {
  configure: function (app) {
    //Start of Fetch Drive Details
    app.post('/getDriveDetails', function (req, res) {
      try {
        if (req.body.hasOwnProperty("drivePath")) {
          let drivePath = req.body.drivePath;
          if (fs.existsSync(drivePath)) {
            console.log({ status: true, message: "Drive path exists!" });
            fs.readdir(drivePath, function (err, files) {
              if (err) {
                console.log("Error ---->", err);
                res.json({ status: false, message: "Error getting directory information." });
              } else {
                let driveDetails = [];
                let counter = 0;
                files.forEach(function (file) {
                  if (file !== "System Volume Information" && file !== "$RECYCLE.BIN" && file !== "desktop.ini") {
                    console.log("fetching stats of: ", file);
                    let fileStats = fs.statSync(drivePath + `/${file}`);
                    let isDir = fileStats.isDirectory();
                    driveDetails.push(
                      {
                        "fileName": file,
                        "isDir": isDir,
                        "fileSize": fileStats.size + " bytes",
                        "dateModified": fileStats.mtime
                      }
                    );
                  }
                  counter = counter + 1;
                });
                if (files.length == counter) {
                  res.json({ status: true, message: "Details found..", data: driveDetails });
                }

              }
            });
          }
          else {
            res.json({ status: false, message: "Drive path not found.." });
          }
        }
        else {
          if (req.body.hasOwnProperty("drivePath") == false) {
            res.json({ status: false, message: "drivePath parameter missing" });
          }

        }
      } catch (err) {
        console.log("error occurred: " + err);
        res.json({ status: false, message: err });
      }
    });
    //End of Fetch Drive Details



  }
}