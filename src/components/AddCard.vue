<template>
    <div class="add-card">
        <form @submit.prevent="onSubmit">
            <input
                class="form-control"
                type="text"
                ref="inputText"
                v-model="inputTitle"
            />
            <button
                class="btn btn-success"
                type="submit"
                :disabled="invalidInput"
            >
                Add Card
            </button>
            <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">
                &times;
            </a>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                inputTitle: '',
            };
        },
        props: ['listId'],
        computed: {
            invalidInput() {
                return !this.inputTitle.trim();
            },
        },
        mounted() {
            this.$refs.inputText.focus();
            this.setupClickOutside();
        },
        beforeDestroy() {
            document
                .querySelector('body')
                .removeEventListener('click', this.eventFn);
        },
        methods: {
            ...mapActions(['ADD_CARD']),
            onSubmit() {
                if (this.invalidInput) {
                    return;
                }
                const { inputTitle, listId } = this;
                const pos = this.newCardPos();
                this.ADD_CARD({ title: inputTitle, listId, pos }).finally(
                    () => {
                        this.inputTitle = '';
                    },
                );
            },
            newCardPos() {
                const curList = this.$store.state.board.lists.filter(
                    l => l.id === this.listId,
                )[0];

                if (!curList) {
                    return 65535;
                }

                const { cards } = curList;

                if (!cards.length) {
                    return 65535;
                }

                return cards[cards.length - 1].pos * 2;
            },
            setupClickOutside() {
                document
                    .querySelector('body')
                    .addEventListener('click', this.eventFn);
            },
            eventFn(e) {
                console.log(this.$el.contains(e.target));
                if (this.$el.contains(e.target)) return;
                this.$emit('close');
            },
        },
    };
</script>

<style>
    .add-card {
        padding: 10px;
        display: block;
        position: relative;
    }
    .add-card .cancel-add-btn {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        text-decoration: none;
        color: #888;
        font-size: 24px;
    }
    .add-card .cancel-add-btn:hover,
    .add-card .cancel-add-btn:focus {
        color: #666;
    }
</style>
