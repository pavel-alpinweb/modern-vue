import {defineStore} from "pinia";
import {Post, today, thisWeek, thisMonth, TimelinePost} from "../posts.ts";
import {Period} from "../constants.ts";
import {computed} from "vue";
import {DateTime} from "luxon";

interface PostsState {
    ids: string[]; // ["1", "2"]
    all: Map<string, Post>;
    selectedPeriod: Period;
}

function delay() {
    return new Promise<void>(res => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        ids: [],
        all: new Map(),
        selectedPeriod: "Today",
    }),

    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period;
        },

        async fetchPosts() {
            const res = await window.fetch("http://localhost:8000/posts");
            const data = (await res.json()) as Post[];

            const ids: string[] = [];
            const all = new Map<string, Post>();
            await delay();

            for (const post of data) {
                ids.push(post.id);
                all.set(post.id, post);
            }

            this.ids = ids;
            this.all = all;
            //
        },

        async createPost(post: TimelinePost) {
            const body = JSON.stringify({...post, created: post.created.toISO()});
            return await window.fetch("http://localhost:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });
        }
    },

    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids.map(id => {
                const post = state.all.get(id);
                if (!post) {
                    throw Error(`Post with id of ${id} was not found!`);
                }

                return {
                    ...post,
                    created: DateTime.fromISO(post.created)
                };
            }).filter(post => {
                if (state.selectedPeriod === "Today") {
                    return post.created >= DateTime.now().minus({day: 1});
                }

                if (state.selectedPeriod === "This Week") {
                    return post.created >= DateTime.now().minus({week: 1});
                }

                if (state.selectedPeriod === "This Month") {
                    return post.created >= DateTime.now().minus({week: 4});
                }

                return post;
            });
        }
    },
});