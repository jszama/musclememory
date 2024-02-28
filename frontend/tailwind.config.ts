import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-900': "#5912A1",
        'primary-800': "#7016CA",
        'primary-700': "#6E30E8",
        'primary-600': "#7047EB",
        'primary-500': "#7B68EE",
        'primary-400': "#9C8CF2",
        'primary-300': "#B7ACF6",
        'primary-200': "#C7BFF8",
        'primary-100': "#D4CCFF",
  
        'gray-900': "#404040",
        'gray-800': "#595959",
        'gray-700': "#737373",
        'gray-600': "#8C8C8C",
        'gray-500': "#9E9E9E",
        'gray-400': "#B8B8B8",
        'gray-300': "#D1D1D1",
        'gray-200': "#EBEBEB",
        'gray-100': "#F5F5F5",
  
        'green-500': "#136C16",
        'green-400': "#367C39",
        'green-300': "#4CAF50",
        'green-200': "#71C174",
        'green-100': "#A3F5A6",
  
        'red-500': "#800000",
        'red-400': "#C20000",
        'red-300': "#FF0000",
        'red-200': "#FF6666",
        'red-100': "#FFB3B3",
      },  
    },
    },
  plugins: [],
};
export default config;
