import {mount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import PostWriter from "./PostWriter.vue";
import {createPinia, setActivePinia} from "pinia";
import {createMemoryHistory, createRouter} from "vue-router";
import {routes} from "../router.ts";
import {useUsers} from "../stores/users.ts";

vi.stubGlobal('fetch', vi.fn(() => {
}));

describe("PostWriter", () => {
    let pinia: Pinia;
    let router: Router;

    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
        pinia = createPinia();
        setActivePinia(pinia);
        const user = useUsers();
        user.currentUserId = "1";
        router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
    });

    it("writes a post using markdown", () => {
        return new Promise<void>(async resolve => {
            const wrapper = mount(PostWriter, {
                global: {
                    plugins: [pinia, router],
                },
                props: {
                    post: {
                        id: '1',
                        title: '',
                        authorId: '1',
                        created: '',
                        markdown: '',
                        html: '',
                    },
                },
            });

            wrapper.find<HTMLDivElement>('#contenteditable').element.innerText = '# Title';
            await wrapper.find('#contenteditable').trigger('input');

            setTimeout(async () => {
                await wrapper.find('#submit').trigger('click');
                expect(wrapper.emitted().submit[0]).toEqual([
                    {
                        id: '1',
                        title: '',
                        authorId: '1',
                        created: '',
                        markdown: '# Title',
                        html: '<h1 id="title">Title</h1>\n'
                    }
                ]);
                resolve();
            }, 300);
        });
    });
});