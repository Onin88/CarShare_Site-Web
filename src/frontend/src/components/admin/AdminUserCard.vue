<template>
    <div
        class="flex flex-col justify-center rounded-md border-2 border-slate-500 dark:border-slate-500 shadow-md p-2 space-y-2
               bg-slate-50 dark:bg-slate-600 hover:bg-white hover:border-teal-500 transition-all cursor-pointer"
        @click="() => { onclick(data); }"
    >
        <p class="text-xl font-semibold text-slate-700 dark:text-slate-200 text-left whitespace-nowrap text-ellipsis overflow-hidden">
            {{ data.firstName }} {{ data.lastName }}
        </p>
        <p class="text-xl font-semibold text-slate-500 dark:text-slate-400 text-left whitespace-nowrap text-ellipsis overflow-hidden">
            {{ data.email }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'AdminUserCard',
    props: {
        data: {
            type: Object,
            required: true
        },
        onclick: {
            type: Function,
            default: () => {},
            required: false
        }
    },
    data() {
        return {}
    },
    methods: {

    }
}
</script>