<script>
    import {createEventDispatcher} from 'svelte'

    export let title
    export let price
    export let bestseller = false

    const dispatch = createEventDispatcher()

    function addToCart() {
        dispatch('add-to-cart', {id: 'p1'})
    }

</script>

<article>
    <h1>{title}</h1>
    <h2>${price}</h2>
    {#if bestseller}
    <p>BESTSELLER</p>
    {/if}
    <button on:click={addToCart}>Add to cart</button>
    <button on:click={() => dispatch('delete', 'p1')}>Delete</button>
</article>