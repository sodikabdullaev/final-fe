/** @format */

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
// import Documents from "../views/Documents.vue";
import DocumentSelectionPage from "../views/DocumentSelectionPage.vue";
import DocumentPage from "../views/DocumentPage.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
		},
		{
			path: "/documents",
			name: "Documents",
			component: DocumentSelectionPage,
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
			props: true,
		},
		{
			path: "/document/:id?",
			name: "DocumentPage",
			component: DocumentPage,
			props: true,
		},
		{
			path: "/document/:newId?",
			name: "newDocumentPage",
			component: DocumentPage,
			props: true,
		},
	],
});
export default router;


// { path: '/', component: DocumentSelectionPage },
//   { path: '/document/:id', name: 'DocumentPage', component: DocumentPage, props: true }