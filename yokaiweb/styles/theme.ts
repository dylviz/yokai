import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools";

export const myTheme = extendTheme({
    colors:{
        yokai: {
            primary : "#CB0000",
        },
    },
    config:{
        initialColorMode: 'light',
        useSystemColorMode: 'false',
    },
});