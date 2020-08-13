import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  DrawerFooter,
  Button,
} from "@chakra-ui/core";

import { Widget } from "@uploadcare/react-widget";

const NewSpotForm = React.memo(({ newSpotLocation, onSubmit, onClose }) => {
  const name = React.useRef();
  const description = React.useRef();
  const difficulty = React.useRef();
  const popularity = React.useRef();
  const type = React.useRef();

  //* If this is undefined: it means no image selected
  //* If this is null: it means image is uploading
  const [imageUrl, setImageUrl] = useState(undefined);

  const closeReset = () => {
    setImageUrl(undefined);
    onClose();
  };

  const onClickSubmit = () => {
    onSubmit({
      name: name.current.value,
      description: description.current.value,
      popularity: popularity.current.value,
      difficulty: difficulty.current.value,
      type: type.current.value,
      lat: newSpotLocation.lat,
      lng: newSpotLocation.lng,
      imageUrl,
    });
    closeReset();
  };

  return (
    <Drawer
      isOpen={newSpotLocation !== null}
      placement="bottom"
      onClose={closeReset}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton role="close-button" />

        <DrawerHeader borderBottomWidth="1px">Create a New Spot</DrawerHeader>

        <DrawerBody>
          <Stack spacing={3}>
            <Box>
              <FormLabel htmlFor="name">Name of Spot</FormLabel>
              <Input ref={name} id="name" placeholder="FDR Skatepark" />
            </Box>

            <Box>
              <FormLabel htmlFor="difficulty">Select Difficulty</FormLabel>
              <Select ref={difficulty} id="difficulty" defaultValue="easy">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="xtreme">Xtreme</option>
              </Select>
            </Box>

            <Box>
              <FormLabel htmlFor="popularity">Select Popularity</FormLabel>
              <Select ref={popularity} id="popularity" defaultValue="low">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </Box>

            <Box>
              <FormLabel htmlFor="type">Select Type of Spot</FormLabel>
              <Select ref={type} id="type" defaultValue="rail">
                <option value="rail">Rail</option>
                <option value="ledge">Ledge</option>
                <option value="stair set">Stair Set</option>
                <option value="bump to bar">Bump to Bar</option>
                <option value="bank">Bank</option>
                <option value="kinked rail">Kinked Rail</option>
                <option value="pole jam">Pole Jam</option>
                <option value="gap">Gap</option>
                <option value="bank">Bank</option>
                <option value="manual pad">Manual Pad</option>
                <option value="hubba">Hubba</option>
                <option value="kicker">Kicker</option>
                <option value="street quarter">Street Quarter</option>
                <option value="skatepark">Skatepark</option>
                <option value="wall ride spot">Wall Ride Spot</option>
                <option value="handrail">Handrail</option>
              </Select>
            </Box>

            <Box>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                ref={description}
                placeholder="A great spot to skate with friends."
              />
            </Box>
            <Box>
              <FormLabel htmlFor="image">
                Picture of Spot (If you don't upload an image, we will get one
                for you)
              </FormLabel>
              <Widget
                id="image"
                name="image"
                publicKey={process.env.REACT_APP_UPLOADCARE_KEY}
                onFileSelect={() => setImageUrl(null)}
                onChange={(upload) =>
                  setImageUrl(upload.originalUrl + "-/scale_crop/400x400/")
                }
              />
            </Box>
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          {/*imageUrl == null DOES NOT MEAN "If no image uploaded". IT MEANS "Image is uploading"*/}
          <Button
            onClick={onClickSubmit}
            isLoading={imageUrl === null}
            variantColor="green"
            data-testid="submit-button"
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

NewSpotForm.propTypes = {
  newSpotLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewSpotForm;
