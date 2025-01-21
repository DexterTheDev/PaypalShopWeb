tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#F5F5F5",
                    200: "#848486",
                    300: "#5A5A5B",
                    400: "#5D5D5E",
                    500: "#8888A0",
                    600: "#6E6E79",
                    700: "#6E6E6E"
                },
                blurple: {
                    100: "#6A6A6B",
                    200: "#828292",
                    300: "#D9DAE0",
                    700: "#404EED",
                    900: '#5865F2',
                    1000: "#E80202"
                },
            }
        },
        fontFamily: {
            body: ["Nunito"]
        }
    }
}

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});