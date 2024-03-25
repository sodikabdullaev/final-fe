<template v-if="store.isVisible">
    <form >
        <label for="comment">Add a comment:</label>
        <input id="comment"  required>
    </form>
</template>

<script>

import { store } from '../views/Edit.vue';

</script>