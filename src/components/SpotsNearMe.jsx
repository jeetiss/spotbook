import React from "react";
import PropTypes from "prop-types";

import SpotCard from "./SpotCard";

import { spotPropType } from "../utils/SpotUtils";

import sortByDistance from "sort-by-distance";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box,
  Alert,
  AlertIcon
} from "@chakra-ui/core";

const SpotsNearMe = React.memo(
  ({ isOpen, currentLocation, onClose, spotList }) => {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton role="close-button" />
          <DrawerHeader borderBottomWidth="1px">Spots Near You</DrawerHeader>
          <Box p={3} overflowY="scroll" maxHeight="100vh">
            {currentLocation.lat === 0 && currentLocation.lng === 0 && (
              <Alert status="warning">
                <AlertIcon />
                Click the button in the top left to enable Geolocation first!
              </Alert>
            )}

            {sortByDistance(currentLocation, spotList, {
              yName: "lat",
              xName: "lng"
            }).map(spot => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </Box>
        </DrawerContent>
      </Drawer>
    );
  }
);

SpotsNearMe.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  spotList: PropTypes.arrayOf(spotPropType).isRequired
};

export default SpotsNearMe;
