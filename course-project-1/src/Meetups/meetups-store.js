import { writable } from 'svelte/store'

const meetups = writable(
    [
        {
            id: 'm1',
            title: 'Coding bootcamp',
            subtitle: 'Learn to code in 2min',
            description: 'Learn to code rapidly without any effort!',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ada_lovelace.jpg/330px-Ada_lovelace.jpg',
            address: '76th street, 29994, WA, USA',
            contactEmail: 'code@test.com',
            isFavorite: false
        },
        {
            id: 'm2',
            title: 'Swimming bootcamp',
            subtitle: 'Learn to swim by doing!',
            description: 'Swimming in the middle of the ocean',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Natacio.jpg/330px-Natacio.jpg',
            address: 'Buckstreet, 9291, New York',
            contactEmail: 'swim@test.com',
            isFavorite: false
        }
    ]
)

const customMeetupStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false
        }
        meetups.update(items => {
            return [newMeetup, ...items]
        })
    },
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id)
            const updatedMeetup =  {...items[meetupIndex], ...meetupData}
            const updatedMeetups = [...items]
            updatedMeetups[meetupIndex] = updatedMeetup
            return updatedMeetups
        })
    },
    deleteMeetup:  (id) => {
        meetups.update(items => {
            return items.filter(i => i.id !== id)
        })
    },
    toggleFavorite: (id) => {
        meetups.update(items => {
            const updatedMeetup = {...items.find(m => m.id === id)}
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite
            const meetupIndex = items.findIndex(m => m.id === id)
            const updatedMeetups = [...items]
            updatedMeetups[meetupIndex] = updatedMeetup
            return updatedMeetups
        })
    }
}

export default customMeetupStore

