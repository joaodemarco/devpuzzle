<script setup>
import { computed } from "vue";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    as: {
        type: [String, Object],
        default: "button",
    },
    href: {
        type: String,
    },
    variant: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "md",
    },
    disabled: Boolean,
});

const baseClasses =
    "inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring active:opacity-80 md:active:opacity-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

const variants = {
    primary:
        "bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 text-white focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950",
    secondary:
        "hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950",
};

const sizes = {
    sm: "text-sm pt-1 pb-px px-2",
    md: "pt-1 pb-px px-3",
    lg: "text-lg pt-1.5 pb-1 px-4",
};

const classes = computed(() => [
    baseClasses,
    variants[props.variant],
    sizes[props.size],
]);

const isButton = computed(() => props.as === "button");
</script>

<template>
    <component
        :is="as"
        v-bind="as !== 'button' ? { href } : {}"
        :type="isButton ? 'button' : undefined"
        :class="[classes, $attrs.class]"
        :disabled="isButton ? disabled : undefined"
    >
        <slot />
    </component>
</template>
