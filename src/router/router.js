import {createWebHistory, createRouter} from "vue-router";
import {Explanation, Experiment, Result, Home, ExplanationPreattentive, ExperimentPreattentive} from "../views";

const routes = [
    {
        path: "/",
        name: 'Experiments Overview',
        component: Home
    },
    {
        path: "/sizes/explanation",
        name: 'Size Perception: Explanation',
        component: Explanation
    },
    {
        path: "/sizes/experiment",
        name: 'Size Perception: Experiment',
        component: Experiment
    },
    {
        path: "/preattentive/explanation",
        name: 'Pre-attentive Processing: Explanation',
        component: ExplanationPreattentive
    },
    {
        path: "/preattentive/experiment",
        name: 'Pre-attentive Processing: Experiment',
        component: ExperimentPreattentive
    },
    {
        path: "/result",
        name: 'Experiment Results Analysis',
        component: Result
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;