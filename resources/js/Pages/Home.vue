<script setup>
import { Head } from "@inertiajs/vue3";
import GameCard from "@/Components/ui/GameCard.vue";
import guessTheTechIllustration from "@/assets/images/guess-the-tech-game-illustration.png";
import revealTheTechIllustration from "@/assets/images/reveal-the-tech-game-illustration.png";
</script>

<template>
    <Head>
        <meta
            name="description"
            content="Play DevPuzzle — a daily game for developers. Guess the technologies and test your programming knowledge through interactive puzzles and clues."
        />

        <!-- OG -->
        <meta
            property="og:title"
            content="DevPuzzle: The daily challenge for developers"
        />
        <meta
            property="og:description"
            content="Guess the technologies and test your knowledge in this daily puzzle game for developers."
        />
        <meta
            property="og:image"
            content="https://devpuzzle.net/og-image.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devpuzzle.net" />

        <!-- Twitter card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta
            name="twitter:title"
            content="DevPuzzle: The daily challenge for developers"
        />
        <meta
            name="twitter:description"
            content="Guess the technologies and test your knowledge in this daily puzzle game for developers."
        />
        <meta
            name="twitter:image"
            content="https://devpuzzle.net/og-image.png"
        />
    </Head>

    <h1 class="text-4xl md:text-6xl text-center mb-4">
        DevPuzzle: The daily challenge for developers.
    </h1>

    <nav aria-label="Game selection" class="mx-6 mb-6">
        <ul class="flex flex-col items-center gap-6">
            <li>
                <GameCard
                    title="Guess the Tech"
                    description="Each attempt reveals how far you are from the
                            correct answer."
                    :image="guessTheTechIllustration"
                    imageAlt="Colorful grid illustration representing Guess the Tech game"
                    href="/guess-the-tech"
                >
                </GameCard>
            </li>

            <!-- Reveal the tech -->
            <li>
                <GameCard
                    title="Reveal the Tech"
                    description="Unblur a new piece of code on every try."
                    :image="revealTheTechIllustration"
                    imageAlt="A grid illustration with unhidden and hidden blocks representing Reveal the Tech game"
                    href="/reveal-the-tech"
                >
                </GameCard>
            </li>
        </ul>
    </nav>
</template>
