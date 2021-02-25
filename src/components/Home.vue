<template>
    <div>
        Home
        <div>
            Board List :
            <div v-if="isLoading">Loading ....</div>
            <div v-else>
                Api result :{{ apiRes }}
                <br />
                <br />
                <div v-if="err">err : {{ err }}</div>
            </div>
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
import axios from 'axios';
export default {
    data() {
        return {
            isLoading: true,
            apiRes: '',
            err: '',
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.isLoading = true;
            // const req = new XMLHttpRequest();
            // req.open('GET', 'http://localhost:3000/health');
            // req.send();
            // req.addEventListener('load', () => {
            //     this.isLoading = false;
            //     this.apiRes = {
            //         status: req.status,
            //         statusText: req.statustText,
            //         response: JSON.parse(req.response),
            //     };
            // });

            axios
                .get('http://localhost:3000/health')
                .then(response => {
                    this.apiRes = response;
                })
                .catch(err => {
                    this.err = err;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
};
</script>

<style></style>
