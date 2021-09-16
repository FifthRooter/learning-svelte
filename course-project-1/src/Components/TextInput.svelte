<script>
    export let controlType = null
    export let id
    export let label
    export let rows = null
    export let value
    export let valid = true
    export let validityMessage = ''

    let touched = false
</script>

<style>
    .invalid {
        border-color: red;
        background: rgb(255, 207, 207);
    }
    
    .error-message {
        color: red;
        margin: 0.25rem o;
    }
</style>

<div class="form-control">
    <label for={id}>{label}</label>
{#if controlType === 'textarea'}
    <textarea class:invalid={!valid && touched} rows={rows} id={id} value={value} on:input on:blur={() => touched = true} ></textarea>
{:else}
    <input class:invalid={!valid && touched} type='text' id='title' value={value} on:input on:blur={() => touched = true} />
{/if}

{#if validityMessage && !valid && touched}
    <p class='error-message'>{validityMessage}</p>
{/if}
</div>

