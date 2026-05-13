import {createWebHistory, createRouter} from "vue-router";
import {Explanation, Experiment, Result, Home, ExplanationPreattentive, ExperimentPreattentive, CarDataVis, ApexChartsDataVis} from "../views";

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
        path: "/visualization/car-efficiency/custom",
        name: 'Visualization Custom',
        component: CarDataVis
    },
    {
        path: "/visualization/car-efficiency/apexcharts",
        name: 'Visualization ApexCharts',
        component: ApexChartsDataVis
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