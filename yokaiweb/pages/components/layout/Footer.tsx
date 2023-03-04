import { Flex, Img } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex h="full" border={"1px"} borderColor={"red"}>
      <Flex w="full" bg={"yokai.primary"} justify={"center"}>
        <Img src="/assets/BANNERS_LOGO/Yokaidesign.png" w="60px" />
      </Flex>
    </Flex>
  );
}
