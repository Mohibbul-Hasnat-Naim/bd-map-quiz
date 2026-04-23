export function getWorldMap() {
    return {
        id: "world",
        name: "World Countries",

        /*
         IMPORTANT:
         For SimpleMaps SVG format:
         - Some countries use id + name
         - Some countries use class only
         - Some countries are split into multiple <path>
         - circles must be ignored

         We keep raw SVG here.
         quizEngine will normalize it automatically.
        */

        items: [
            "afghanistan",
            "albania",
            "algeria",
            "angola",
            "argentina",
            "australia",
            "bangladesh",
            "bulgaria"
            // extend gradually or auto-generate later
        ],

        svgPath: "../maps/world.svg"
    };
}