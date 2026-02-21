/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: "#4b1d3f",
                    pink: "#e91e63",
                    lavender: "#f3e8ff",
                    indigo: "#4338ca",
                }
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
