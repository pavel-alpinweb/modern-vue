import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import UserForm from "./UserForm.vue";
import {createPinia, setActivePinia} from "pinia";
import {createMemoryHistory, createRouter} from "vue-router";
import {routes} from "../router.ts";

vi.stubGlobal('fetch', vi.fn(() => {
}));

describe("UserForm", () => {
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

    it("runs through the workflow", async () => {
        const wrapper = mount(UserForm, {
            global: {
                plugins: [pinia, router],
            },
        });

        let btn = wrapper.find('button');
        expect(btn.element.disabled).toBe(true);

        expect(
            wrapper.find('[data-testid="username"]').find('.is-danger').text())
            .toBe("This field is required");
        expect(
            wrapper.find('[data-testid="password"]').find('.is-danger').text())
            .toBe("This field is required");

        await wrapper.find('#username').setValue('user');
        await wrapper.find('#password').setValue('password');

        expect(
            wrapper.find('[data-testid="username"]').find('.is-danger').text())
            .toBe("This field must be between 5 and 10");
        expect(
            wrapper.find('[data-testid="password"]').find('.is-danger').text())
            .toBe("This field must be between 10 and 40");

        await wrapper.find('#username').setValue('username');
        await wrapper.find('#password').setValue('password123');

        expect(
            wrapper.find('[data-testid="username"]').find('.is-danger').exists())
            .toBe(false);
        expect(
            wrapper.find('[data-testid="password"]').find('.is-danger').exists())
            .toBe(false);

        expect(wrapper.find('button').element.disabled).toBe(false);

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted().submit[0]).toEqual([{
            username: 'username',
            password: 'password123',
        }]);
    });
});