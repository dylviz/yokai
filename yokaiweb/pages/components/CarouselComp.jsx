import { Flex, Image, Text, Button, HStack } from "@chakra-ui/react";
import {
  Carousel,
  CarouselItem,
  useCarouselItem,
  CarouselItems,
  useCarousel,
} from "chakra-framer-carousel";

const images = [
  "/assets/NFTS/iamthenomad_A_close-up_portrait_of_an_anime_cyberpunk_ninja_wea_96b0e33f-4968-4537-9be7-22c1ed625404.png",
  "/assets/NFTS/iamthenomad_A_close-up_portrait_of_an_anime_cyberpunk_ninja_wea_96b0e33f-4968-4537-9be7-22c1ed625404.png",
  "/assets/NFTS/iamthenomad_A_close-up_portrait_of_an_anime_cyberpunk_ninja_wea_96b0e33f-4968-4537-9be7-22c1ed625404.png",
  "/assets/NFTS/iamthenomad_A_close-up_portrait_of_an_anime_cyberpunk_ninja_wea_96b0e33f-4968-4537-9be7-22c1ed625404.png",
  
];

function CarouselDemo() {
  return (
    <Carousel>
      <CarouselItems>
        {images.map((image, index) => {
          return (
            <CarouselItem index={index} key={image}>
              <Card index={index} image={image} />
            </CarouselItem>
          );
        })}
      </CarouselItems>
      <Toolbar />
    </Carousel>
  );
}

function Toolbar() {
  const { onNext, onPrevious } = useCarousel();
  return (
    <Flex w="full" justify="center">
      <HStack>
        <Button w="115px" onClick={onPrevious}>
          Previous
        </Button>
        <Button w="115px" onClick={onNext}>
          Next
        </Button>
      </HStack>
    </Flex>
  );
}

function Card({ image, index }) {
  const { numberOfSlides, onClickHandler, position } = useCarouselItem();
  const isCenter = position === "center";
  return (
    <Flex
      boxSize={isCenter ? "400px" : "300px"}
      pos="relative"
      boxShadow="lg"
      as="button"
      onClick={onClickHandler}
    >
      <Flex
        borderRadius="full"
        bg="whiteAlpha.400"
        p={2}
        left={2}
        top={2}
        position="absolute"
      >
        <Text>{`${index + 1}/${numberOfSlides}`}</Text>
      </Flex>

      <Image
        src={image}
        boxSize={isCenter ? "400px" : "300px"}
        alt={"nfts"}
        objectFit="cover"
        objectPosition="center center"
        borderRadius={10}
        _hover={{
          scale: 1.1,
        }}
      />
    </Flex>
  );
}

export default function CarouselComp() {
  return (
    <Flex
      height="100%"
      width="100%"
      minHeight="100vh"
      justify="flex-start"
      align="flex-start"
      flexDir="column"
      p={10}
      bg="rgb(26,31,42)"
    >
      <Flex bg="rgb(26,31,42)" w="fit-content" gap="10" flexDir="column">
        <CarouselDemo />
      </Flex>
    </Flex>
  );
}
