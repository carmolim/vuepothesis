<template>

    <div class="mt-4">

        <p
            class="inline-flex items-stretch text-gray-500 cursor-pointer"
            @mouseover="state.open = true"
            @mouseleave="state.open = false">

            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <slot name="short"></slot>
        </p>

    </div>

    <div
        v-if="state.open"
        class="absolute bottom-0 left-0">

        <div class="p-8 mb-4 bg-white rounded-lg">

            <p>
                <slot name="full"></slot>
            </p>

        </div>
        
    </div>

</template>

<script>

import {reactive} from 'vue'

export default {

    setup() {
        const state = reactive({
            open: false,
        })

        return{
            state
        }
    },
}

</script>