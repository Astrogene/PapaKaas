<template>
    <div class="flex flex-col h-full">
        <MainHeader></MainHeader>
        <main class="main bg-slate-600" >
            <slot>
            </slot>
        </main>
    </div>
</template>
<style>
.navbar-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.navbar-nav li {
    display: inline;
    list-style: none;
    border-radius: 0.25rem;
}
.header {
    flex: 0 1 auto;
}
.main {
    flex: 1 1 auto;
}
.main .link {
    color: rgb(0, 172, 0);
    text-decoration-line: none;
    transition: all 200ms ease-in-out;
}
.main .link:hover {
    text-decoration-line: underline;
    color: rgb(0, 97, 0);
}
</style>
