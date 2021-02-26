<template>
    <Modal>
        <template v-slot:header>
            <h2>
                Create new board
                <a href="" class="modal-default-button" @click.prevent="close">
                    &times;
                </a>
            </h2>
        </template>
        <template v-slot:body>
            <form id="add-board-form" @submit.prevent="addBoard">
                <input
                    class="form-control"
                    type="text"
                    v-model="input"
                    ref="input"
                />
            </form>
        </template>
        <template v-slot:footer>
            <button
                class="btn"
                :class="{ 'btn-success': valid }"
                type="submit"
                form="add-board-form"
                :disabled="!valid"
            >
                Create Board
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
export default {
    components: {
        Modal,
    },
    data() {
        return {
            input: '',
            valid: false,
        };
    },
    watch: {
        input(v) {
            this.valid = v.trim().length > 0;
        },
    },
    mounted() {
        this.$refs.input.focus();
    },
    methods: {
        close() {
            this.$emit('close');
        },
        addBoard() {
            this.$emit('close');
            this.$emit('submit', this.input);
        },
    },
};
</script>

<style></style>
