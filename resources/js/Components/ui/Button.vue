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
    secondary:
        "hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-visible:ring-neutral-200 dark:focus-visible:ring-neutral-100",
};

const sizes = {
    sm: "text-sm py-1 px-2",
    md: "py-px px-3",
    lg: "text-lg py-2 px-4",
};

const classes = computed(() => [
    baseClasses,
    variants[props.variant],
    sizes[props.size] ?? sizes.md,
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
