import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import Navbar from "./Navbar.vue";
import {createPinia, setActivePinia} from "pinia";
import {createMemoryHistory, createRouter} from "vue-router";
import {routes} from "../router.ts";
import {useUsers} from "../stores/users.ts";

describe("Navbar", () => {
    it("renders when user not authenticated", () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        const pinia = createPinia();
        const router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.find('#sign-up').exists()).toBe(true);
        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
    });

    it.only("renders when user authenticated", () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        const pinia = createPinia();
        setActivePinia(pinia);
        const users = useUsers();
        users.currentUserId = "1";
        const router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.find('a').text()).toBe('New Post');
        expect(wrapper.find('button').text()).toBe('Sign Out');
    });
});