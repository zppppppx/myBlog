<!-- <template>
    <div>
        <form action="/admin" @submit.prevent="showArticle">
            <input id="title" type="text" v-model="articleInfo.title">
            <div>{{ articleInfo.title }}</div>
            <button>sumbit</button>
        </form>
    </div>
</template> -->






<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

    <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
      required></v-select>

    <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
      required></v-checkbox>

    <v-btn color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="success" class="mr-4" @click="submit">
      submit
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" @click="resetValidation">
      Reset Validation
    </v-btn>
  </v-form>
</template>



<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
    // return {
    //       articleInfo: {
    //           title: '',
    //       },
    //   }
    // articleInfo: {
    //   name,
    //   email: email,
    //   select: select,

    // }
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async submit() {
      const articleInfo = {
        name: this.name,
        email: this.email,
        select: this.select,
        checkbox: this.checkbox,
      }
      // console.log(articleInfo);
      await axios({
        method: 'post',
        url: 'http://localhost:3000/admin/writeArticle',
        data: articleInfo
      })
    }
  },

}




    // data() {
    //     return {
    //         articleInfo: {
    //             title: '',
    //         },
    //     }
    // },
    // methods: {
    //     showArticle() {
    //         console.log(this.articleInfo);
    //     },
    // },





</script>

<!-- <script>
export default defineComponent({
  name: "RegisterAndLogin",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    handleFlag: {
      type: String,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["ok", "cancel"],
  setup(props, context) {
    const store = useStore(key);
    const state = reactive({
      dialogDodel: props.visible,
      btnLoading: false,
      loading: false,
      formLabelWidth: props.isMobile ? "40px" : "60px",
      params: {
        email: "",
        name: "",
        password: "",
        phone: "",
        desc: "",
      } as RegAndLogParams,
    });
    
    watch(props, (val, oldVal) => {
      state.dialogDodel = val.visible;
    });
    return {
      state,
      handleOAuth,
      handleOk,
      submit,
      cancel,
    };
  },
});
</script> -->