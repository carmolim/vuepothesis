<template>

    <div class="mx-auto flex mx-auto px-4">

        <div class="flex justify-between w-full mb-4 p-8 bg-white shadow rounded-lg">
            
            <p class="font-extrabold text-gray-900"><router-link to="/">Vuepothesis</router-link></p>        

            <div id="nav">
                <router-link to="/about">About</router-link>
            </div>
            
        </div>

    </div>
        
    <div class="flex flex-col md:flex-row items-start mx-auto px-4">
        <router-view/>
    </div>

</template>

