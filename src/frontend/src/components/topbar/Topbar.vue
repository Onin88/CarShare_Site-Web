<template>
    <div class="flex flex-col grow-0 h-fit w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b-8 border-teal-500 items-center">
        <div class="flex grow w-full">
            <router-link
                to="/"
                class="flex w-[20%] h-fit py-1 text-slate-500 dark:text-slate-300 text-3xl font-extrabold whitespace-nowrap text-ellipsis
                       hover:text-teal-500 hover:dark:text-teal-500 outline-none focus:text-teal-500 focus:dark:text-teal-500 transition-all"
            >
                <h1>
                    {{ lang.CARSHARE }}
                </h1>
            </router-link>
            <div class="md:flex hidden grow">
                <div class="flex grow justify-evenly">
                    <button-text
                        v-for="button in buttons"
                        :key="button.name"
                        :href="button.link"
                    >
                        {{ lang[button.id] }}
                    </button-text>
                </div>
                <div class="flex w-[20%] h-fit justify-end space-x-4">
                    <router-link
                        to="/profile#notifs"
                        class="relative flex text-slate-500 justify-center items-center my-auto outline-none
                               hover:text-teal-500 hover:dark:text-teal-500 focus:text-teal-500 focus:dark:text-teal-500 transition-all"
                    >
                        <bell-icon class="w-7 h-7" />
                        <span
                            v-show="hasNotifs"
                            class="absolute top-0 right-0 bg-red-500 rounded-2xl w-2 h-2"
                        />
                    </router-link>
                    <button-block href="/profile">
                        {{ lang.MY_PROFILE }}
                    </button-block>
                </div>
            </div>
            <div class="md:hidden flex grow justify-end items-center">
                <button
                    ref="btn-mobile"
                    class="text-slate-500 cursor-pointer transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-8 h-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div
            ref="menu-mobile"
            class="flex grow w-full h-fit overflow-hidden transition-all"
            style="max-height: 0px"
        >
            <div class="flex grow flex-col h-fit">
                <button-text
                    v-for="button in buttons"
                    :key="button.name"
                    :href="button.link"
                    class="mx-auto"
                >
                    {{ lang[button.id] }}
                </button-text>
                <span class="flex grow h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 mt-2" />
                <button-block
                    href="/profile"
                    class="mx-auto"
                >
                    {{ lang.MY_PROFILE }}
                </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonText from '../inputs/ButtonText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import User from '../../scripts/User.js';
import Lang from '../../scripts/Lang';

import {
    BellIcon
} from '@heroicons/vue/24/outline';
import API from '../../scripts/API';


const buttons = [
    {
        id: 'HOME',
        link: '/'
    },
    {
        id: 'PROFILE',
        link: '/profile'
    },
    {
        id: 'GROUPS',
        link: '/profile#groups'
    }
];

export default {
    name: 'TopBar',
    components: {
        ButtonText,
        ButtonBlock,
        BellIcon
    },
    data() {
        // if the topbar is displayed, it's a page that requires authentication
        // so we check if the user is logged in, if not we redirect him to the home page
        // (with buttons to login or register)
        if (!User.CurrentUser) {
            window.location.href = '/home';
            return { lang: Lang.CurrentLang };
        }

        if (User.CurrentUser?.level > 0) { // is admin
            if ( !buttons.find( button => button.id === 'ADMIN' ) )
                buttons.push({
                    id: 'ADMIN',
                    link: '/admin'
                })
        } else {
            if ( buttons.find( button => button.id === 'ADMIN' ) )
                buttons.splice( buttons.findIndex( button => button.id === 'ADMIN' ), 1 )
        }

        return { buttons, lang: Lang.CurrentLang, hasNotifs: false }
    },
    mounted() {
        Lang.AddCallback(lang => {
            this.lang = lang;
            this.buttons = buttons;
        });

        if (!User.CurrentUser) {
            window.location.href = '/home';
            return { lang: Lang.CurrentLang };
        }

        const btn = this.$refs["btn-mobile"];
        const menu = this.$refs["menu-mobile"];
        const child = menu.firstElementChild;
        btn.addEventListener("click", ev => {
            if (menu.style.maxHeight === "0px") {
                btn.classList.add("text-teal-500");
                btn.classList.remove("text-slate-500");
                menu.style.maxHeight = child.getBoundingClientRect().height + "px";
            } else {
                btn.classList.remove("text-teal-500");
                btn.classList.add("text-slate-500");
                menu.style.maxHeight = "0px";
            }
        });

        window.topbar = this;
        this.fetchNotifs();
    },
    methods: {
        fetchNotifs() {
            API.execute_logged(API.ROUTE.MY_NOTIFS, API.METHOD.GET, User.CurrentUser?.getCredentials()).then(res => {
                const nbNotifs = res?.data?.length ?? 0;
                this.hasNotifs = nbNotifs > 0;
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>