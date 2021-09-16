<script>
    import MeetupItem from './MeetupItem.svelte'
    import MeetupFilter from './MeetupFilter.svelte'
    import Button from '../Components/Button.svelte'
    import {createEventDispatcher} from 'svelte'
    import {flip} from 'svelte/animate'
    import {scale} from 'svelte/transition'


    const dispatch = createEventDispatcher();

    export let meetups

    let favsOnly = false

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups

    function setFilter(e) {
      favsOnly = e.detail === 1
    }
</script>

<style>
    #meetups {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between≈;
  }

@media (min-width: 768px) {
  #meetups {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>

<section id='meetup-controls'>
  <Button on:click={() => {dispatch('add')}}>New Meetup </Button>
  <MeetupFilter on:select={setFilter} />
</section>
<section id='meetups'>
    {#each filteredMeetups as meetup (meetup.id)}
    <div animate:flip transition:scale>
      <MeetupItem 
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      address={meetup.address}
      email={meetup.email}
      isFav={meetup.isFavorite}
      on:showdetails
      on:edit
      />
    </div>
    {/each}
</section>