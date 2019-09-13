import Router from "./util/Router";
import common from "./scripts/common";

const routes = new Router({
	common,
});

document.addEventListener("DOMContentLoaded", () => routes.loadEvents());
