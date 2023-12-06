import {createApp} from 'vue';
import {createPinia} from "pinia";
import App from './App.vue';
import {router} from "./router.ts";
import {useUsers} from "./stores/users.ts";
import {usePosts} from "./stores/posts.ts";

const app = createApp(App);
app.use(createPinia());
const usersStore = useUsers();
const postsStore = usePosts();

Promise.all([
    usersStore.authenticate(),
    postsStore.fetchPosts(),
]).then(() => {
    app.use(router);
    app.mount('#app');
});
