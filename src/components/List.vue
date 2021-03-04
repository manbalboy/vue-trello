<template>
    <div class="list" :data-list-id="data.id" :data-list-pos="data.pos">
        <div class="list-header">
            <input
                v-if="isEditTitle"
                class="form-control input-title"
                type="text"
                ref="inputTitle"
                v-model="inputTitle"
                @blur="onBlurTitle"
                @keyup.enter="onSubmitTitle"
            />
            <div v-else class="list-header-title" @click.prevent="onClickTitle">
                {{ data.title }}
            </div>
            <a href="" class="delete-list-btn" @click.prevent="onDeleteList">
                &times;
            </a>
        </div>

        <div class="card-list" :data-list-id="data.id">
            <CardItem v-for="card in data.cards" :key="card.id" :data="card">
            </CardItem>
        </div>

        <div v-if="isAddCard">
            <AddCard :list-id="data.id" @close="isAddCard = false"></AddCard>
        </div>

        <div v-else>
            <a
                class="add-card-btn"
                href=""
                @click.prevent.stop="isAddCard = true"
            >
                &plus; Add a card..
            </a>
        </div>
    </div>
</template>

<script>
    import AddCard from '@/components/AddCard.vue';
    import CardItem from '@/components/CardItem.vue';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                isAddCard: false,
                isEditTitle: false,
                inputTitle: '',
            };
        },
        props: ['data'],
        components: {
            AddCard,
            CardItem,
        },
        methods: {
            ...mapActions(['UPDATE_LIST', 'DELETE_LIST']),
            onClickTitle() {
                this.isEditTitle = true;
                this.$nextTick(() => this.$refs.inputTitle.focus());
            },
            onBlurTitle() {
                this.isEditTitle = false;
            },
            onSubmitTitle() {
                this.isEditTitle = false;
                this.inputTitle = this.inputTitle.trim();
                if (!this.inputTitle) return;
                if (this.inputTitle === this.data.title) return;
                const id = this.data.id;
                const title = this.inputTitle;
                this.UPDATE_LIST({ id, title });
            },
            onDeleteList() {
                if (!window.confirm(`Delete ${this.data.title} list?`)) return;
                this.DELETE_LIST({ id: this.data.id });
            },
        },
        created() {
            this.inputTitle = this.data.title;
        },
    };
</script>

<style>
    .list {
        background-color: #e2e4e6;
        border-radius: 3px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        vertical-align: top;
        width: 100%;
        max-height: 100%;
    }
    .list-header {
        flex: 0 0 auto;
        height: 30px;
        padding: 10px 8px 8px;
        position: relative;
    }
    .list-header-title {
        font-size: 16px;
        font-weight: 700;
        padding-left: 8px;
        line-height: 30px;
    }
    .input-title {
        width: 90%;
    }
    .delete-list-btn {
        position: absolute;
        right: 10px;
        top: 8px;
        text-decoration: none;
        color: #aaa;
        font-size: 24px;
    }
    .card-list {
        flex: 1 1 auto;
        overflow-y: scroll;
    }
    .empty-card-item {
        height: 10px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
    }
    .add-card-btn {
        flex: 0 0 auto;
        display: block;
        padding: 8px 10px;
        color: #8c8c8c;
        text-decoration: none;
    }
    .add-card-btn:focus,
    .add-card-btn:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>
