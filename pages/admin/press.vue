<template>
 {{ auth }}
 <button @click="getMessage()">

 </button>
</template>
<script lang="ts">
definePageMeta({
    middleware: "require-admin"
})
import type { NuxtSocket } from 'nuxt-socket-io';
export default{
    data() {
        return {
            socket: null as unknown as NuxtSocket,
            messageRxd: null,
            auth: false,
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({
            // nuxt-socket-io opts: 
            channel: '/index', // connect to '/index'

            // socket.io-client opts:
            reconnection: false
        })
        this.socket.on("connection", (socket) => {
            socket.on("message", (data: string) => {
                const packet = JSON.parse(data)
                this.auth = true
                switch(packet.type){
                    case "AUTH":
                        this.auth = true
                }
            })
        })
    },
    methods: {
        async getMessage() {
            this.messageRxd = await this.socket.emitP('getMessage', { id: 'abc123' })
        },
    }
}
</script>