<template>
    <div class="comment" >
        <p>user-id:</p>
        <p>comment_id: {{ name }}</p>
        <p>Section commented on: {{ data }}</p>
        <p>comment body: {{ body }}</p>
        <p>position: {{ position.start }} to {{ position.end }}</p>
        <button class="minimise"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>
</button>
        <button class="Post">Post</button>
        <button class="close"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
        
        

    </div>
</template>

<script>


export default {
    props: ['name', 'body', 'data', 'position']
 
}

</script>