<template>
    <div>
        Card
        <div v-if="isLoding">loading card...</div>
        <div v-else>cid : {{ cid }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cid: 0,
            isLoding: true,
        };
    },
    watch: {
        // $route() {
        //     this.fetchData();
        // },
        $route: {
            handler: 'fetchData',
            immediate: true,
        },
    },
    methods: {
        fetchData() {
            this.isLoding = true;
            setTimeout(() => {
                this.cid = this.$route.params.cid;
                this.isLoding = false;
            }, 500);
        },
    },
};
</script>

<style></style>
