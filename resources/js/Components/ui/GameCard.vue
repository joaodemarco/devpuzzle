<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Link
        :href="href"
        class="flex flex-col md:flex-row items-center group w-full md:w-3xl p-6 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-500 dark:hover:border-neutral-600 transition-colors"
    >
        <div
            class="flex justify-center pr-0 pb-6 md:pr-6 md:pb-0 shrink-0 border-b md:border-b-0 border-r-0 md:border-r border-r-neutral-200 dark:border-r-neutral-900 border-b-neutral-200 dark:border-b-neutral-900 group-hover:border-r-neutral-500 group-hover:dark:border-r-neutral-600 transition-colors"
        >
            <img :src="image" :alt="imageAlt" loading="lazy" />
        </div>
        <div
            class="flex flex-col items-center md:items-start justify-center text-center md:text-start pl-0 pt-6 md:pl-6 md:pt-0"
        >
            <h2 class="text-2xl">{{ title }}</h2>
            <p class="leading-tight text-neutral-400 dark:text-neutral-500">
                {{ description }}
            </p>
        </div>
    </Link>
</template>
