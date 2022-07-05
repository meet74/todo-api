const express = require("express");
const Racquet = require("../database/schema/racquetSchema");
const { randomUUID } = require("crypto");
const router = express.Router();

router.get("/getRacquets", (req, res) => {
  Racquet.find().then(async (doc) => {
    console.log(doc);
    if (doc.length > 0) {
      res.status(200).json({
        message: "Success",
        racquet: doc,
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  });
});

router.post("/addracquet", async (req, res) => {
  console.log("body", req.body);
  try {
    const racquetData = req.body;
    const racquetId = randomUUID();
    const racquet = new Racquet({
      racquetType: racquetData.racquetType,
      racquetBrand: racquetData.racquetBrand,
      dateOfLastRestring: racquetData.dateOfLastRestring,
      gamesPerWeek: racquetData.gamesPerWeek,
      racquetId: racquetId,
    });
    console.log(racquet);
    await racquet.save();

    res.status(200).json({
      message: "Success",
      racquet: racquet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.put("/updateRacquet", (req, res) => {
  try {
    const racquetData = req.body;
    console.log('res',req.body);
    Racquet.findByIdAndUpdate({_id:racquetData.id},racquetData)
      .then((racquet) => {
         console.log('data',racquet);
        res.status(200).json({
          message: "Success",
          racquet: racquet,
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Not found",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.delete("/deleteracquet", (req, res) => {
  try {
    const racquetData = req.query;
    console.log('id',req.query);
    Racquet.findOneAndRemove({ racquetId: racquetData.racquetid })
      .then((racquet) => {
        console.log(racquet);
        res.status(200).json({
          message: "Deleted successfully",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Not found",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
