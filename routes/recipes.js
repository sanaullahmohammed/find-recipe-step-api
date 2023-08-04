var recipes = require("../recipes.json");
var router = require("express").Router();

router.get("/step/:id", (req, res) => {
  const recipeId = parseInt(req.params.id);
  const elapsedTime = parseInt(req.query.elapsedTime) || 0;

  // check if the recipe id is a valid number
  if (isNaN(recipeId)) {
    return res.status(400).send("NOT_FOUND");
  }

  // find the recipe with the given id
  const recipe = recipes.find((r) => r.id === recipeId);

  // check if the recipe exists
  if (!recipe) {
    return res.status(400).send("NOT_FOUND");
  }

  let totalTime = 0;
  let currentIndex = 0;

  // calculate the total time elapsed and the current step index
  for (let i = 0; i < recipe.timers.length; i++) {
    totalTime += recipe.timers[i];
    if (totalTime >= elapsedTime) {
      currentIndex = i;
      break;
    }
  }

  res.send({ index: currentIndex });
});

module.exports = router;
