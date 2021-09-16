
<script>
    import {tick} from 'svelte'
    import Product from './Product.svelte'
    import Modal from './Modal.svelte'

    let showModal = false
    let closeable = false

    let text = 'This is dummy text'

    let products = [
        {
            id: 'p1',
            title: 'A book',
            price: 9.99
        }]

    function addToCart(e) {
        console.log(e);
    }

    function deleteProduct(e) {
        console.log(e);
    }

    function transform(e) {
        if (e.which !==9) { //which key was pressed
            return
        }
        e.preventDefault()

        const selectionStart = e.target.selectionStart
        const selectionEnd = e.target.selectionEnd
        const value = e.target.value

        text = value.slice(0, selectionStart) + value.slice(selectionStart, selectionEnd).toUpperCase() + value.slice(selectionEnd)

        tick().then(() => {
            e.target.selectionStart = selectionStart
            e.target.selectionEnd = selectionEnd    
        }) // This will work
        
        // This will not work
        e.target.selectionStart = selectionStart
        e.target.selectionEnd = selectionEnd
    }
</script>

{#each products as product}
<Product 
    {...product}
    on:add-to-cart={addToCart}
    on:delete={deleteProduct}
    />
{/each}

<button on:click={() => showModal = true}>Show Modal</button>

{#if showModal}
<Modal
    on:cancel={() => (showModal=false)}
    on:close={() => (showModal=false)}
    let:didAgree={closeable}
    >
    <h1 slot='header'>Hello!</h1>
    <p>This works!</p>
    <button on:click={() => showModal=false} slot='footer' disabled={!closeable}>Submit</button>
</Modal> 
{/if}

<textarea rows='5' value={text} on:keydown={transform}></textarea>

