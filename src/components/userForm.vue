<template>

    <!-- <div class="d-flex col-12"> -->

    <v-container class="fill-height">
        <v-row class="text-center">
            <!-- Register Form -->
            <v-col align-self="center" cols="10" offset="1">

                <v-card class="pa-4" :class="{ front: cardFront, back: !cardFront }" height="400" ref="authCard">
                    <div v-if="cardVis" :class="{ front: true, vis: cardVis, invis: !cardVis }">
                        <h1 class="mb-6">Register</h1>
                        <v-form ref="register" v-model="valid" lazy-validation>
                            <v-text-field v-model="name" :counter="10" :rules="[rules.required, rules.min_name]"
                                label="Name" density="compact" required></v-text-field>

                            <v-text-field v-model="email" :rules="[rules.isEmail, rules.required]" label="E-mail"
                                density="compact" required></v-text-field>

                            <v-text-field v-model="password" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="'password'" :rules="[rules.required, rules.min_password]" label="Password"
                                required density="compact" @click:append="show_password = !show_password">
                            </v-text-field>

                            <v-btn block color="success" class="mb-3" @click="switchState()">
                                Has Account?
                            </v-btn>
                            <v-btn block color="success" class="mb-3" @click="register()">
                                Register
                            </v-btn>
                        </v-form>
                    </div>

                    <div v-if="!cardVis" :class="{ back: true, vis: !cardVis, invis: cardVis }">
                        <h1 class="mb-6">Login</h1>
                        <v-form ref="login" v-model="valid" lazy-validation>
                            <v-text-field v-model="name" :counter="10" :rules="[rules.required, rules.min_name]"
                                label="Name" density="compact" required></v-text-field>

                            <v-text-field v-model="password" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="'password'" :rules="[rules.required, rules.min_password]" label="Password"
                                required @click:append="show_password = !show_password" density="compact">
                            </v-text-field>

                            <v-btn block width="" color="success mb-3" @click="switchState()">
                                No Account Yet?
                            </v-btn>
                            <v-btn block width="" color="success mb-3" @click="Login()">
                                Login
                            </v-btn>
                        </v-form>
                    </div>
                </v-card>
            </v-col>

        </v-row>
    </v-container>

</template>

<script>

export default {
    data() {
        return {
            test: true,
            cardFront: true,
            cardVis: true,
            state: 'register',
            valid: true,
            name: '',
            email: '',
            password: '',
            show_password: false,
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
    methods: {
        async validate() {
            const { valid } = await this.$refs.register.validate()

            if (valid) alert('Form is valid')
        },
        reset() {
            this.$refs.register.reset()
        },
        resetValidation() {
            this.$refs.register.resetValidation()
        },
        async register() {

        },
        switchState() {
            setTimeout(() => {
                this.cardVis = !this.cardVis
            }, 200)
            setTimeout(() => {
                this.cardFront = !this.cardFront
            }, 0)
            // this.cardVis = !this.cardVis
            // this.cardFront = !this.cardFront
        }
        // matchHeight() {
        //     var heightString = this.$refs.infoBox.clientHeight + 'px';
        //     Vue.set(this.leftColStyles, 'height', heightString); 
        // }
    },
    mounted() {
        console.log(this.$refs.authCard)
    }
}
</script>

<style scoped>
.center {
    position: relative;
    /* width: 100%;
    margin: 20px 20px 20px 20px; */
    /* padding: 25px 0; */
    /* margin: v-bind(-cardHeight*0.5); */
}

.test {
    background-color: white;
}

.turn {
    transform: rotateY(180deg);
    transition: 0.5s;
}

/* .card-content {
    backface-visibility: hidden;
} */
.front {
    transform: rotateY(0deg);
    transition: 0.8s;
}

.back {
    transform: rotateY(180deg);
    transition: 0.8s;
}

.vis {
    visibility: visible;
    transition-delay: 0.5s;
}

.invis {
    visibility: hidden;
    transition-delay: 0.5s;
}
</style>