<template>
    <div>
        <router-link
            v-show="href"
            ref="btn"
            :to="href ?? ''"
            class="flex items-center justify-center w-fit h-fit py-2 px-4 text-slate-500 text-xl font-bold bg-transparent rounded-md outline-none
                border-b-4 border-transparent hover:bg-slate-100 hover:dark:bg-slate-600 hover:border-slate-200 hover:dark:border-slate-700 hover:text-teal-500 focus:text-teal-500 transition-all"
        >
            <p class="whitespace-nowrap text-ellipsis max-w-full min-w-0 w-fit h-fit max-h-full min-h-0">
                <slot />
            </p>
        </router-link>
        <button
            v-show="!href"
            ref="btn-2"
            class="flex items-center justify-center w-fit h-fit py-2 px-4 text-slate-500 text-xl font-bold bg-transparent rounded-md outline-none
                border-b-4 border-transparent hover:bg-slate-100 hover:dark:bg-slate-600 hover:border-slate-200 hover:dark:border-slate-700 hover:text-teal-500 focus:text-teal-500 transition-all"
        >
            <p class="whitespace-nowrap text-ellipsis max-w-full min-w-0 w-fit h-fit max-h-full min-h-0">
                <slot />
            </p>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ButtonText',
    props: {
        href: {
            type: String,
            default: '',
            required: false
        },
        action: {
            type: Function,
            default: () => {},
            required: false
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        }
    },
    watch: {
        disabled() {
            this.applyDisabled();
        }
    },
    mounted() {
        const el = this.href ? this.$refs["btn"].$el : this.$refs["btn-2"];
        this.applyDisabled();

        el.addEventListener("click", this.onClick);
    },
    methods: {
        onClick() {
            if (this.href || this.disabled) return;
            this.action?.(this);
        },
        applyDisabled() {
            if (this.href && this.disabled) this._link = undefined;
            else this._link = this.href;

            const els = [this.$refs["btn"].$el, this.$refs["btn-2"]];
            if (this.disabled) {
                els.forEach(el => {
                    el.classList.remove("text-slate-500", "hover:bg-slate-100", "hover:text-teal-500", "hover:border-slate-200");
                    el.classList.add("text-slate-400", "cursor-default");
                });
            } else {
                els.forEach(el => {
                    el.classList.remove("text-slate-400", "cursor-default");
                    el.classList.add("text-slate-500", "hover:bg-slate-100", "hover:text-teal-500", "hover:border-slate-200");
                });
            }
        }
    }
}
</script>