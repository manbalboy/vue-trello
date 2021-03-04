<template>
    <div class="add-list">
        <input
            v-if="isAddList"
            type="text"
            class="form-control"
            ref="inputTitle"
            v-model="inputTitle"
            @blur="restore"
            @keydown.enter="onSubmitTitle"
        />
        <a v-else href="" @click.prevent="onAddList">&plus; Add antoher List</a>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        data() {
            return {
                isAddList: false,
                inputTitle: '',
            };
        },
        computed: {
            ...mapState(['board']),
        },
        methods: {
            ...mapActions(['ADD_LIST']),
            onAddList() {
                this.isAddList = true;
                this.$nextTick(() => {
                    this.$refs.inputTitle.focus();
                });
            },
            restore() {
                this.isAddList = false;
                this.inputTitle = '';
            },
            onSubmitTitle() {
                this.inputTitle = this.inputTitle.trim();
                if (!this.inputTitle) return this.restore();
                const boardId = this.board.id;
                const title = this.inputTitle;
                const lastList = this.board.lists[this.board.lists.length - 1];
                const pos = lastList ? lastList.pos * 2 : 65335;

                this.ADD_LIST({ title, boardId, pos }).then(() =>
                    this.restore(),
                );
            },
        },
    };
</script>

<style>
    .add-list {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 12px;
        transition: all 0.3s;
    }
    .add-list a {
        color: #ddd;
    }
    .add-list:hover,
    .add-list:focus {
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>
