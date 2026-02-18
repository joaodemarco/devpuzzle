<script setup>
import { useCountdownUntilNextGame } from "@/Composables/useCountdownUntilNextGame.js";
import Button from "@/Components/ui/Button.vue";

const { serverTime } = defineProps({
    serverTime: Object,
});

const timeUntilNextGame = useCountdownUntilNextGame(serverTime);
</script>

<template>
    <div class="min-h-svh flex flex-col bg-white dark:bg-neutral-950">
        <header
            class="border-b border-b-neutral-100 p-3 dark:border-b-neutral-900"
        >
            <nav class="flex items-center justify-between">
                <Button as="Link" href="/" variant="secondary">
                    &lt;dev puzzle /&gt;
                </Button>

                <Button variant="secondary">about</Button>
            </nav>
        </header>

        <main class="flex flex-col flex-1">
            <slot />
        </main>

        <footer
            class="flex flex-col md:flex-row items-center justify-center md:justify-between py-3 px-6"
        >
            <span class="text-sm text-muted"
                >devpuzzle &copy; {{ new Date().getFullYear() }}</span
            >

            <span class="text-sm text-muted">
                {{ timeUntilNextGame }} until next game (UTC)
            </span>
        </footer>
    </div>
</template>
