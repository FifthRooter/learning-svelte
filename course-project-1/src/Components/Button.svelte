<script>
    export let type = 'button'
    export let href = null
    export let mode = null
    export let color = null
    export let disabled = false
</script>

<style>
    button,
    a {
  font: inherit;
  border: 1px solid #cf0056;
  background: #cf0056;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  text-decoration: none;
}

button:focus {
  outline: none;
}

button:hover,
button:active,
a:hover,
a:active {
  background: #e40763;
  border-color: #e40763;
  box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
}

button:disabled,
button:disabled:hover,
button:disabled:active {
  background: #ccc;
}

.success {
  background: #01a129;
  border-color: #01a129;
}
.outline:hover,
.outline:active {
  background: #eb4b4b;
  box-shadow: none;
}
.outline:success:hover,
.outline:success:active {
  background: #27a346;
}
.outline:disabled,
.outline:disabled:hover,
.outline:disabled:active {
  background: transparent;
  color: #ccc;
}


</style>

{#if href}
<a href={href}>
  <slot/>
</a>
{:else}
<button class="{mode} {color}"  type={type} on:click {disabled} >
  <slot/>
</button>
{/if}