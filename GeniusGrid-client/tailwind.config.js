// import withMT from "@material-tailwind/react/utils/withMT";

// const config = withMT({
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode:["class"],
//   theme: {
//     extend: {
//       fontFamily:{
//         Poppins: ["var(--font-Poppins)"],
//         Josefin: ["var(--font-Josefin)"],
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       screens:{
//         "1000px": "1000px",
//         "1100px": "1100px",
//         "1200px": "1200px",
//         "1300px": "1300px",
//         "1500px": "1500px",
//         "800px": "800px",
//         "400px": "400px"
//       }
//     },
//   },
//   plugins: [],
// });


// export default config;


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ["Poppins"],
        roboto: ["Roboto"],
        Dancing: ["Dancing"]
      }
    },
    
  },
  plugins: [],
}