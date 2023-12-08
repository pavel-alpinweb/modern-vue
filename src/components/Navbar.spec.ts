import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import Navbar from "./Navbar.vue";
import {createPinia} from "pinia";
import {createMemoryHistory, createRouter} from "vue-router";
import {routes} from "../router.ts";

describe("Navbar", () => {
    it("renders", () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        const pinia = createPinia();
        const router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
        mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });
    });
});