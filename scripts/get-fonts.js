import { constructURL, download } from "google-fonts-helper";

download(constructURL({
    families: {
        Jost: {
            wght: [700, 500],
            ital: [700, 500],
        },
    },
}), {
    base64: false,
    overwriting: true,
    outputDir: './src/style/font',
    stylePath: './jost.css',
    fontsDir: '.',
    fontsPath: '.'
}).execute();