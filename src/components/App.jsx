/* istanbul ignore file */

import React, { useCallback, useState } from "react";

import Map from "./Map";
import SpotsNearMe from "./SpotsNearMe";
import SpotPreview from "./SpotPreview";
import NewSpotForm from "./NewSpotForm";

import { getSpots, createSpot } from "../api/SpotsAPI";

import useSWR from "swr";

import { Button, useToast } from "@chakra-ui/core";

export default function App() {
  const toast = useToast();

  /*
   * SpotsNearMe State *
   */

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0
  });

  const [isSpotsNearMeOpen, openSpotsNearMe] = useState(false);

  const closeSpotsNearMe = useCallback(() => openSpotsNearMe(false), []);

  /*
   * SpotPreview State *
   */

  const [selectedSpot, openSpotPreview] = useState(null);

  const closeSpotPreview = useCallback(() => openSpotPreview(null), []);

  /*
   * SpotList State *
   */

  const { data: spotList = [], revalidate } = useSWR(
    "/groups/master",
    getSpots
  );

  const addSpotToList = useCallback(
    newSpot => {
      if (!newSpot.imageUrl) {
        createSpot({
          ...newSpot,
          imageUrl: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${newSpot.lat},${newSpot.lng}3&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_STATIC_KEY}`
        }).then(revalidate);
      } else {
        createSpot(newSpot).then(revalidate);
      }

      toast({
        title: "New Spot Added!",
        description: "Thanks for your contribution.",
        status: "success",
        duration: 2000
      });
    },
    [toast, revalidate]
  );

  /*
   * NewSpotForm State *
   */

  const [newSpotLocation, openNewSpotForm] = useState(null);

  const closeNewSpotForm = useCallback(() => openNewSpotForm(null), []);

  return (
    <>
      <Button
        onClick={() => openSpotsNearMe(true)}
        zIndex="1"
        variantColor="green"
        pos="absolute"
        top="10px"
        h="29px"
        left="50px"
      >
        Find Spots Near You
      </Button>

      <Map
        onGeolocate={setCurrentLocation}
        onRequestAddSpot={openNewSpotForm}
        onSpotInfoRequested={openSpotPreview}
        spotList={spotList}
      />
      <SpotPreview selectedSpot={selectedSpot} onClose={closeSpotPreview} />
      <SpotsNearMe
        isOpen={isSpotsNearMeOpen}
        currentLocation={currentLocation}
        onClose={closeSpotsNearMe}
        spotList={spotList}
      />
      <NewSpotForm
        newSpotLocation={newSpotLocation}
        onSubmit={addSpotToList}
        onClose={closeNewSpotForm}
      />
    </>
  );
}
