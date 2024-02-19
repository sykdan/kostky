import { addMessages, init } from "svelte-i18n";

import cs from "./cs.json";
import en from "./en.json";

addMessages("cs", cs);
addMessages("en", en);

init({
    fallbackLocale: "cs",
    initialLocale: localStorage.getItem("st__locale") ?? "cs"
});