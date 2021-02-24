<template>
    <div>
        <div v-if="isLoding">Loading Board...</div>
        <div v-else>
            <div>Board : bid = {{ bid }}</div>
            <router-link :to="`/b/${bid}/c/1`">Card1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card2</router-link>
        </div>
        <hr />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bid: 0,
            isLoding: true,
        };
    },
    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            setTimeout(() => {
                this.bid = this.$route.params.bid;
                this.isLoding = false;
            }, 500);
        },
    },
};
</script>

<style></style>
