<template>

    <div v-if="!apiInfo.saved" class="w-full mb-4 p-8 bg-white shadow rounded-lg">

        <h1 class="mb-2 inline-block text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome to Vuepothesis!
        </h1>

        <h2 class="mb-4 text-lg text-gray-500">
            Use this tool to see, edit and export (soon) your annotations with ease.
        </h2>

        <p class="mb-2">
            To use this interface you need to
            <a
                class="underline hover:textDecoration"
                href="https://hypothes.is/account/developer"
                target="_blank" rel="noopener noreferrer">
                generate and get
            </a> your API Token on your

            <a
                class="underline hover:textDecoration"
                href="http://hypothes.is/" target="_blank"
                rel="noopener noreferrer">
                hypotes.is
            </a>
            account. 
        </p>

        <!-- <p class="inline-flex items-stretch">
            <a class="mb-2" href="https://hypothes.is/account/developer" target="_blank" rel="noopener noreferrer">Get your API key</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </p> -->

        <form @submit.prevent="saveToken" class="d-md-flex">

            <input
                name="apiKey"
                v-model="apiInfo.token"
                placeholder="Put your API Token"
                class="w-full mb-5 border rounded-lg border-2 p-4 py-2"
                type="password">
                
            <input
                class="mr-2 "
                type="checkbox"
                id="saveKey"
                v-model="apiInfo.wantToSave">

            <label for="saveKey" class="text-gray-500 ">I want to save the token on this device?</label>

            <button
                type="submit"
                class="block mt-4 py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                Save
            </button>
        
        </form>

    </div>

    <aside class="w-full md:w-1/4 md:sticky inset-x-0 top-0 left-0">
    
        <div>

            <div v-if="apiInfo.saved" class="p-8 mb-4 bg-white shadow rounded-lg">

                <p class="mb-2 uppercase font-bold text-xs text-gray-500">Search</p>
                
                <form @submit.prevent=getAnnotations>

                    <input
                        name="searchTags"
                        class="w-full mb-2 border rounded-lg border-2 p-4 py-2"
                        placeholder="Tags"
                        type="text"
                        v-model=searchTags
                    />

                    <input
                        name="searchUrl"
                        class="w-full mb-2 border rounded-lg border-2 p-4 py-2"
                        placeholder="URL"
                        type="text"
                        v-model=searchUrl
                    />

                    <button
                        type="submit"
                        class="py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                        Search
                    </button>

                </form>

            </div>

            <template v-if="selectedAnnotations.length > 0">

                <div class="p-8 mb-4 bg-white shadow rounded-lg">

                    <div class="">

                        <p class="mb-2 uppercase font-bold text-xs text-gray-500">Edit tags</p>

                        <p class="mb-4 text-sm">Add or overwrite the tags bellow to the selected annotations.</p>

                        <input v-model=newTags
                            name="newTags"
                            class="w-full mb-2 border rounded-lg border-2 p-4 py-2"
                            placeholder="Commma separeted tags" type="text"
                        />

                        <button
                            @click="addTags('add')"
                            type="submit"
                            class="mr-2 py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                            Add
                        </button>

                        <button
                            @click="addTags('overwrite')"
                            type="submit"
                            class="py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                            Overwrite
                        </button>

                        <!-- <Info>

                            <template v-slot:short>Add or overwrite?</template>

                            <template v-slot:full>
                                If you use the ADD, the tags that you listed on
                                the on the field will be added to the existing
                                tags of each selected note. If you choose to overwrite,
                                the tags that you insert on the field will replace
                                the existing tags of the selected tags.
                            </template> 

                        </Info> -->

                    </div>

                </div> 

            </template>

            <div v-if="apiInfo.edit" class="p-8 mb-4 bg-white rounded-lg">

                <p class="mb-2 uppercase font-bold text-xs text-gray-500">Api Key</p>

                <form @submit.prevent="saveToken" class="d-md-flex">

                    <input
                        name="apiKey"
                        v-model="apiInfo.token"
                        placeholder="Put your API Token"
                        class="w-full mb-5 border rounded-lg border-2 p-4 py-2"
                        type="password">
                        
                    <!-- 6879-PUNP8MdCR_fSGZw-eG823k-EjJY3P1FH1241TSqVPIY -->
                    <input
                        class="mr-2 "
                        type="checkbox"
                        id="saveKey"
                        v-model="apiInfo.wantToSave">

                    <label for="saveKey" class="text-gray-500 ">Trust this device?</label>

                    <button type="submit" class="block mt-4 py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                        Save
                    </button>
                
                </form>

            </div> 


            <template v-if="annotations.length > 0">

                <p
                    v-if="!apiInfo.edit"
                    @click="apiInfo.edit = !apiInfo.edit"
                    class="mb-8 text-gray-500 text-sm cursor-pointer">

                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Change token info.
                </p>
            
            </template>

        </div>

    </aside>
    
    <div class="flex flex-wrap w-full md:w-3/4 md:pl-4 pb-8 mb-8">

        <div
            v-if="false"
            class="w-full flex sticky inset-x-0 top-0 left-0 justify-between mb-4 p-8 bg-white shadow rounded-lg">
            
            <div class="hidden md:block">
                <p><span class="font-extrabold text-gray-900">{{annotations.length}}</span> notes loaded</p>
            </div>

            <div class="hidden md:block">
                <p><span class="font-extrabold text-gray-900">{{selectedAnnotations.length}}</span> notes selected </p>
            </div>
            
            <div>

                <input
                    type="checkbox"
                    name="selected"
                    id="selectAll"
                    class="mr-1"
                >

                <label for="selectAll">Select all</label>

            </div>

            <div>

                <input
                    type="checkbox"
                    name="selected"
                    id="deselectAll"
                    class="mr-1"
                >

                <label for="deselectAll">Deselect all</label>

            </div>

        </div>

        <div v-if="annotations">

	        <Annotation v-for="annotation in annotations"
                :key="annotation.id"
                :apiInfo=apiInfo
                :annotation=annotation
                @annotation-selected="annotationSelected"
                @tags-updated="tagsUpdated"
            />
            
            <div v-if="pagination.loading" class="w-full mb-4 p-8 shadow bg-white rounded-lg transition">
                <p>Loading more annotations...</p>
            </div>

            <button
                v-if="annotations.length > 0"
                @click="loadMoreAnnotations"
                class="py-2 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:border-green-200 transition-all">
                Load More
            </button>

        </div>

        <!-- <div v-else class="w-full mb-4 p-8 bg-white rounded-lg transition">
            <p>No annotations found</p>
        </div> -->

    </div>

</template>

<script>

	import { ref, reactive, onMounted } from 'vue'
	import apiGetAnnotations from '@/services/get'
    import apiPatchAnnotation from '@/services/patch'

	import Annotation from '@/components/Annotation'
	import Info from '@/components/Info'

	export default {

		components:{
			Annotation,
            Info
		},

		setup() {

			const annotations = ref({})
            const searchTags = ref('')
            const searchUrl = ref('')

            const selectedAnnotations = ref([])
            const newTags = ref('')

            const pagination = reactive({
                page: 0 ,
                itemsPerPage: 10,
                loading: false,
            })
            
            const apiInfo = reactive({
                token: '',
                user: '',
                wantToSave: false,
                saved: false,
                edit: false
            })

			onMounted(() => {
        
                if (localStorage.getItem('apiInfo')) {
                    const data = JSON.parse(localStorage.getItem('apiInfo'));
                    Object.assign(apiInfo, data) // https://stackoverflow.com/a/65733741/2222978
                }

                if(apiInfo.token && apiInfo.user){
                    getAnnotations()
                }

			})

			async function getAnnotations(){

                selectedAnnotations.value = []
                pagination.loading = true

                let cleanObj = {
                    url: searchUrl.value,
                    tags: searchTags.value,
                    user: apiInfo.user,
                    limit: pagination.itemsPerPage
                }  

                cleanObj = removeFalsy(cleanObj)

                try {
                    
                    const results = await apiGetAnnotations('/search', cleanObj, apiInfo.token)
                    
                    annotations.value = results.data.rows
                    pagination.totalItems = results.data.total

                    
                } catch (error) {
                    console.log(error)
                }

                pagination.loading = false

			}

            async function loadMoreAnnotations(){

                pagination.loading = true

                pagination.page++

                let cleanObj = {
                    offset: pagination.page * pagination.itemsPerPage,
                    url: searchUrl.value,
                    tags: searchTags.value,
                    user: apiInfo.user,
                    limit: pagination.itemsPerPage
                }  

                cleanObj = removeFalsy(cleanObj)
                console.log(cleanObj)

                try {

                    const results = await apiGetAnnotations('/search', cleanObj, apiInfo.token)
                    
                    // more elegant way to update the array?
                    results.data.rows.map(item => {annotations.value.push(item)})

                    // console.log(annotations.value)
                
                    pagination.loading = false
                    
                } catch (error) {
                    console.log(error)
                }
            }

            function tagsUpdated(data){
                console.log(data.tags)

                const annotationToUpdate = annotations.value.find( item => item.id === data.id )
                annotationToUpdate.tags = data.tags.split(', ')
            }

            function annotationSelected(data){
                // find value inside array
                // ref: https://attacomsian.com/blog/javascript-array-search
                if(data.selected && !selectedAnnotations.value.includes(data.id) ){
                    selectedAnnotations.value.push(data.id)
                }
                else{
                    selectedAnnotations.value = removeValueFromArray(selectedAnnotations.value, data.id)
                }
                console.log(selectedAnnotations.value)
            }

            // https://dev.to/askrishnapravin/for-loop-vs-map-for-making-multiple-api-calls-3lhd
            async function addTags(mode){

                // checks if some annotation is selected
                if(selectedAnnotations.value.length){

                    // checks if the user inserted some tag
                    if(newTags.value){

                        // create a clean array with the tags inserted by the user
                        const newTagsArray = newTags.value.split(',').map(item => item.trim()).filter( item => item != '')

                        // if there's tags to add...
                        if(newTagsArray.length > 0){
                            
                            // ref: https://dev.to/askrishnapravin/for-loop-vs-map-for-making-multiple-api-calls-3lhd
                            Promise.all(

                                selectedAnnotations.value.map(async (id) => {

                                    let tagsToAdd
                                    
                                    // find the selected annotation in the array
                                    const currentAnnotation = annotations.value.find( item => item.id === id )

                                    if(mode == 'add'){

                                        // existent tags for this annotation
                                        tagsToAdd = currentAnnotation.tags
                                        
                                        // merging the existing tags with the new tags to update the annotation via the API
                                        tagsToAdd = tagsToAdd.concat(newTagsArray)
                                        
                                        // only unique values
                                        // ref: https://stackoverflow.com/a/14438954/2222978
                                        tagsToAdd = [... new Set(tagsToAdd)]

                                    }

                                    else if( mode == 'overwrite')
                                    {
                                        tagsToAdd = newTagsArray
                                    }

                                    try {
                                        const results = await apiPatchAnnotation('/annotations/' + id, { tags: tagsToAdd }, apiInfo.token)
                                        Object.assign(currentAnnotation, results.data)
                                    }
                                    catch (error) {
                                        console.log(error)
                                    }   
                                })
                            )
                        }
                    }
                    else{
                        alert(`Insert at least one tag`)
                    }
                }
                else{
                    alert(`Select at least one annotation`)

                }
            }
         
            async function saveToken(){

                // TODO: do a better validation of the token
                if(apiInfo.token){

                    try {
                        const results = await apiGetAnnotations('/profile', null, apiInfo.token)
                        apiInfo.user = results.data.userid
                        console.log(apiInfo.user)
                        
                    } catch (error) {
                        console.log(error)
                    }

                    apiInfo.saved = true
                    apiInfo.edit = false

                    getAnnotations()

                    if( apiInfo.wantToSave ){

                        localStorage.setItem('apiInfo', JSON.stringify(apiInfo));
                        console.log('salvou token no localStorage: ' + apiInfo)
                    }
                    else{
                        localStorage.removeItem('apiInfo');
                        console.log('token disponível para uso mas não foi salvo')
                    }
                }
              
                else{
                    alert('Insert a valid token to proceed.')
                }
            }

            // TODO: put in a file with fuctions
            function removeValueFromArray(arr, value) { 
                return arr.filter(function(el){ 
                    return el != value; 
                });
            }

            // TODO: put in a file with fuctions
            //https://coderwall.com/p/urxpsa/remove-falsy-values-or-empty-strings-from-javascript-objects
            function removeFalsy (obj) {
                let newObj = {};

                Object.keys(obj).forEach((prop) => {
                    if (obj[prop]) { newObj[prop] = obj[prop]; }
                });

                return newObj;
            };

			return{
				annotations,
                getAnnotations,
                pagination,
                loadMoreAnnotations,
                annotationSelected,
                selectedAnnotations,
                searchTags,
                searchUrl,
                apiInfo,
                saveToken,
                newTags,
                addTags,
                tagsUpdated,
			}
		},
	}
</script>   