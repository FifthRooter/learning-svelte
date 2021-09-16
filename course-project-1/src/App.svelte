<script>
    import meetups from './Meetups/meetups-store'
    import Header from './Components/Header.svelte'
    import MeetupGrid from './Meetups/MeetupGrid.svelte'
    import EditMeetup from './Meetups/EditMeetup.svelte'
    import Button from './Components/Button.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte'


    let editMode
    let editedId
    let page = 'overview'
    let pageData = {}

    function savedMeetup(e) {
       editMode = null
       editedId = null
    }

    function toggleFavorite(e) {
        const id = e.detail
        meetups.toggleFavorite(id)
    }

    function cancelEdit() {
        editMode = null
        editedId = null
    }

    function showDetails(e) {
        page = 'details'
        pageData.id = e.detail
    }

    function closeDetail() {
        page = 'overview'
        pageData = {}
    }

    function startEdit(e) {
        editMode = 'edit'
        editedId = e.detail
        console.log('startEdit');
    }
</script>

<style>
   main {
       margin-top: 3rem;
   }

</style>

<Header/>   

<main>
    {#if page === 'overview'}
        {#if editMode === 'edit'}
            <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit}/>
        {/if}
        <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} on:add={() => editMode = 'edit'} />
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetail} />
    {/if}
</main>
