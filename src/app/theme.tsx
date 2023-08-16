// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from "@chakra-ui/react";
import { checkboxTheme } from "./checkboxTheme";
const theme = extendTheme({
	colors: {
		black: {
			100: "#696969",
			200: "#5c5c5c",
			300: "#545454",
			400: "#4c4c4c",
			500: "#414141",
			600: "#3b3b3b",
			700: "#303030",
			800: "#262626",
			900: "#1f1f1f",
		},
		orangeAlpha: {
			100: "RGBA(223,96,19,0.1)",
			200: "RGBA(223,96,19,0.2)",
			300: "RGBA(223,96,19,0.3)",
			400: "RGBA(223,96,19,0.4)",
			500: "RGBA(223,96,19,0.5)",
			600: "RGBA(223,96,19,0.6)",
			700: "RGBA(223,96,19,0.7)",
			800: "RGBA(223,96,19,0.8)",
			900: "RGBA(223,96,19,1)",
		},
		blueAlpha: {
			100: "RGBA(49,130,206,0.1)",
			200: "RGBA(49,130,206,0.2)",
			300: "RGBA(49,130,206,0.3)",
			400: "RGBA(49,130,206,0.4)",
			500: "RGBA(49,130,206,0.5)",
			600: "RGBA(49,130,206,0.6)",
			700: "RGBA(49,130,206,0.7)",
			800: "RGBA(49,130,206,0.8)",
			900: "RGBA(49,130,206,1)",
		},
		tealAlpha: {
			100: "RGBA(49,151,149,0.1)",
			200: "RGBA(49,151,149,0.2)",
			300: "RGBA(49,151,149,0.3)",
			400: "RGBA(49,151,149,0.4)",
			500: "RGBA(49,151,149,0.5)",
			600: "RGBA(49,151,149,0.6)",
			700: "RGBA(49,151,149,0.7)",
			800: "RGBA(49,151,149,0.8)",
			900: "RGBA(49,151,149,1)",
		},
	},
	components: {
		Button: {
			// 1. We can update the base styles
			baseStyle: {
				fontWeight: "Normally", // Normally, it is "semibold"
			},
		},
		Checkbox: checkboxTheme,
	},
});

export default theme;
