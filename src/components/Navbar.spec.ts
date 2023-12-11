import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import Navbar from "./Navbar.vue";
import {createPinia, setActivePinia} from "pinia";
import {createMemoryHistory, createRouter} from "vue-router";
import {routes} from "../router.ts";
import {useUsers} from "../stores/users.ts";

vi.stubGlobal('fetch', vi.fn(() => {

}));

describe("Navbar", () => {
    let pinia: Pinia;
    let router: Router;

    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        pinia = createPinia();
        setActivePinia(pinia);
        router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
    });

    it("renders when user not authenticated", () => {
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });
        expect(wrapper.find('#sign-up').exists()).toBe(true);
        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
    });

    it("renders when user authenticated", () => {
        const users = useUsers();
        users.currentUserId = "1";
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });

        expect(wrapper.find('a').text()).toBe('New Post');
        expect(wrapper.find('button').text()).toBe('Sign Out');
    });

    it("renders new post anf logout when authenticated", async () => {
        const users = useUsers();
        users.currentUserId = "1";
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router],
            },
        });

        await wrapper.find('#logout').trigger('click');
        expect(wrapper.find('#sign-up').exists()).toBe(true);
        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);

        await wrapper.find('[data-testid="sign-in"]').trigger('click');

        expect(document.body.querySelector("#signin-form")).toBeTruthy();
    });
});