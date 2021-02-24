<template>
    <div>
        <h1>APP</h1>
        <NaviBar></NaviBar>
        <router-view></router-view>
    </div>
</template>

<script>
import NaviBar from '@/components/NaviBar.vue';
export default {
    data() {
        return {};
    },

    components: { NaviBar },
};
</script>

<style></style>
