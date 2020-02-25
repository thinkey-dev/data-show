import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/', redirect: '/home'
    },
    {
        path: "/home",
        component: Home,
        name: "home",
        hidden: true,
        children: [
            {
                path: "/home",
                component: () => import("../views/Home")
            },
        ]
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import( /* webpackChunkName: "login" */ "@/views/login")
    // },
];

export const asyncRoutes = [];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({y: 0}),
        routes: constantRoutes
    });

const router = createRouter();
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
