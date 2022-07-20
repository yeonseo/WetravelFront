<template>
    <Header />

    <div class="posting-content edit">
        <TiptapEditor :detail="detail" :option="option" @change="getTiptapContent" @changeFile="getTiptapFile" />
    </div>
</template>
<script>
import {reactive, toRefs} from "vue";

import Header from '@/components/Header.vue';
import TiptapEditor from '@/components/util/TiptapEditor.vue';

export default {
    name: 'MarkupWrite',

    setup() {
        const state = reactive({
            detail: null,
            option: {
                // except: ['img'],
                except: [],
                fileMaxSize: 50,
                limit: 10,
                totalFileMaxSize: 100,
            },
            fileList: [],
            tiptapContent: null,
            removeFileList: [],
            newFileList: [],
            newItem: {
                fileList:[]
            },
            image: {
                width: 10000,
                height: 10000
            }
        });

        const thisClick = () => {
            alert("HI")
        }

        const getTiptapContent = (tiptapContent) => {
            // 이미지 추가시 Event가 넘어옴..
            // console.log(tiptapContent)
            if(tiptapContent.type === undefined) {
                state.tiptapContent = tiptapContent;
            }
        };

        const getTiptapFile = (newFileList) => {
            state.newFileList = newFileList;
        };

        return {
            ...toRefs(state),
            thisClick,
            getTiptapContent,
            getTiptapFile,
        }
    },
    components: {
        Header,
        TiptapEditor
    }
}
</script>