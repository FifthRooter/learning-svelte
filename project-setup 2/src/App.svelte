<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Max";
  let title = "";
  let image = "";
  let description = "";

  let formState = 'empty'
  let createdContacts = []

  function addContact() {
    if (
      name.trim().length == 0 || 
      title.trim() == 0 || 
      image.trim().length == 0 || 
      description.trim().length == 0
      ) {
        formState = 'invalid'
        return
    }
    formState = 'done'
    createdContacts = [...createdContacts, {
      id: Math.random(),
      name, 
      jobTitle: title, 
      imageUrl: image, 
      desc: description
    }
  ]
}
  $: console.log(JSON.stringify(createdContacts));

  function deleteFirst() {
    createdContacts = createdContacts.slice(1)
  }

  function deleteLast() {
    createdContacts = createdContacts.slice(0, -1)
  }

</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
</div>

<button on:click={addContact}>Add contact card</button>
<button on:click={deleteFirst}>Delete first</button>
<button on:click={deleteLast}>Delete last</button>

{#if formState=='invalid'}
<p>Invalid input</p>
{/if}

{#each createdContacts as contact, i (contact.id)}
  <h2># {i + 1}</h2>
  <ContactCard
  userName={contact.name}
  jobTitle={contact.title} 
  description={contact.desc}} 
  userImage={contact.image} />
{:else}
  <p>Please start adding contacts</p>
{/each}