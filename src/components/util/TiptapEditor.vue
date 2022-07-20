<template>
    <div v-if="editor">
        <div class="editor__header">
            <button class="menu-item" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <i class="fa-solid fa-bold"></i>
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <i class="fa-solid fa-italic"></i>
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                <i class="fa-solid fa-strikethrough"></i>
            </button>

            <div class="divider"></div>

            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                h1
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                h2
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                h3
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                h4
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                h5
            </button>
            <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                h6
            </button>

            <div class="divider"></div>

            <button class="menu-item" @click="" v-if="!option.except.find(item => item ==='img')">
                <el-upload
                        multiple
                        action=""
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-change="changeFileList"
                        :on-preview="previewFile"
                        :on-remove="removeFile"
                        :on-exceed="handleExceed"
                        :before-remove="beforeRemoveFile"
                        :show-file-list="false"
                >
                    <i class="fa-solid fa-image"></i>
                </el-upload>
            </button>
        </div>
        <editor-content :editor="editor"/>
    </div>
</template>

<script>
import {inject, reactive, toRefs, ref, onBeforeUpdate} from "vue";
import { useEditor, EditorContent  } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list';
export default {
    props: {
        detail: {
            type: String,
        },
        option: {
            type: Object,
        }
    },
    setup(props, context) {
        const option = ref(null);
        option.value = props.option;

        const state = reactive({
            // Update된 후 값 셋팅 체크
            setEnd: false,
            // Tiptap 에디터가 담길 변수
            editor: useEditor({
                // content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
                content: '',
                extensions: [
                    StarterKit,
                    Paragraph,
                    Text,
                    TextStyle,
                    Heading,
                    BulletList,
                    //이미지 추가
                    Image,
                ],
                onUpdate({ editor }) {
                    getTiptapContent();
                },
            }),

            // 파일이 담길 List
            fileList: []
	    });

        onBeforeUpdate (async () => {
            if(!state.setEnd && props.detail !== '') {
                state.editor.commands.setContent(props.detail);
                state.setEnd = true;
            }
        });

	    const changeFileList = (uploadFile, fileList) => {
		    console.log('changeFileList');
		    const file = uploadFile.raw;
            console.log(file);

		    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
			    const targetIdx = fileList.findIndex(item => item.uid === file.uid);
                state.fileList = fileList.splice(targetIdx,1);
			    return alert('이미지 또는 PDF 파일을 업로드 해주세요');
		    }

		    if (file.size > option.value.fileMaxSize*1024*1000) {
			    const targetIdx = fileList.findIndex(item => item.uid === file.uid);
                state.fileList = fileList.splice(targetIdx,1);
			    return alert(`첨부파일은 ${option.value.fileMaxSize}MB를 초과할 수 없습니다`);
		    }

			// 에디터에 보여주기 위한 임시 URL 생성
            const createObjectURL = URL.createObjectURL(file);

			// tiptap 에디터에 이미지 삽입 (파일 구분을 위해 uid도 함께!)
            state.editor.chain().focus().setImage({ title: file.uid, src: createObjectURL}).run()

			// 변경된 tiptap content 전달
			getTiptapContent()

			// 업로드 되어야 할 현재 파일 리스트 업로드
			context.emit('changeFile', fileList);
		};

        const handleAvatarSuccess = (res, file) => {
            console.log(file);

            state.fileList.add(URL.createObjectURL(file.raw))
        }

	    const previewFile = (file) => {
		    console.log('previewFile');
		    console.log(file);
	    };
	    const beforeRemoveFile = (file, fileList) => {
		    console.log('beforeRemoveFile');
		    return alert('파일이 삭제되었습니다');
	    };
	    const removeFile = (file, fileList) => {
		    console.log('removeFile');
		    console.log(file, fileList);
	    };
	    const handleExceed = (files, fileList) => {
		    console.log('handleExceed');
            alert(`${option.value.limit}개 이하로 파일첨부 가능합니다`);
	    };

	    const getTiptapContent = () => {
            context.emit('change', state.editor.getHTML());
	    };

        return {
	        ...toRefs(state),
	        changeFileList,
            handleAvatarSuccess,
            removeFile,
	        previewFile,
	        handleExceed,
	        beforeRemoveFile,
            getTiptapContent,
        };
    },

    components: {
        EditorContent,
    },
};
</script>
