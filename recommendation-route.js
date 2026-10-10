
const express = require("express");
const router = express.Router();

const recommendations = {
  plastic: {
    action: "Recycle",
    instructions:
      "Empty and rinse the container. Check local recycling rules.",
    destination: "Plastic recycling centre"
  },
  paper: {
    action: "Recycle",
    instructions:
      "Keep paper clean and dry. Separate it from food waste.",
    destination: "Paper recycling centre"
  },
  clothes: {
    action: "Donate or reuse",
    instructions:
      "Wash wearable clothes before donating. Reuse damaged fabric as cleaning cloths.",
    destination: "Clothing donation organisation"
  },
  battery: {
    action: "Dispose safely",
    instructions:
      "Never put batteries in household bins. Use an authorised collection point.",
    destination: "Battery collection centre"
  },
  electronic: {
    action: "Recycle as e-waste",
    instructions:
      "Use an authorised e-waste collection centre.",
    destination: "E-waste recycling centre"
  },
  organic: {
    action: "Compost",
    instructions:
      "Separate suitable food scraps and plant waste for composting.",
    destination: "Composting facility"
  }
};

router.post("/", (req, res) => {
  const category = String(req.body.category || "")
    .toLowerCase()
    .trim();

  const recommendation = recommendations[category];

  if (!recommendation) {
    return res.status(400).json({
      error: "Unsupported category",
      supportedCategories: Object.keys(recommendations)
    });
  }

  res.json({
    category,
    ...recommendation
  });
});

module.exports = router;
