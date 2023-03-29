<template>
    <div class="edit-page">
        <h1>#{{ article.id }}</h1>
        <div class="edit-info">
            <div class="edit-info-left" ref="infoLeft">
                <v-text-field v-model="article.title" label="Title" density="compact"
                    :rules="[rules.required]"></v-text-field>
                <div class="tag-category">
                    <div class="half pd">
                        <ItemInput v-model="tag" :label="'Add Tags'" v-model:has-chosen="article.tags"
                            :existing-choices="existingTags" @keydown.enter="() => {tag = ''}">
                        </ItemInput>
                    </div>
                    <div class="half">
                        <ItemInput v-model="category" :label="'Add Category'" v-model:has-chosen="article.categories"
                            :existing-choices="existingCategories" @keydown.enter="() => category = ''">
                        </ItemInput>
                    </div>
                </div>
                <div style="margin-top: 10px;"> </div>
                <v-file-input
                    label="Upload Image Cover"
                    :rules="[rules.required]"
                    accept=".pdf,.doc,.docx"
                    @change="onFileChange"
                    density="compact"
                    prepend-inner-icon="$mdi_image"
                    prepend-icon=""
                ></v-file-input>
            </div>

            <div class="edit-info-right" ref="infoRight">
                <v-textarea bg-color="#E9F8CB" color="#9BBD86" label="Description"
                    v-model="article.description"></v-textarea>
            </div>
        </div>


        <div class="editor">
            <MdEditor :theme="'dark'" v-model="article.markdown" @html-changed="transform"
                @upload-img="handleUploadImg" />
        </div>


        <div class="submit">
            <v-btn class="me-4" @click="submit">Submit</v-btn>
            <v-btn @click="saveDraft">Save Draft</v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
import ItemInput from '../../components/ItemInput.vue';
import { useToast } from "vue-toastification";
import ErrorCode from '../../ErrorCode.cjs'
import { reactive, onMounted, ref } from 'vue';

// import cloudinary from '../../cloudinary/index.cjs'
// import {v2} from 'cloudinary';
// const cld = new Cloudinary({
//     cloud: {
//         cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
//         apiKey: import.meta.env.CLOUDINARY_KEY,
//         apiSecret: import.meta.env.CLOUDINARY_SECRET,
//     }
// })

const appUrl = import.meta.env.VITE_APP_URL
export default {
    data() {
        return {
            timeID: null,
            _id: '',
            article: reactive({
                id: null,
                title: '',
                description: '',
                
                markdown: '',
                html: '',
                
                image_cover: '',
                state: 0,
                tags: reactive([]),
                categories: reactive([]),
                state: 0,
                images: reactive([]),
                keywords: reactive([]),
            }),
            tag: '',
            category: '',
            existingTags: [],
            existingCategories: [],
            rules: {
                required: v => !!v || 'Required',
            },
            toast: useToast(),
        }
    },
    components: {
        MdEditor,
        ItemInput,
    },
    methods: {
        transform(html) {
            this.article.html = html
        },
        async handleUploadImg(files, callback) {
            let form = new FormData()
            for(let i = 0; i < files.length; i++) {
                form.append('file', files[i], files[i].name)
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios({
                method: "POST",
                url: `${appUrl}admin/uploadImage`,
                config: config,
                data: form,
                params: {
                    id: this.article.id
                }
            })
            .then(res => {
                // this.article.images = this.article.images.concat(res.data)
                const filenames = res.data
                filenames.forEach(item => {
                    this.article.images.push({
                        url: appUrl + 'admin/fetchImage/' + item + `?id=${this.article.id}`,
                        filename: item
                    })
                })
                callback(filenames.map(item => appUrl + 'admin/fetchImage/' + item + `?id=${this.article.id}`))
            })
            .catch(e => console.log(e))
        },

        async submit() {
            this.article.state = 1
            if (this.timeID) {
                clearTimeout(this.timeID)
            }
            await this.save()
        },
        async saveDraft() {
            if (this.timeID) {
                clearTimeout(this.timeID)
            }
            this.article.state = 0
            await this.save()
        },

        // save the article
        async save() {
            this.check()
            console.log(this._id)
            const data = {
                _id: this._id,
                article: this.article
            }
            const save_function = this._id.length === 0 ? axios.post : axios.put
            // console.log(save_function)
            try {
                save_function(`${appUrl}admin/writeArticle`, data)
                    .then(res => {
                        this._id = res.data._id
                    })
                    .catch(e => {
                        // console.log(e.response)
                        this.toast.error(ErrorCode[e.response.statusText])
                    })
            }
            catch (e) {
                console.log(e)
            }
        },

        async autoSave() {
            if (this.timeID) {
                clearTimeout(this.timeID)
            }
            this.timeID = setTimeout(() => {
                this.save()
            }, 10000)
        },
        check() {
            if (this.article.title.length === 0) {
                this.article.title = "untitled"
            }
        },


        async onFileChange(e) {
            const previous_file = this.file
            this.file = e.target.files[0]
            const form = new FormData()
            form.append('file', this.file, this.file.filename)

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios({
                method: "POST",
                url: `${appUrl}admin/uploadImage`,
                config: config,
                data: form,
                params: {
                    id: this.article.id
                }
            })
            .then(res => {
                // this.article.images = this.article.images.concat(res.data)
                const filename = res.data[0]
                const url = appUrl + 'admin/fetchImage/' + filename + `?id=${this.article.id}`
                this.article.image_cover = url
            })
            .catch(e => console.log(e))
        }
    },
    created() {
        console.log(this.$route.query.id)
        this.article.id = this.$route.query.id
        
        axios.get(`${appUrl}admin/articleInfo`)
            .then(res => {
                this.existingCategories = res.data.categories
                this.existingTags = res.data.tags
                axios.get(`${appUrl}admin/getArticle?id=${this.article.id}`)
                    .then(res => {
                        let article = res.data
                        const tags = [...article.tags.map(item => item.tag)]
                        const categories = [...article.categories.map(item => item.category)]
                        article.tags = tags
                        article.categories = categories
                        this._id = article._id
                        // console.log(article)
                        
                        // Object.keys(this.article).forEach(key => {
                            
                        //     this.article[key] = article[key]
                        // })
                        this.article = Object.assign({}, article)
                        // const newArticle = reactive(Object.assign({}, article))
                        // this.article = newArticle
                        // this.article.tags = reactive(article.tags)
                        
                    })
            })
    },
    mounted() {
        // console.log(import.meta.env)
    },
    watch: {
        "article.markdown": {
            handler(val, oldVal) {
                if (val.length > 0) {
                    this.autoSave()
                    // console.log(this.article)
                    // this.article.tags.push(`${val.length}`)
                }
            }
        },
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