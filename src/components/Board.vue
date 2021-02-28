<template>
    <div>
        <div class="board-wrapper">
            <div class="board">
                <div class="board-header">
                    <input
                        class="form-control"
                        v-if="isEditTitle"
                        type="text"
                        v-model="inputTitle"
                        ref="inputTitle"
                        @blur.prevent="onSubmitTitle"
                        @keyup.enter="onSubmitTitle"
                    />
                    <span
                        v-else
                        class="board-title"
                        @click.prevent="onClickTitle"
                        >{{ board.title }}</span
                    >
                    <a
                        href=""
                        class="board-header-btn show-menu"
                        @click.prevent="onShowSettings"
                    >
                        ... Show Menu
                    </a>
                </div>

                <div class="list-section-wrapper">
                    <div class="list-section">
                        <div
                            class="list-wrapper"
                            v-for="list in board.lists"
                            v-bind:key="list.pos"
                        >
                            <List :data="list"></List>
                        </div>
                        <div class="list-wrapper">
                            <AddList></AddList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BoardSettings v-if="isShowBoardSettings"></BoardSettings>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import List from '@/components/List.vue';
import dragger from '@/utils/dragger.js';
import BoardSettings from '@/components/BoardSettings.vue';

import AddList from '@/components/AddList.vue';
export default {
    data() {
        return {
            bid: 0,
            loading: false,
            cDragger: null,
            isEditTitle: false,
            inputTitle: '',
        };
    },
    computed: {
        ...mapState(['board', 'isShowBoardSettings']),
    },
    components: { List, BoardSettings, AddList },

    created() {
        this.SET_IS_SHOW_BOARD_SETTINGS(false);
        this.fetchData().then(() => {
            this.SET_THEME(this.board.bgColor);
            this.inputTitle = this.board.title;
        });
    },
    updated() {
        this.setCardDragabble();
    },

    methods: {
        ...mapActions(['FETCH_BOARD', 'UPDATE_CARD', 'UPDATE_BOARD']),
        ...mapMutations(['SET_THEME', 'SET_IS_SHOW_BOARD_SETTINGS']),
        fetchData() {
            this.loading = true;
            return this.FETCH_BOARD({ id: this.$route.params.bid }).then(() => {
                this.loading = false;
            });
        },
        onShowSettings() {
            this.SET_IS_SHOW_BOARD_SETTINGS('true');
        },
        onClickTitle() {
            this.isEditTitle = true;
            this.$nextTick(() => this.$refs.inputTitle.focus());
        },
        onSubmitTitle() {
            this.isEditTitle = false;
            if (!this.inputTitle.trim()) return;
            if (this.inputTitle === this.board.title) return;
            const payload = { id: this.board.id, title: this.inputTitle };
            this.UPDATE_BOARD(payload);
        },
        setCardDragabble() {
            if (this.cDragger) {
                this.cDragger.destroy();
            }
            const test = this.$el;
            this.cDragger = dragger.init(
                Array.from(test.querySelectorAll('.card-list')),
            );
            this.cDragger.on('drop', (el, wrapper) => {
                const targetCard = {
                    id: el.dataset.cardId * 1,
                    pos: 65335,
                };
                const { prev, next } = dragger.sibling({
                    el,
                    wrapper,
                    candidates: Array.from(
                        wrapper.querySelectorAll('.card-item'),
                    ),
                    type: 'card',
                });

                if (!prev && next) {
                    targetCard.pos = next.pos / 2;
                } else if (prev && !next) {
                    targetCard.pos = prev.pos * 2;
                } else if (prev && next) {
                    targetCard.pos = (prev.pos + next.pos) / 2;
                }
                this.UPDATE_CARD(targetCard);
            });
        },
    },
};
</script>

<style>
.board-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.board {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.board-header {
    flex: none;
    padding: 8px 4px 8px 8px;
    margin: 0;
    height: 32px;
    line-height: 32px;
}
.board-header input[type='text'] {
    width: 200px;
}
.board-header-btn {
    border-radius: 4px;
    padding: 2px 10px;
    height: 30px;
    margin-bottom: 15px;
    display: inline-block;
    color: #fff;
}

.board-header-btn:hover,
.board-header-btn:focus {
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
}

.board-title {
    font-weight: 700;
    font-size: 18px;
}

.show-menu {
    font-size: 14px;
    position: absolute;
    right: 15px;
}

.list-section-wrapper {
    flex-grow: 1;
    position: relative;
}

.list-section {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0 10px;
}

.list-wrapper {
    display: inline-block;
    height: 100%;
    width: 272px;
    vertical-align: top;
    margin-right: 5px;
}

.card-item.gu-transit {
    background-color: #555 !important;
}

.card-item.gu-mirror {
    opacity: 1 !important;
    background-color: #fff !important;
    transform: rotate(3deg) !important;
}
</style>
