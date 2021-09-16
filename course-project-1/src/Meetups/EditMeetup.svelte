<script>
    import meetups from './meetups-store'
    import {createEventDispatcher} from 'svelte'
    import emailValidator from 'email-validator'

    import Modal from '../Components/Modal.svelte'
    import TextInput from '../Components/TextInput.svelte'
    import Button from '../Components/Button.svelte'
    import {isEmpty} from '../helpers/validation'

    export let id = null

    let title = ''
    let subtitle = ''
    let email = ''
    let imageUrl = ''
    let description = ''
    let address = ''

    if (id) {
        const unsubscribe = meetups.subscribe(items => {
            const selectedMeetup = items.find(i => i.id === id)
            title = selectedMeetup.title
            subtitle = selectedMeetup.subtitle
            address = selectedMeetup.address
            email = selectedMeetup.contactEmail
            description = selectedMeetup.description
            imageUrl = selectedMeetup.imageUrl
        })
        unsubscribe()
    }

    let formIsValid = false

    const dispatch = createEventDispatcher()

    $: titleValid = !isEmpty(title)
    $: subtitleValid = !isEmpty(subtitle)
    $: addressValid = !isEmpty(address)
    $: emailValid = emailValidator.validate(email)
    $: imageUrlValid = !isEmpty(imageUrl)
    $: descriptionValid = !isEmpty(description)
    $: formIsValid = titleValid && subtitleValid && addressValid && emailValid && imageUrlValid && descriptionValid

    function submitForm() {
        const meetupData = {
            title: title,
            subtitle: subtitle,
            imageUrl: imageUrl,
            description: description,
            contactEmail: email,
            address: address
        }
        if (id) {
            meetups.updateMeetup(id, meetupData)
        } else {
            meetups.addMeetup(meetupData)
        }
        dispatch("save")
    }

    function cancel() {
        dispatch('cancel')
    }

    function deleteMeetup(e) {
        meetups.deleteMeetup(id)
        dispatch('save')
    }
</script>

<style>
    form {
        width: 100%;
    }
</style>

<Modal title='Edit Meetup Data' on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
            id='title' 
            label='Title' 
            valid={titleValid}
            validityMessage='Please enter a valid title'
            value={title} 
            on:input={e => (title = e.target.value)}/>
        <TextInput 
            id='subtitle' 
            label='Subtitle' 
            valid={subtitleValid}
            validityMessage='Please enter a valid subtitle'
            value={subtitle} 
            on:input={e => (subtitle = e.target.value)}/>
        <TextInput 
            id='address' 
            label='Address' 
            valid={addressValid}
            validityMessage='Please enter a valid address'
            value={address} 
            on:input={e => (address = e.target.value)}/>
        <TextInput 
            id='imageUrl' 
            label='Image URL'
            valid={imageUrlValid}
            validityMessage='Please enter a valid image URL' 
            value={imageUrl} 
            on:input={e => (imageUrl = e.target.value)}/>
        <TextInput 
            id='email' 
            type='email' 
            label='Email' 
            valid={emailValid}
            validityMessage='Please enter a valid email'
            value={email} 
            on:input={e => (email = e.target.value)}/>
        <TextInput 
            id='description' 
            label='Description' 
            valid={descriptionValid}
            validityMessage='Please enter a description'
            controlType='textarea' 
            value={description} 
            on:input={e => (description = e.target.value)}/>
    </form>
    <div slot='footer'>
        <Button 
            type='button' 
            mode='outline' 
            on:click={cancel}>Cancel</Button>
        <Button 
            type='button' 
            on:click={submitForm}
            disabled={!formIsValid} >Save</Button>
        {#if id}
            <Button type='button' on:click={deleteMeetup} >Delete</Button>
        {/if}
    </div>
</Modal>
