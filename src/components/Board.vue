<template>
    <div>Board : bid = {{ bid }}</div>
</template>

<script>
export default {
    data() {
        return {
            bid: 0,
        };
    },
    created() {
        this.bid = this.$route.params.bid;
    },
};
</script>

<style></style>
