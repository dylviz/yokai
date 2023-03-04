import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  VStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { BsTwitter } from "react-icons/bs";

const Links = ["Wold", "Gallery", "More", "More"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    as={Button}
    px={2}
    py={1}
    rounded={"md"}
    // colorScheme="whiteAlpha"
    // _hover={{
    //   textDecoration: "none",
    //   bg: useColorModeValue("gray.300", "gray.700"),
    // }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box mt={"5"} position="fixed" w="full">
        <Flex h={16} alignItems={"center"}>
          <HStack
            bg={useColorModeValue("yokai.primary", "gray.900")}
            h="full"
            p={4}
            pl={6}
            roundedBottomRight={"md"}
            roundedTopRight={"md"}
          >
            <Img src="/assets/BANNERS_LOGO/Yokaidesign.png" w="105px" />
            <IconButton
              variant={"unstyled"}
              color={"whiteAlpha.900"}
              icon={isOpen ? <CloseIcon /> : <ArrowRightIcon />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />

            {isOpen ? (
              <Box>
                <HStack as={"nav"} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </HStack>
              </Box>
            ) : null}
          </HStack>
        </Flex>
      </Box>

      <Flex w="full" position={"fixed"} mt={20}>
        <Spacer />
        <VStack
          as={"nav"}
          spacing={3}
          display={"flex"}
          roundedBottomLeft={"md"}
          roundedTopLeft={"md"}
          bg={"yokai.primary"}
          p={2}
        >
          {Links.map((link) => (
            <IconButton
              variant={"unstyled"}
              aria-label="Social"
              icon={<BsTwitter />}
              color={"white"}
              key={link}
            />
          ))}
        </VStack>
      </Flex>
    </>
  );
}
