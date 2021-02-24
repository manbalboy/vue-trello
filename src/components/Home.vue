<template>
    <div>
        Home
        <div>
            Board List :
            <div v-if="isLoading">Loading ....</div>
            <div v-else>Api result :{{ apiRes }}</div>
            <ul>
                <li>
                    <router-link to="/b/1">Board 1</router-link>
                </li>
                <li>
                    <router-link to="/b/1">Board 2</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            apiRes: '',
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.isLoading = true;
            const req = new XMLHttpRequest();
            req.open('GET', 'http://localhost:3000/health');
            req.send();
            req.addEventListener('load', () => {
                this.isLoading = false;
                this.apiRes = {
                    status: req.status,
                    statusText: req.statustText,
                    response: JSON.parse(req.response),
                };
            });
        },
    },
};
</script>

<style></style>
