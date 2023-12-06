<script setup lang="ts">
import {Post, TimelinePost} from "../posts.ts";
import {useRouter} from "vue-router";
import {ref, onMounted, watch} from "vue";
import {marked} from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import {usePosts} from "../stores/posts.ts";
import {useUsers} from "../stores/users.ts";

const props = defineProps<{
  post: TimelinePost | Post
}>();

const emit = defineEmits<{
  (event: "submit", post: Post): void;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref('');
const contentEditable = ref<HTMLDivElement>();

const usersStore = useUsers();

function parseHtml(markdown: string) {
  marked.parse(content.value, {
    gfm: true,
    breaks: true,
    highlight: code => {
      return highlightjs.highlightAuto(code).value;
    },
  }, (err, parseResult) => {
    html.value = parseResult;
  });
}

watch(content, debounce(() => {
  parseHtml(content.value);
}, 250), {
  immediate: true,
});

async function handleClick() {
  if (!usersStore.currentUserId) {
    throw Error(`User was not found`);
  }

  const newPost: Post = {
    ...props.post,
    created: typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
    title: title.value,
    authorId: usersStore.currentUserId,
    markdown: content.value,
    html: html.value,
  };
  emit('submit', newPost);
}

function handleInput() {
  if (!contentEditable.value) {
    throw Error('contentEditable DOM nod was not found');
  }
  content.value = contentEditable.value?.innerText;
}

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('contentEditable DOM nod was not found');
  }
  contentEditable.value.innerText = content.value;
});
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title"/>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput"/>
    </div>
    <div class="column" v-html="html"/>
  </div>

  <div class="columns">
    <div class="column">
      <button
          class="button is-primary is-pulled-right"
          @click="handleClick"
      >
        Save Post
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>