<template>
    <Header />

    <div class="posting-content edit">
        <TiptapEditor :detail="detail" :option="option" @change="getTiptapContent" @changeFile="getTiptapFile" />
    </div>

    <el-select v-model="group" class="form select" placeholder="Select"
               :popper-append-to-body="false">
        <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <div class="input">
        <span class="input-label">주소</span>
        <div class="input-field">
            <el-input></el-input>
            <el-button class="btn-normal">찾기</el-button>
        </div>
    </div>
    <div class="input medium">
        <span class="input-label">날짜</span>


        <div class="input-field">
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="시작일"
                    :size="size"
            />
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="종료일"
                    :size="size"
            />
        </div>


    </div>

    <el-button class="btn-normal mt-20">저장하기</el-button>
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

            group: null,
            selectOptions : [
                {
                    value: 'toGo',
                    label: '가볼곳',
                },
                {
                    value: 'gone',
                    label: '다녀옴',
                },
            ],

            startDate: null,
            endDate: null
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