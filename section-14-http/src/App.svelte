<script>
    let hobbies = []
    let hobbyInput
    let isLoading = false

    fetch('https://svelte-course-917a0-default-rtdb.europe-west1.firebasedatabase.app/hobbies.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed!')
            }
            return res.json()
        })
        .then(data => {
            hobbies = Object.values(data)
            keys = Object.keys(data)
            console.log(keys);
        })
        .catch(err => {
            console.log(err);
        })

    function addHobby() {
        hobbies = [...hobbies, hobbyInput.value]

        isLoading = true

        fetch('https://svelte-course-917a0-default-rtdb.europe-west1.firebasedatabase.app/hobbies.json', {
            method: 'POST',
            body: JSON.stringify(hobbyInput.value),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            isLoading = false
            if (!res.ok) {
                throw new Error('Failed!')
            }
        }).catch(err => {
            console.log(err);
            isLoading = false
        })
    }
</script>

<label for='hobby'>Hobby</label>
<input type='text' bind:this={hobbyInput}>
<button on:click={addHobby}>Add hobby</button>

{#if isLoading}
    <p>Loading...</p>
{:else}
    <ul>
        {#each hobbies as hobby}
            <li>{hobby}</li>
        {/each}
    </ul>
{/if}


