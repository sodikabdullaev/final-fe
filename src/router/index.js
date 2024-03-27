/** @format */

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Documents from "../views/Documents.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
		},
		{
			path: "/edit",
			name: "Edit",
			component: () => import("../views/Edit.vue"),
		},
		{
			path: "/documents",
			name: "Documents",
			component: () => import("../views/Documents.vue"),
		},
		{
			path: "/user",
			name: "user",
			children: [
				{ path: "login", component: Login },
				{ path: "register", component: Register },
			],
		},
		{
			path: "/document",
			name: "document",
			component: () => import("../views/DocumentPage.vue"),
		},
		{
			path: "/document/:id",
			name: "documentById",
			component: () => import("../views/DocumentPage.vue"),
			props: true,
		},
	],
});
export default router;
