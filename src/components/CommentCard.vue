<template>

<div class="flex justify-center relative top-1/3 comment">

<!-- This is an example component -->
<div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-64">
    <div class="relative flex gap-4">
        <li>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy">
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{{author}}</p>
                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
            </div>
            <p class="text-gray-400 text-sm">{{ created_at }}</p>
        </div>
    </li>
    </div>
    <p class="-mt-4 text-gray-500">{{content}}</p>
</div>



</div>
        
        

   
</template>

<script>


export default {
    props: [ 'content','position', 'created_at', 'author']
 
}

</script>