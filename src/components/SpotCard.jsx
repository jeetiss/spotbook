import React from "react";

import {
  difficultyToColor,
  popularityToColor,
  spotPropType
} from "../utils/SpotUtils";

import { Box, Image, Badge } from "@chakra-ui/core";

const SpotCard = ({ spot }) => {
  const difficultyColor = difficultyToColor(spot?.difficulty);
  const popularityColor = popularityToColor(spot?.popularity);

  return (
    <Box mt={3} borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={spot?.imageUrl} />
      <Box p={3}>
        <Box fontWeight="semibold" fontSize="lg" as="h4" lineHeight="tight">
          {spot?.name}
        </Box>

        <Box color="gray.600" fontSize="sm">
          {spot?.description}
        </Box>

        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          color="gray.600"
          textTransform="uppercase"
          mt={3}
        >
          <Badge
            align="center"
            rounded="full"
            px="2"
            variantColor={difficultyColor}
          >
            {spot?.difficulty}
          </Badge>{" "}
          &bull;{" "}
          <Box as="span" color={popularityColor} fontSize="xs">
            {spot?.popularity} popularity
          </Box>{" "}
          &bull;{" "}
          <Box as="span" fontSize="xs">
            {spot?.type}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

SpotCard.propTypes = {
  spot: spotPropType.isRequired
};

export default SpotCard;
