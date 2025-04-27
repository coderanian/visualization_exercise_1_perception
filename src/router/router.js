import {createWebHistory, createRouter} from "vue-router";
import {Explanation, Experiment, Result} from "../views";

const routes = [
    {
        path: "/",
        name: 'Experiment Explanation',
        component: Explanation
    },
    {
        path: "/experiment",
        name: 'Experiment',
        component: Experiment
    },
    {
        path: "/result",
        name: 'Your result',
        component: Result
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;