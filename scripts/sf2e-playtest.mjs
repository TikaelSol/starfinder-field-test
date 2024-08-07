import { initializeActions } from "./actions/index.mjs";

Hooks.once("init", () => {
    initializeActions();
});
