import PropTypes from "prop-types";

export const difficultyToColor = difficulty => {
  let difficultyColor;

  switch (difficulty) {
    case "easy":
      difficultyColor = "green";
      break;
    case "medium":
      difficultyColor = "teal";
      break;
    case "hard":
      difficultyColor = "orange";
      break;
    case "xtreme":
      difficultyColor = "red";
      break;
    default:
      difficultyColor = "gray";
  }

  return difficultyColor;
};

export const popularityToColor = popularity => {
  let popularityColor;

  switch (popularity) {
    case "low":
      popularityColor = "green.400";
      break;
    case "medium":
      popularityColor = "orange.400";
      break;
    case "high":
      popularityColor = "red.400";
      break;
    default:
      popularityColor = "gray.300";
  }

  return popularityColor;
};

export const spotPropType = PropTypes.shape({
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  popularity: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
  difficulty: PropTypes.oneOf(["easy", "medium", "hard", "xtreme"]).isRequired,
  type: PropTypes.oneOf([
    "rail",
    "ledge",
    "stair set",
    "hubba",
    "bump to bar",
    "bank",
    "kinked rail",
    "pole jam",
    "gap"
  ]).isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
});
