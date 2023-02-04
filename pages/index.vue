<template>
    <a href="#PapaKaas" class="absolute z-10 px-4 py-2 bg-green-400 border rounded see h-max hover:-translate-x-1/2 hover:-translate-y-1/2 hover:scale-110 hover:bg-green-500 ">
        <span class="text-4xl text-center text-black no-underline hover:no-underline">
            Zie meer
        </span>
    </a>
    <div class="landing">
        <img src="~/assets/images/landingpage.jpg" alt="temp" class="block object-contain w-full h-full" height="90vh" width="100vw"/>
    </div>
    <article>
        <h1 class="mt-16 text-5xl text-center scroll-smooth" id="PapaKaas">
            Papa Kaas
        </h1>
        <ContentDoc v-slot="{ doc }">
            <ContentRenderer class="mx-8 my-16 doc lg:mx-64 md:mx-32 sm:mx-16" :value="doc" />
        </ContentDoc>

    </article>
</template>
<style>
.see {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.landing {
    height: 90vh;
}
*{
    scroll-behavior: smooth;
}
.doc p {
    margin-top: 2rem /* 32px */ ;
    margin-bottom: 2rem /* 32px */ ;
}
</style>