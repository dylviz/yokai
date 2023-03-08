import { extendTheme, StyleFunctionProps } from "@chakra-ui/react"
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
    
    styles: {
        global: (props: StyleFunctionProps) => ({
          body: {
            //backgroundImage: "/assets/BANNERS_LOGO/Yokaidesign.png",
          },
        }),
      }
});