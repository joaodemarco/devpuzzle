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
    md: "py-px px-3",
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
        :href="as != 'button' ? href : undefined"
        :type="isButton ? 'button' : undefined"
        :class="[classes, $attrs.class]"
        :disabled="isButton ? disabled : undefined"
    >
        <slot />
    </component>
</template>
