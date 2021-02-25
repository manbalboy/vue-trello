<template>
    <div>
        Home
        <div>
            Board List :
            <div v-if="isLoading">Loading ....</div>
            <div v-else>
                <div v-for="b in boards" :key="b.id">
                    {{ b }}
                </div>
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
import { board } from '@/api/index.js';
export default {
    data() {
        return {
            isLoading: true,
            boards: '',
            err: '',
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.isLoading = true;

            board
                .fetch()
                .then(response => {
                    this.boards = response;
                })
                .finally(_ => {
                    this.isLoading = false;
                });

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
        },
    },
};
</script>

<style></style>
