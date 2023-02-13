<template>

    <div class="edit-page">
        <div class="edit-info">

            <div class="edit-info-left" ref="infoLeft">
                <v-text-field v-model="article.title" label="Title" density="compact"></v-text-field>
                <div class="tag-category">
                    <div class="half pd">
                        <ItemInput v-model="tag" :label="'Add Tags'" v-model:has-chosen="article.tags"
                            :existing-choices="existingTags" @keydown.enter="() => tag = ''">
                        </ItemInput>
                    </div>
                    <div class="half">
                        <ItemInput v-model="category" :label="'Add Category'" v-model:has-chosen="article.categories"
                            :existing-choices="existingCategories" @keydown.enter="() => category = ''">
                        </ItemInput>
                    </div>

                </div>
            </div>

            <div class="edit-info-right" ref="infoRight">
                <v-textarea bg-color="#E9F8CB" color="#9BBD86" label="Description"
                    v-model="article.content.description"></v-textarea>
            </div>


        </div>


        <div class="editor">
            <MdEditor :theme="'dark'" v-model="article.content.markdown"
                @html-changed="(html) => article.content.html = html" />
        </div>


        <div class="submit">
            <v-btn class="me-4">Submit</v-btn>
            <v-btn>Save Draft</v-btn>
        </div>

    </div>
</template>

<script>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
import ItemInput from '../../components/ItemInput.vue';

// MdEditor.config
export default {
    data() {
        return {
            article: {
                title: '',
                description: '',
                content: {
                    markdown: '',
                    html: ''
                },
                image_cover: '',
                state: 0,
                tags: ['haha'],
                categories: ['category'],
            },
            tag: '',
            category: '',
            existingTags: ['hah', 'xixi', 'haha'],
            existingCategories: [],
        }
    },
    components: {
        MdEditor,
        ItemInput,
    },
    methods: {
    },
    mounted() {
    }
}
</script>


<style scoped lang="less">
.edit-page {
    display: flex;
    flex-direction: column;
    margin: 40px;

    .edit-info {
        display: flex;
        flex-direction: row;
        // align-items: center;
        width: 95%;
        border: 1px solid grey;
        border-radius: 20px;
        padding: 20px;
        margin: 20px auto;

        .edit-info-left {
            padding: 0 20px 0 0;
            width: 50%;

            .tag-category {
                display: flex;
                flex-direction: row;

                .half {
                    width: 50%;
                }

                .pd {
                    padding-right: 10px;
                }
            }
        }

        .edit-info-right {
            width: 50%;
        }
    }

    .editor {
        width: 95%;
        align-self: center;
        margin: 20px auto;
    }
}

.submit {
    width: 95%;
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: end;
    // margin-right: 40px;
}
</style>