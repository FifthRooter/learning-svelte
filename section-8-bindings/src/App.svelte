<script>
    import CustomInput from './CustomInput.svelte'
    import Toggle from './Toggle.svelte'
    import {isValidEmail} from './validation'

    let val = 'Mac'
    let selectedOption = 1
    let price = 0
    let agreed
    let favColor = 'blue'
    let singleFavColor = 'red'
    let usernameInput
    let someDiv
    let customInput
    let enteredEmail = ''
    let formIsValid = false

    $: console.log(selectedOption);
    $: console.log(val);
    $: console.log(price);
    $: console.log(agreed);
    $: console.log(favColor);
    $: console.log(singleFavColor);
    $: console.log(customInput);

    $: if (isValidEmail(enteredEmail)) {
        formIsValid = true
    } else {
        formIsValid = false
    }

    function saveData() {
        console.log(usernameInput.value);
        console.log(someDiv);
    }
</script>

<style>
    .invalid {
        border: 1px solid red; 
    }
</style>

<CustomInput bind:val={val} bind:this={customInput} ></CustomInput>

<Toggle bind:chosenOption={selectedOption}/>

<input type='number' bind:value={price}/>


<label>
    <input type='checkbox' bind:checked={agreed}/>
    Agree to terms
</label>

<h1>Favorite color?</h1>
<label>
    <input type='radio' name='color' value='red' bind:group={favColor}>
    Red
</label>
<label>
    <input type='radio' name='color' value='green' bind:group={favColor}/>
    Green
</label>
<label>
    <input type='radio' name='color' value='blue' bind:group={favColor} />
    Blue
</label>

<select bind:value={singleFavColor}>
    <option value='green'>Green</option>
    <option value='red'>Red</option>
    <option value='blue'>Blue</option>
</select>

<hr>

<input type='text' bind:this={usernameInput}>
<button on:click={saveData}>Save</button>

<div bind:this={someDiv} />

<hr>

<form on:submit|preventDefault>
    <input type='email' bind:value={enteredEmail} class={isValidEmail(enteredEmail) ? '' : 'invalid'} >
    <button type='submit' disabled={!formIsValid} >Save</button>
</form>