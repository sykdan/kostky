import { addMessages, init } from "svelte-i18n";

import cs from "./cs.json";
import en from "./en.json";
import bs from "./bs.json";

addMessages("cs", cs);
addMessages("en", en);
addMessages("bs", bs);

init({
    fallbackLocale: "en",
    initialLocale: localStorage.getItem("st__locale") ?? "cs"
});