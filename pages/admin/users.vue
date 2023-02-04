<template>
    <div class="w-full h-full">
        <div v-if="pending"> Loading ... </div>
        <table class="border border-collapse border-spacing-x-4 border-slate-800" v-else>
            <thead>
                <tr class="bg-black text-slate-300">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-slate-300 odd:bg-slate-800 even:bg-slate-900" v-for="user in users">
                    <td>
                        {{ (user as any).id }}
                    </td>
                    <td>
                        {{ (user as any).username }}
                    </td > 
                    <td>
                        {{ (user as any).createdAt }}
                    </td>
                    <td>
                        {{ (user as any).updatedAt }}
                    </td>
                    <button class="p-4" @click="confirmDelete((user as any))">
                        Delete
                    </button>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
const {pending, data: users, refresh} = await useAuthFetch('/api/user/get-all-users')
definePageMeta({
    middleware: 'require-admin'
})
async function confirmDelete(user: any) {
    const yes = confirm("Are you sure you wan't to delete user: " + user.username)
    if (yes){
        await useAuthFetch('/api/user/delete-user', {
            method: "POST",
            body: user.id
        })
        await refresh()
    }
}
</script>
<style>
table, th, td {
    border: 1px solid rgb(30 41 59)
}
td {
    padding: 1rem 1rem 1rem 1rem;
}
</style>