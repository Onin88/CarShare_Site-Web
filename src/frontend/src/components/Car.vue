<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="fill"
        viewBox="-1 -4 59 27"
        stroke-width="2"
        :stroke="stroke"
    >
        <path
            class="cls-1"
            d="M181.3,151.36"
            transform="translate(-122.27 -143.86)"
        />
        <circle
            class="cls-1"
            cx="10.48"
            cy="17.33"
            r="4.36"
        />
        <path
            class="cls-1"
            d="M167.7,156.83a4.36,4.36,0,1,0,4.36,4.36A4.36,4.36,0,0,0,167.7,156.83Z"
            transform="translate(-122.27 -143.86)"
        />
        <path
            class="cls-1"
            d="M177.68,155.66c1-4.33-.84-4.19-4.94-6.55-3.35-2.33-6.35-4.77-9.91-5.07-6.14-.11-14.18-.31-14.71,0-4.74,1.39-7.93,4.33-11.84,5.62-5.12,2.35-12.16-.64-12.64,6-1.9-.26-1.45,3.37-.9,4.68,1,1.29,2.81.36,4.22.56.5-7.15,11.27-7.1,11.49.21l23.74-.05c-.09-7.19,11.34-7.1,11.08.13,1.5-.25,3.35.52,4.56-.53C178.66,159.24,179.84,155.37,177.68,155.66Zm-23.2-5.44c-.32.53-12.7.66-13.41.07-.82-.39,7.66-4.58,8.33-4.63.44-.23,4.74-.34,5.09,0S155,150.21,154.48,150.22Zm15.69.07c-.63.59-11.6.46-11.89-.07-.49,0-.36-4.32,0-4.57s4.12-.22,4.5,0C163.38,145.71,170.9,149.9,170.17,150.29Z"
            transform="translate(-122.27 -143.86)"
        />
    </svg>
</template>

<script>
export default {
    name: 'Component',
    props: {
        fill: {
            type: String,
            default: 'none',
            required: false
        },
        stroke: {
            type: String,
            default: 'currentColor',
            required: false
        },
    },
    data() {
        return {}
    }
}
</script>