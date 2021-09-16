<script>
	import ContactCard from './ContactCard.svelte'
	let name = 'Toms'
	let age = 30
	let jobTitle = 'creator'
	let description = "description"
	let userImage = ""

	$: uppercaseName = name.toUpperCase()
	$: console.log(name);
	$: if (name=='Kenneth') {age=0}

	function incrementAge() {
		age++
	}

	function changeName() {
		name = "Kenneth"
	}

	// function nameInput(e) {
	// 	const enteredValue = e.target.value
	// 	name = enteredValue
	// } can use bind function to create a concise bidirectional data flow
</script>

<style>
	h1 {
		color: rgb(116, 10, 54);
	}
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change age</button>
<!-- <button on:click={changeName}>Change name</button> -->
<input type="text" bind:value={name}>
<input type="text" bind:value={jobTitle}>
<input type="text" bind:value={description}>
<input type="text" bind:value={userImage}>

<ContactCard
	userName={name} 
	userJobTitle={jobTitle} 
	userDescription={description} 
	{userImage} />