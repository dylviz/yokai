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
  useColorMode,
  useColorModeValue,
  Stack,
  Img,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ArrowRightIcon,
  MoonIcon,
} from "@chakra-ui/icons";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { BsTwitter } from "react-icons/bs";

const Links = ["Wold", "Gallery", "More"];

const MotionBox = motion(Box);

const NavLink = ({ children }: { children: ReactNode }) => (
  <Button
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    variant={"ghost"}
    color={"whiteAlpha.800"}
    _hover={{
      textDecoration: "underline",
    }}
    href={"#"}
  >
    {children}
  </Button>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box mt={"5"} position="fixed" w="full" zIndex={999}>
        <Flex h={16} alignItems={"center"}>
          <HStack
            bg={"yokai.primary"}
            h="full"
            p={4}
            pl={6}
            zIndex={1}
            roundedBottomRight={isOpen ? "none" : "md"}
            roundedTopRight={isOpen ? "none" : "md"}
          >
            <Img src="/assets/BANNERS_LOGO/Yokaidesign.png" w="105px" />
            <IconButton
              variant={"unstyled"}
              color={"whiteAlpha.900"}
              icon={isOpen ? <CloseIcon /> : <ArrowRightIcon />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
          <AnimatePresence>
            {isOpen ? (
              <MotionBox
                bg={"yokai.primary"}
                h={"full"}
                p={4}
                roundedBottomRight={"md"}
                roundedTopRight={"md"}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%", transition: { duration: 0.1 } }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <HStack as={"nav"} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}

                  <IconButton
                    variant={"ghost"}
                    aria-label="Toggle Dark Mode"
                    icon={<MoonIcon />}
                    onClick={toggleColorMode}
                  />
                </HStack>
              </MotionBox>
            ) : null}
          </AnimatePresence>
        </Flex>
      </Box>

      <Flex w="full" position={"fixed"} mt={20} zIndex={999}>
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
