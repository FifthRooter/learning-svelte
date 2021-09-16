<script>
  let password = ''
  let passwordList = []

  function savePassword() {
    passwordList = [...passwordList, {
      id: Math.random(),
      password
    }]
    console.log(JSON.stringify(passwordList));
  }

  function deletePassword(id) {
    // passwordList.forEach((el, index) => {
    //   if (el.id == id) {
    //     passwordList.splice(index, 1)
    //   }
    // })
    passwordList = passwordList.filter(passObj => passObj.id != id)
  }

</script>

<div>
  <input type='text' bind:value={password}/>
  <button on:click={savePassword}>Save password</button>
  {#if password.length<5}
  <p>Password too short!</p>
  {:else if password.length>10}
  <p>Password too long!</p>
  {:else}
  <p>Password: {password}</p>
  {/if}
</div>
<div>
  <ul>
    {#each passwordList as psw, i (psw.id)}
    <li on:click={()=>{deletePassword(psw.id)}}>{psw.password}</li>
    {/each}
  </ul>
</div>