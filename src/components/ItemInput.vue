<template>
    <div class="item-wrapper">
        <v-text-field :value="modelValue" :label="label" density="compact" @keydown.enter.native="addItem(modelValue)"
            @input.native="inputItem" append-inner-icon="$scroll_arrow_down" :focused="focused"
            @click:appendInner="this.showDropdown = true" variant="underlined">
        </v-text-field>
        <div class="added-items">
            <span v-for="(item, index) in inHasChosen" :key="item" class="item">
                {{ item }}
                <ion-icon name="close-outline" id="remove-item" @click="removeItem(index)"></ion-icon>
            </span>
        </div>
        <transition name="scroll-y-transition">
            <v-card v-show="showDropdown" class="dropdown" ref="dropdown">
                <span class="mdi mdi-chevron-up scroll-up" @click="this.showDropdown = false"></span>
                <hr>
                <span v-if="couldChoose.length == 0"> Empty </span>
                <span v-else v-for="item in couldChoose" @click="addItem(item)" class="item"> {{ item }}</span>
            </v-card>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'itemInput',
    props: {
        modelValue: String,
        existingChoices: Array,
        hasChosen: Array,
        label: {
            type: String,
            default: 'label'
        }
    },
    data() {
        return {
            showDropdown: false,
            focused: false,
            inHasChosen: this.hasChosen,
        }
    },

    computed: {
        couldChoose() {
            return this.existingChoices.filter((choice) => {return this.inHasChosen.indexOf(choice) == -1})
        }
    },

    methods: {
        inputItem(e) {
            this.$emit('update:modelValue', e.target.value)
        },
        addItem(item) {
            if (item.trim() != '' && !this.inHasChosen.includes(item)) {
                this.inHasChosen.push(item);
            }
        },
        removeItem(index) {
            this.inHasChosen.splice(index, 1)
        },
    },
    watch: {},
    mounted() {
        document.addEventListener("click", (e) => {
            let region = this.$refs.dropdown.$el;
            // console.log(this.$refs.dropdown.$el, e.target)
            // console.log(region.contains(e.target))
            if (!region.contains(e.target)) {
                this.showDropdown = false;
            }
        }, true)
        // console.log(this.couldChoose)
    }
}
</script>

<style lang="less" scoped>
.item-wrapper {
    display: flex;
    flex-direction: column;



    .added-items {

        max-width: 100%;
        margin-top: -20px;
        margin-left: 0;
        display: flex;
        flex-wrap: wrap;


        #remove-item {
            cursor: pointer;
            width: 15px;
            height: 15px;
            transform: translateY(2px);

        }
    }

    .dropdown {
        position: absolute;
        align-self: flex-end;
        width: 150px;
        display: flex;
        flex-direction: column;
        // background-color: #e5ece6;
        // transform: translateY(20px);

        .scroll-up {
            height: 20px;
            cursor: pointer;
        }
    }
}

.item {
    padding: 0 5px 0 10px;
    margin: 1px 1px 0 0;
    background-color: #F5FFED;
    border-radius: 5px;
    white-space: normal;
    cursor: pointer;
}

.dropdown-enter-from {
    width: 0px;
}

.dropdown-enter-active {
    // transition: width 1s;
}

.dropdown-enter-to {
    width: 150px;
}
</style>