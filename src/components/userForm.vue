<template>
    <div class="outer-wrap">
        <transition name="login">
            <div class="form login" v-if="state === 'login'" id="login">
                <h1 class="title"> Login </h1>
                <v-form ref="login" v-model="valid" lazy-validation>
                    <v-text-field v-model="username" :counter="10" :rules="[rules.required, rules.min_name]"
                        label="Username" density="compact" required class="text-field"></v-text-field>

                    <v-text-field v-model="password" :append-inner-icon="show_password ? '$mdi_eye' : '$mdi_eye_off'"
                        :type="show_password ? 'text' : 'password'" :rules="[rules.required, rules.min_password]"
                        class="text-field" label="Password" required @click:append-inner="show_password = !show_password"
                        density="compact">
                    </v-text-field>

                    <div class="tag"> <a href="#">Forgot Password?</a> </div>

                    <button class="button-user" @click.prevent="login"> Sign in</button>
                </v-form>
            </div>
        </transition>


        <transition name="switch-login">
            <div class="switch-page" id="switch-login" v-if="state === 'login'">
                <h1 class="title">No Account Yet?</h1>
                <h2 class="title">Let's register! <span class="mdi mdi-emoticon-kiss-outline"></span></h2>
                <button class="button-user" @click="switchState"> Sign up</button>
            </div>
        </transition>

        <transition name="switch-register">
            <div class="switch-page" id="switch-register" v-if="state === 'register'">
                <h1 class="title">Has an Account?</h1>
                <h2 class="title"> Just Login! <span class="mdi mdi-rocket-launch-outline"></span></h2>
                <button class="button-user" @click="switchState"> Sign in </button>
            </div>
        </transition>

        <transition name="register">
            <div class="form register" v-if="state === 'register'" id="register">
                <h1 class="title">Register</h1>
                <v-form ref="register" v-model="valid" lazy-validation>
                    <v-text-field v-model="username" :counter="10" :rules="[rules.required, rules.min_name]"
                        label="Username" density="compact" required class="text-field"></v-text-field>

                    <v-text-field v-model="password" :append-inner-icon="show_password ? '$mdi_eye' : '$mdi_eye_off'"
                        :type="show_password ? 'text' : 'password'" class="text-field"
                        :rules="[rules.required, rules.min_password]" label="Password" required density="compact"
                        @click:append-inner="show_password = !show_password">
                    </v-text-field>

                    <v-text-field v-model="email" :rules="[rules.isEmail, rules.required]" label="E-mail" density="compact"
                        required class="text-field"></v-text-field>


                    <div class="tag"> <a href="#">Get Verification</a> </div>
                    <button class="button-user" @click.prevent="register"> Sign up </button>
                </v-form>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'

import { useToast } from "vue-toastification";
const appUrl = import.meta.env.VITE_APP_URL
export default {
    data() {
        return {
            toast: useToast(),
            state: 'login', // register for 0 and login for 1
            valid: true,
            username: '',
            email: '',
            password: '',
            show_password: false,
            msg_success: '',
            msg_failure: '',
            show_alert: true,
            rules: {
                required: v => !!v || 'Required',
                min_password: v => v.length >= 8 || 'Min 8 characters',
                min_name: v => v.length >= 4 || 'Min 4 characters',
                max_name: v => v.length <= 10 || 'Max 10 characters',
                isEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            },
        }

    },
    computed: {

    },
    watch: {
        
    },
    methods: {
        async validate() {
            const { valid } = await this.$refs[this.state].validate()

            if (valid) alert('Form is valid')
        },

        switchState() {
            this.state = this.state == 'register' ? 'login' : 'register';
        },

        async register() {
            const { valid } = await this.$refs[this.state].validate()
            if (!valid) {
                return;
            }

            const authData = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            try {
                await axios.post(`${appUrl}admin/register`, authData)
                    .then(res => {
                        console.log(res)
                        if(res.status === 200) {
                            this.toast.success("Successfully registered!")
                        }
                    })
                    .catch(e => {
                        this.toast.error('The username has been used!')
                    })
                // window.location.href = '/admin/writeArticle'
            }
            catch (e) {
                console.log(e.message)
            }
        },
        async login() {
            const { valid } = await this.$refs[this.state].validate()
            if (!valid) {
                return;
            }

            const authData = {
                username: this.username,
                password: this.password
            }
            try {
                await axios.post(`${appUrl}admin/login`, authData)
                    .then(res => {
                        console.log(res)
                        if(res.status === 200) {
                            // this.msg_success = 'Welcome back!'
                            this.toast.success("Welcome back!")
                            if(res.data.redirect_code) {
                                console.log(res.data.redirect_code)
                                // this.$router.push('/admin/writeArticle')
                            }
                        }
                    })
                    .catch(e => this.toast.error('The password and username do not match!'))
            }
            catch (e) {
                console.log(e.message)
            }
        }
    },
    mounted() {
        // console.log(this.$router)
    },
    components: {

    }
}
</script>

<style scoped lang="less">
.outer-wrap {
    width: 750px;
    max-width: 100%;
    min-height: 450px;
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    overflow: hidden;
    position: relative;

    .button-user {
        border-radius: 30px;
        width: 30%;

        border: 2px solid;
        font-weight: bolder;
        transition: all 0.2s;
    }

    .button-user:hover {
        transform: scale(1.1);
        transition: all 0.2s;
    }

    .form {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(167, 241, 188, 0.2);
        position: absolute;
        height: 100%;

        .tag {
            margin-bottom: 15px;
            font-family: Georgia;

            a {
                color: black;
            }
        }
    }

    #login {
        left: 0;
    }

    #register {
        left: 50%;
    }

    .switch-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        align-items: center;
        position: absolute;
        height: 100%;
        // background-color: rgba(244, 144, 62, 0.4);
    }

    #switch-login {
        background-color: rgba(244, 144, 62, 0.4);
        left: 50%;
    }

    #switch-register {
        background-color: rgba(231, 112, 13, 0.5);
        left: 0;
    }

    .text-field {
        width: 90%;
        margin: auto;
    }

    .title {
        font-family: 'Brush Script MT', cursive;

        padding: 30px;
    }
}



.login-enter-active,
.login-leave-active,
.register-enter-active,
.register-leave-active,
.switch-login-enter-active,
.switch-login-leave-active,
.switch-register-enter-active,
.switch-register-leave-active {
    transition: all 0.8s ease;
}

.login-enter-from,
.login-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

.register-enter-from,
.register-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}


.switch-login-enter-from,
.switch-login-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    // left: 0;
}

.switch-register-enter-from,
.switch-register-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>