<template>
    <div class="flex grow flex-col min-h-0 max-h-screen max-w-full">
        <topbar />
        <div class="flex md:flex-row flex-col grow max-h-min min-h-0">
            <div
                ref="tabs-zone"
                class="show-right flex flex-col items-center h-full md:w-min w-full min-h-0 px-8 py-4 space-y-4 md:border-r-8 border-teal-500 mx-auto overflow-hidden min-w-min"
            >
                <p class="text-2xl text-teal-500 py-2 font-bold mx-auto">
                    {{ lang.PROFILE }}
                </p>
                <button-tab
                    href="#infos"
                    :default="!isMobile"
                >
                    {{ lang.MY_INFOS }}
                </button-tab>
                <button-tab href="#notifs">
                    {{ lang.MY_NOTIFS }}
                </button-tab>
                <button-tab href="#trips">
                    {{ lang.MY_TRIPS }}
                </button-tab>
                <button-tab href="#groups">
                    {{ lang.MY_GROUPS }}
                </button-tab>
                <button-tab href="#params">
                    {{ lang.PARAMS }}
                </button-tab>
                <div class="flex grow justify-end items-end mx-auto">
                    <button-block :action="disconnect">
                        {{ lang.DISCONNECT }}
                    </button-block>
                </div>
            </div>
            <div
                ref="content-zone"
                class="flex flex-col md:grow min-h-0 max-h-full max-w-full min-w-0"
            >
                <button
                    ref="backtabs-btn"
                    class="absolute md:hidden text-slate-700 dark:text-slate-200 flex rounded-md border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-600 h-fit w-fit p-1 m-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-7 h-7"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                <tab-window
                    default-hash="#infos"
                    class="md:pt-0 pt-5 max-h-full max-w-full min-w-0"
                >
                    <tab-div
                        hash="#infos"
                        class="flex flex-col items-center"
                    >
                        <user-infos />
                    </tab-div>

                    <tab-div hash="#notifs">
                        <user-notifs />
                    </tab-div>

                    <tab-div hash="#trips">
                        <user-trips />
                    </tab-div>

                    <tab-div hash="#groups">
                        <user-groups />
                    </tab-div>

                    <tab-div hash="#params">
                        <user-params />
                    </tab-div>
                </tab-window>
            </div>
        </div>
    </div>
</template>

<script>
import Topbar from '../components/topbar/Topbar.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import ButtonTab from '../components/inputs/ButtonTab.vue';
import TabWindow from '../components/cards/TabWindow.vue';
import TabDiv from '../components/cards/TabDiv.vue';
import UserInfos from '../components/profile/UserInfos.vue';
import UserNotifs from '../components/profile/UserNotifs.vue';
import UserTrips from '../components/profile/UserTrips.vue';
import UserParams from '../components/profile/UserParams.vue';
import UserGroups from '../components/profile/UserGroups.vue';
import User from '../scripts/User';
import Lang from '../scripts/Lang';

export default {
    name: 'ProfileView',
    components: {
        Topbar,
        ButtonBlock,
        ButtonTab,
        TabWindow,
        TabDiv,
        UserInfos,
        UserNotifs,
        UserTrips,
        UserParams,
        UserGroups
    },
    data() {
        return { isMobile: window.innerWidth < 768, lang: Lang.CurrentLang }
    },
    watch: {
        '$route.hash': function (newVal, oldVal) {
            const isMobile = window.innerWidth < 768;
            if (isMobile && newVal != '') this.hideTabs();
        }
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);

        this.setupView();
        window.addEventListener("resize", () => {
            this.isMobile = window.innerWidth < 768;
            this.setupView();
        });
    },
    methods: {
        disconnect() {
            User.forget();
            this.$router.push('/');
        },
        setupView() {
            const tabs = this.$refs["tabs-zone"];
            const tabsBtn = this.$refs["backtabs-btn"];
            const content = this.$refs["content-zone"];
            if (tabs == null || tabsBtn == null || content == null) return;

            if (this.isMobile) {
                this.showTabs = () => {
                    tabs.classList.remove("hidden");
                    content.classList.add("hidden");

                    tabs.classList.add("show-right");
                    content.classList.remove("show-left");
                    tabsBtn.classList.remove("show-left");
                };
                this.hideTabs = () => {
                    tabs.classList.add("hidden");
                    content.classList.remove("hidden");

                    tabs.classList.remove("show-right");
                    content.classList.add("show-left");
                    tabsBtn.classList.add("show-left");
                };

                tabsBtn.addEventListener("click", () => {
                    this.showTabs();
                    this.$router.push({ hash: '' });
                });
                if (window.location.hash == '')
                    this.showTabs();
                else this.hideTabs();
            } else {
                tabs.classList.remove("hidden");
                content.classList.remove("hidden");
            }
        }
    }
}
</script>
