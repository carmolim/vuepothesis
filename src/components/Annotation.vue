<template>
    <article
        class="w-full mb-4 p-8 bg-white shadow hover:shadow-xl rounded-lg transition"
        :class="an.selected ? 'bg-green-50' : ''">

        <div class="flex justify-between content-center items-stretch">

            <div>

                <input
                    type="checkbox"
                    name="selected"
                    :id="`selected-${annotation.id}`"
                    @click="an.selected = !an.selected"
                    @change='annotationSelected'
                    class="mr-1"
                >

                <label
                    :for="`selected-${annotation.id}`"
                    class="text-gray-500">
                    select
                </label>

            </div>

            <div class="flex justify-between content-center">
                
                <p class="text-xs text-gray-500 uppercase mr-2">
                    <span class="font-bold">Updated: </span>{{an.dateUpdated}}
                </p>
                
                <p class="hidden md:block text-xs text-gray-500 uppercase">
                    <span class="font-bold">Created: </span>{{an.dateCreated}}
                </p>
            </div>

        </div>

        <hr class="my-4">

        <form @submit.prevent="updateAnnotation" class="d-md-flex">

            <p class="mb-2 uppercase font-bold text-xs text-gray-500">Highlight</p>
            <blockquote v-if=an.highlightedText class="mb-4">"{{an.highlightedText}}"</blockquote>
            
            <label for="comment" class="uppercase font-bold text-xs text-gray-500">Comment</label>
            <textarea name="comment" class="block w-full mb-4 px-4 py-2 border-gray-300 border rounded-lg" @input="checkCommentModification()" v-model=annotation.text></textarea>
            
            <label for="tags" class="uppercase font-bold text-xs text-gray-500">Tags</label>
            <input name="tags" class="w-full mb-5 border rounded-lg border-2 p-4 py-2" type="text" v-model=an.tagsConcatenated >
            
            <div>

                <p class="mb-3 uppercase font-bold text-xs text-gray-500">Sources</p>

                <p class="inline-flex items-stretch text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a class="ml-2" :href=annotation.uri target="_blank" rel="noopener noreferrer">{{an.articleTitle}}</a>
                </p>

                <hr class="my-2">

                <p class="inline-flex items-stretch text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a class="ml-2" :href=annotation.links.incontext target="_blank" rel="noopener noreferrer">See in context</a>
                </p>

            </div>

            <div class="flex justify-between items-stretch content-center mt-4">

                <button
                    type="submit"
                    class="flex align-items py-2 pl-3 pr-4 rounded-lg text-sm font-medium text-white focus:outline-none transition-all"
                    :class=saveButtonStyles()
                    :disabled='!changed'>    

                    <template v-if="!changed">

                        <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>

                    </template>

                    <template v-else>

                        <svg v-if="loading && changed" mlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </template>

                   <span class="ml-2">Save</span>

                </button>
                

                <!-- <button
                    class="flex align-items py-2 pl-3 pr-4 rounded-lg text-sm font-medium text-white bg-gray-400 hover:bg-red-800 active:bg-red-700 focus:outline-none transition-all"
                    disabled>
                 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>

                    <span class="ml-2">Delete</span>

                </button> -->

            </div>
<!-- 
            <button class="p-4 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-800 active:bg-green-900 focus:outline-none border-4 border-white focus:border-green-200 transition-all">

                <svg v-if="loading" mlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>

                 <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </button> -->
            
        </form>

    </article>

</template>

<script>

//TODO: função para deletar essa anotação


import { ref, computed, onBeforeUpdate, watch
  } from 'vue'
import apiPatchAnnotation from '@/services/patch'

// TODO: feedback when the update went ok

export default {

    props: {
        annotation: Object,
        apiInfo: Object
    },

    setup(props, context){

        // FIXME preciso atualizar esses dois valores apenas quando o componente
        // recebe novos propos do parent, tem como fazer isso?
        let comment = props.annotation.text
        let tags = props.annotation.tags.join(', ')

        const an = ref({})
        const loading = ref(false)
        const changed = ref(false)

        try {
            an.value.articleTitle = computed(() => { return props.annotation.document.title[0] })
        } catch (error) {
            console.log(`no title set for annotation: ${props.annotation.id}`)
        }

        try {
            const highlightedTextIndex = props.annotation.target[0].selector.length - 1
            an.value.highlightedText = computed(() => { return props.annotation.target[0].selector[highlightedTextIndex].exact })
            
        } catch (error) {
            console.log(`no array found ${props.annotation.id}`)
        }
        
        an.value.dateCreated = computed(() => { return formatDate (new Date( props.annotation.created )) })
        an.value.dateUpdated = computed(() => { return formatDate (new Date( props.annotation.updated )) })
        an.value.comment = props.annotation.text

        // TODO: eu acho que fazer essa atualização dessa forma até que faz sentido,
        // prefiro achar que tem uma forma melhor de resolver esse problema. 
        // em resumo o que estou fazendo agora é ao invés de atualizar a variável
        // utilizada no v-model com o set (porque ele entra em um loop infinito),
        // eu estou enviando o novo valor detectado para o parent com um emit
        // e estou atualizando o array do parent para que esse child recebe uma
        // prop atualizada que vai popular corretamente o v-model para eu poder
        // fazer atualização corretamente na API
        // talvez ajude: https://stackoverflow.com/a/50108054/2222978
        an.value.tagsConcatenated = computed({ 
            get() { return props.annotation.tags.join(', ') },
            set(newValue) {

                if( tags !== newValue){
                    console.log('changed')
                    changed.value = true
                }
                else{
                    console.log('no change detected')
                    changed.value = false
                }
                
                saveButtonStyles()

                context.emit('tagsUpdated', {tags:newValue, id: props.annotation.id})
            } // TODO: onde salvar esse new value?
        })


        // tentativa de atualizar o valor do comment
        // toda vez que receber um prop novo
        // ainda tem que testar para ver se funciona 
        // não tenho certeza se esse é o melhor lifecycle para essa situação
        // onBeforeUpdate(()=>{
        //     comment = props.annotation.text
        //     tags = props.annotation.tags.join(', ')
        // })


        // watch(an, (newValue, oldValue) => {
        //     console.log(an.value.comment)
        //     console.log(newValue.comment)
        // },
        // {deep: true}
        // )


        // watch(changed, () => {
        //     console.log('changed: ' + changed.value)
        // },
       
        // )
        
        // watch(
        //     () => an,
        //     (newValue, oldValue) =>{

        //         console.log('asd')

        //         if(comment !== newValue){
        //             console.log(`changed`)
        //         }
        //         // console.log('The old value is')
        //         // console.log(oldValue.value.comment)
        //         // console.log('The new value is')
        //         // console.log(newValue.value.comment)
        //     },
        //     { deep: true }

        // )

        function checkCommentModification(){

            console.log(`checkCommentModification`)

            if(comment !== props.annotation.text){
                changed.value = true
            }
            else{
                changed.value = false
            }

            saveButtonStyles()
        }
        
        async function updateAnnotation(){

            loading.value = true

            const tags = an.value.tagsConcatenated.split(',').map(item => item.trim()).filter( item => item != '');

            console.log(tags)

            try {
                const results = await apiPatchAnnotation('/annotations/' + props.annotation.id, { tags, text: props.annotation.text }, props.apiInfo.token)
                console.log(results.data)
                loading.value = false
            }
            catch (error) {
                console.log(error)
            }

            changed.value = false
        }

        const annotationSelected = () => {
            context.emit("annotationSelected", { id:props.annotation.id, selected:an.value.selected } )
        }

        function saveButtonStyles(){
            if(changed.value){
                return [ 'bg-green-600', 'hover:bg-green-800']
            }
            else{
                return ['bg-gray-400','hover:bg-gray-400']
            }
        }

        function formatDate(date) {

            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;

            if (day.length < 2) 
                day = '0' + day;

            return [month, day, year].join('/');
        }

        return{
            an,
            updateAnnotation,
            annotationSelected,
            loading,
            checkCommentModification,
            changed,
            saveButtonStyles
        }
    }
}
</script>
