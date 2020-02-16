import React from "react";
import PropTypes from "prop-types";

import SpotCard from "./SpotCard";

import { spotPropType } from "../utils/SpotUtils";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box
} from "@chakra-ui/core";

const SpotPreview = ({ selectedSpot, onClose }) => {
  const isDrawerOpen = selectedSpot !== null;

  return (
    <Drawer isOpen={isDrawerOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton role="close-button" />
        <DrawerHeader borderBottomWidth="1px">Previewing a Spot</DrawerHeader>
        <Box p={3}>{isDrawerOpen && <SpotCard spot={selectedSpot} />}</Box>
      </DrawerContent>
    </Drawer>
  );
};

SpotPreview.propTypes = {
  selectedSpot: spotPropType,
  onClose: PropTypes.func.isRequired
};

export default SpotPreview;
