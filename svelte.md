- # Svelte course - [Udemy](https://www.udemy.com/course/sveltejs-the-complete-guide)
    - ## Intro
        - Vue and React and frameworks, Svelte is a compiler - Svelte compiles the code written in Svelte syntax, transforms it into compact vanilla JS, and ships that to the user, instead of shipping the code and the framework like with Vue/React.
            - Svelte translates instructions into efficient runtime code at build time.
        - ### How does Svelte work?
            - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FQrdcnG8OvD.png?alt=media&token=2a96cada-5733-43a3-8225-1b0796be7c52)
    - ## Section 2: Base syntax & Core features
        - ### Reactive variables
            - As typically in JS, nobody uses the "$:" (like also "break") - a labeled statement, that are used in conjunction with loops and such. And because it's practically never used, Svelte takes advantage of this fact and hijacks the "$:".
                - It's used for dynamic calculations, where you want these calculations to be executed whenever some variable somewhere in the code changes, and re-do the calculation.
                - ```javascript
$: uppercaseName = name.toUpperCase()
$: console.log(name)
$: if (name=="Kenneth") {age=0}```
        - ### Components & Communication via Props
            - To allow for a variable of a component to be set by a parent component, inside the component's svelte file, e.g. ContactCard.svelte, export the variables.
                - ```html
<script>
  export let userName
  export let userJobTitle
  export let userDescription
  export let userImage
</script>```
            - Importing the child component in the parent component works as such:
                - ```html
<script>
  import ContactCard from './ContactCard.svelte'
</script>```
            - In the parent component, the child component together with its props is used like this:
                - ```html
<ContactCard
             userName={name}
             userJobTitle={jobTitle}
             userDescription={description}
             {userImage} // if the prop name and the variable name in the parent component have the same name, you can use this abbreviated syntax
             />
             ```
        - ### Two-way binding shortcut
            - Instead of having to write a typical input field event listener function with cumbersome markup line like this:
                - ```javascript
<input type="text" value={name} on:input={nameInput}/>```
                - And the "nameInput" function like this:
                - ```javascript
function nameInput(e) {
  const enteredValue = e.target.value
  name = enteredValue
}```
            - It's possible in Svelte to use "bind:" syntax to create a bi-directional info flow in a much more concise way, without needing a separate event listener function:
                - ```html
<input type="text" bind:value={name}/>```
        - ### Dynamic CSS classes
            - Add a conditional css class based on whether userImage contains an address or not. If not, the "thumb-placeholder" is displayed instead.
                - ```html
<div class="thumb" class:thumb-placeholder={!userImage}>```
        - ### Assignment
            - Tasks
                - Add an input field that allows users to enter a course goal.
                - Output the user input in a h1 tag.
                - Color the output red (e.g. by adding a class) if it contains at least one exclamation mark.
                - Put the h1 tag + output into a separate component to which you pass the user input.
    - ## Section 3: Working with Conditionals & Loops
        - ### Using "if", "else" & "else-if" statements in HTML
            - You can create conditional rendering in the html code by using this syntax:
                - ```jsx
{#if formState=="invalid"}
	<p>Invalid input</p>
{:else if formState=='none'}
	<p>No contacts recorded, start adding contacts</p>
{:else}
	<p>Please start adding contacts!</p>```
        - ### Outputting lists with "each"
            - Similar to the if, else, else-if conditional html rendering, it's possible to iterate through lists using each syntax to render html content:
                - ```html
{#each createdContacts as contact, i (contact.id)}
  <h2># {i + 1}</h2>
  <ContactCard
  userName={contact.name}
  jobTitle={contact.title} 
  description={contact.desc}} 
  userImage={contact.image} />
{:else}
  <p>Please start adding contacts</p>
{/each}```
        - ### Lists & keys
            - To improve performance when handling lists and removing elements, it's best to use unique identifiers for each entry in order not have svelte re-render all of the list items __after__ the item in question. If the item has a unique identifier, only that item will be removed and no other items will be touched during re-rendering.
        - ### Assignment 2
            - Add a password input field and save the user input in a variable.
            - Output "too short" if the password is shorter than 5 characters and "too long" if it's longer than 10.
            - Output the password in a paragraph tag if it's between these boundaries.
            - Add a button and let the user add the passwords to an array.
            - Output the array values (=passwords) in an unordered list (ul tag).
            - Bonus: if a password is clicked, remove it from the list.
            - Code:
                - ```html
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
</div>```
    - ## Section 4: A closer look at Reactivity
        - ### Event modifiers
            - Possible to add a very short and convenient event modifier syntax, like this:
                - ```html
<button on:click|preventDefault={savePassword}>Submit password</button>```
                - This on:click|preventDefault would prevent an automatic page reloading after clicking a button inside a form, for example. Normally this preventDefault would have to be performed in a separate manual function in the code:
                    - ```javascript
function savePassword(e) {
  e.preventDefault()
}```
                - Or, for example, can use __once__ modifier to make the button clickable only once:
                    - ```html
<button on:click|once={savePassword}>Submit password</button>```
    - ## Section 5: Course Project - first steps
    - ## Section 6: Diving deeper into Components
        - ### Event Forwarding
            - If you omit writing an event handler for an on:click etc.m then you can __forward__ the event to the parent component.
                - Instead of the on:click being handled in the Product.svelte component, it gets forwarded to the App.svelte component.
                    - In Product.svelte
                    - ```html
<button on:click > Add to Cart </button>```
                    - In the App.svelte
                    - ```javascript
<Product on:click={() => alert('Clicked')}```
                    - However, if the __on:click__ in the Product.svelte is omitted, then the even will not be forwarded.
        - ### Custom Events
            - If you have multiple buttons, then forwarding events to the parent component will not work that great, because then it'll be difficult to distinguish between which of the buttons was clicked when trying to resolve the __on:click__ events. It would be possible to do that by dissecting the __event.target__ object, but it's not really an elegant solution.
            - Instead, it's possible to create custom events by leveraging the __createEventDispatcher__ feature of Svelte.
            - ```javascript
<script>
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()
</script>```
            - __dispatch__ takes in two arguments: 1) the custom function name, and 2) any data to be passed onto the function.

__dispatch__ and its custom function can be called both inline, as well as separately in the <script> section.
            - In the Product.svelte
                - Inline dispatch:
                    - ```javascript
<button on:click={() => dispatch('delete', 'p1')}> Delete </button>```
                - function dispatch inside <script>:
                    - ```javascript
<script>
  function addToCart() {
  	dispatch('add-to-card', 'p1')
}
</script>

<button on:click={addToCart} > Add to Cart </button>```
            - In the App.svelte
                - ```javascript
<Product
	on:add-to-cart={() => alert('Added to cart!')}
    on:delete={() => alert('Deleted item!')}```
        - ### How to Extract Event Data
            - In App.svelte you can you the __each__ syntax and display all of the products items as Products components and populating its contents from the events data extracted using the spread operator to make the code more concise.
                - ```javascript
{#each products as product}
<Product 
    {...product}
    on:add-to-cart={addToCart}
    on:delete={deleteProduct}
    />
{/each}```
        - ### Working with Slots
            - By default it's not possible to add html tags into a custom component and have that formatting be rendered according to the html tag used . Only the html tags written in the component's .svelte file are rendered properly, but that's problematic, because that doesn't allow much customizability of the components content if you want to create many instances of the component and have different html tags render different things.
                - This will not work (in App.svelte):
                    - ```html
<Modal>
  <h1> Hello </h1>
  <h2> Again hello! </h2>
</Modal>```
                - This will work-ish, but will be suboptimal (in Modal.svelte):
                    - ```html
<div class='modal'>
	<h1> {h1Text} </h1>
	<h2> {h2Text} </h2>
</div>```
            - Using "slots" it's possible to solve this problem. In Modal.svelte:
                - ```html
<div class='modal'>
  <slot />
</div>```
        - ### Named & Default Slots
            - If you want several different slots inside a component in different parts, then you need to name the slots.
            - In Modal.svelte:
                - ```html
<div class="modal">
    <header>
        <slot name='header'></slot>
    </header>
    <div class='content'>
        <slot></slot>
    </div>
    <div class='disclaimer'>
        <p>Before you close, you need to agree to our terms.</p>
        <button on:click={() => agreed = true}>Agree</button>
    </div>
    <footer>
        <slot name='footer' didAgree={agreed}>
            <button on:click={() => dispatch('close')}>Close</button>
        </slot>
    </footer>
</div>```
            - In App.svelte:
                - ```html
<Modal
    on:cancel={() => (showModal=false)}
    on:close={() => (showModal=false)}
    let:didAgree={closeable}
    >
    <h1 slot='header'>Hello!</h1>
    <p>This works!</p>
    <button on:click={() => showModal=false} slot='footer' disabled={!closeable}>Submit</button>
</Modal> ```
        - ### The Component Lifecycle - Theory
            - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FX2T6Fb_P5O.png?alt=media&token=cd703885-5f47-4620-af9b-378794f5cda0)
            - It's possible to implement Lifecycle hooks in code to create more custom behavior, such as scrolling the Modal to the Close button after clicking the Agree button.
                - In Modal.svelte:
                    - ```html
<script>
    import {createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate} from 'svelte'
    const dispatch = createEventDispatcher()

    let agreed = false
    let autoscroll = false
    

    onMount(() => {
        console.log('onMount');
    })

    onDestroy(() => {
        console.log('onDestroy');
    })

    beforeUpdate(() => {
        console.log('beforeUpdate');
        autoscroll = agreed
    })

    afterUpdate(() => {
        console.log('afterUpdate');
        if (autoscroll) {
            const modal = document.querySelector('.modal')
            modal.scrollTo(0, modal.scrollHeight)
        }
    })

    console.log('Script executed');

</script>```
            - Another thing that's possible, though rarely used, is the tick() function, which executes code after a microtask has been executed. An example of the use of tick() can be if, after creating code that allows for a text area text to be selected and, after pressing Tab button, the selected text gets converted to uppercase. But in order to maintain the selection after having clicked and converted the text, it's only possible by using the tick() function.
                - In App.svelte
                    - ```html
<script>
  import { tick } from 'svelte'
  
  function transform(e) {
        if (e.which !==9) { //which key was pressed
            return
        }
        e.preventDefault()

        const selectionStart = e.target.selectionStart
        const selectionEnd = e.target.selectionEnd
        const value = e.target.value

        text = value.slice(0, selectionStart) + value.slice(selectionStart, selectionEnd).toUpperCase() + value.slice(selectionEnd)

        tick().then(() => {
            e.target.selectionStart = selectionStart
            e.target.selectionEnd = selectionEnd    
        }) // This will work
        
        // This will not work
        e.target.selectionStart = selectionStart
        e.target.selectionEnd = selectionEnd
    }
</script>

<textarea rows='5' value={text} on:keydown={transform}></textarea>```
    - ## Section 7: Course Project - Components Deep Dive
        - Continue working on the MeetUs project. Implementing learnings from the previous section, like event forwarding, custom events and slots.
    - ## Section 8: Working with Bindings & Forms
        - Two-way bindings for dynamic types is not possible.
    - ## Section 9: Course Project - Form Validation
    - ## Section 10: Managing State & Data with Stores
        - ### Creating a Writeable Store & Subscribing
            - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FV58ScUdNng.png?alt=media&token=1210a22f-de30-41c8-babe-d47442b33e52)
            - Create a store js file (__cart-store.js__):
                - ```javascript
import { writable } from "svelte/store";

const cart = writable([
    {
        id: "p1",
        title: "Test",
        price: 9.99
      },
      {
        id: "p2",
        title: "Test",
        price: 9.99
      }
])

export default cart```
            - To subscribe to a store from a component (in Cart.svelte):
                - ```javascript
import cartItems from './cart-store'

cartItems.subscribe(its => {
    items = its
    console.log(items);
  })```
        - ### Updating Store Data
            - When the button "Add to Cart" on the __Product.svelte__ component is pressed, it calls a function __addToCart__ and calls an __update()__ function from the store to add another cart item based on the data present in the Product instance. In __Product.svelte__:
                - ```javascript
import cartItems from '../Cart/cart-store'

function addToCart() {
    cartItems.update(items => {
      return [...items, 
      {
        id,
        title,
        price
      }]
    })
  }```
        - ### Managing Autosubscription
            - Instead of manually having to keep track of states and cleaning up states as components are mounted and unmounted, adding additional lines of code, it's possible to use svelte syntax inside markup to directly use the store items.
            - How it used to be:
                - ```javascript
import cartItems from './cart-store'

let items

  const unsubscribe = cartItems.subscribe(its => {
    items = its
  })

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })```
            - How it is in Svelte:
                - ```javascript
import { onDestroy } from 'svelte'
import cartItems from './cart-store'

<section>
  <h1>Cart</h1>
  <ul>
    {#each $cartItems as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>```
                - Where __$cartItems__ is a reference to the imported object __cartItems__ from the __cart-store.js__ file and is used directly inside markup.
                    - This approach is only useful when no additional data manipulation of the store data needs to be done, but only is gotten from the store and output in a component.
        - ### A Second Store!
            - Creating a product-store.js and fetching a product description in CartItem:
                - ```javascript
import { products } from '../Products/products-store'

let description = 'Not available!'

function displayDescription() {
    showDescription = !showDescription;
    const unsubscribe = products.subscribe(prods => {
      description = prods.find(p => p.id === id).description
    })
    unsubscribe()
  }```
        - ### Understanding Readable Stores
            - Whenever an autogenerated value needs to be updated and displayed on a periodic basis in a component, the __readable__ store can be used, especially if the value is not interacted with/changed by the user or any component logic, but just needs to be.... read.
            - Creating a __timer-store.js__ exposes a timer counting every second and can be accessed by components:
            - ```javascript
import { readable } from "svelte/store";

let count = 0

export const timer = readable(0, (set) => {
    const interval = setInterval(() => {
        count++
        set(count)
    }, 1000)
    
    return () => {
        clearInterval(interval)
    }
})```
        - ### Unlimited power with Custom Stores
            - It's possible, and a good idea, to move as much of the store related logic into the store itself, especially if common store manipulations or data fetchings are likely to repeat across several components (which would lead to repeating code).
            - So actions such as __addItem__ and __removeItem__ can be moved into the __cart-store.js__:
                - ```javascript
import { writable } from "svelte/store";

  const cart = writable([
    {
        id: "p3",
        title: "Test",
        price: 9.99
      },
      {
        id: "p4",
        title: "Test",
        price: 9.99
      }
])

  const customCart = {
    subscribe: cart.subscribe,
    addItem: item => {
      cart.update(items => {
        if (items.find(i => i.id === item.id)) {
          return [...items]
        }
        return [...items, item]
      })
    },
    removeItem: (id) => {
      cart.update(items => {
        return items.filter(i => i.id != id)
      })
    }
  } 

export default customCart```
            - Then from the components the methods are called like this:
                - ```javascript
import cartItems from '../Cart/cart-store'

function addToCart() {
    cartItems.addItem({
      id: id,
      title: title,
      price: price
    })
  }```
        - ### Derived Store & Store Bindings
            - You can have a store which produces values based on another store + some adjustment [logic](https://svelte.dev/tutorial/derived-stores).
            - Example:
                - ```javascript
    import { readable, derived } from 'svelte/store';
     
    export const time = readable(new Date(), function start(set) {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);
     
        return function stop() {
            clearInterval(interval);
        };
    });
     
    const start = new Date();
     
    export const elapsed = derived(
        time,
        $time => Math.round(($time - start) / 1000)
    );```
            - Store Bindings allow you to bind: to values stored in a store.
                - In __store.js__:
                - ```javascript
    import { writable, derived } from 'svelte/store';
     
    export const name = writable('world');
     
    export const greeting = derived(
        name,
        $name => `Hello ${$name}!`
    );```
            - In __App.svelte__:
                - ```html
    <script>
        import { name, greeting } from './stores.js';
    </script>
     
    <h1>{$greeting}</h1>
    <input bind:value={$name}>
     
    <button on:click="{() => $name += '!'}">
        Add exclamation mark!
    </button>```
    - ## Section 12: Animations & Transitions
        - ### Animating Values with a Tweened Store
            - Tweened allows to animate the change in a store value. So if a __progress__ variable was initially set to 0, and then after a second to 0.5, a regular store would just update the __progress__ value and then in the browser it would just show as an immediate switch between 0 and 0.5.
                - __tweened__ store
                    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FGMnjC_b0Am.gif?alt=media&token=08716c00-2326-47f5-aa48-14a31e9918c6)
                - normal store
                    - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FQAJIzkyaNS.gif?alt=media&token=19313dc4-b87f-4f99-9192-1a66a6afc28c)
                - Tweened takes in not only the value, but allows to tweak other animation parameters.
                    - ```javascript
const progress = tweened(0 {
        delay: 0,
        duration: 700,
        easing: cubicIn,
        interpolator: 
    })```
                    - __easing__ module contains a bunch of [functions](https://svelte.dev/docs#svelte_easing)
            - __tweened__ interpolates linearly, and __spring__ takes physics into account.
                - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2F4T6IA_hH-g.gif?alt=media&token=a282a9aa-95d0-408f-a167-12888e05e8af)
                - __spring__ is more real feeling, and allows for different parameters to be tweaked.
![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FhDIPF-cKfs.gif?alt=media&token=cbe60402-c6bc-4394-a109-a2589c56129a)
                    - ```javascript
const cardPos = spring([{cardobjects1}, {cardobject2}],{
                    stiffness: 0.05,
    				damping: 0.9,
    				precision: 0.001
})```
        - ### Transitions
            - [transition](https://svelte.dev/docs#svelte_transition) is to elements what __motion__ module is to values - it allows for creating transitions for divs and such.
                - __fade__ transition fades in an element when it's added:
                    - with transition
![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FDKu6cFwEAG.gif?alt=media&token=b4695d85-47b7-4db2-a70d-f339e4109f01)
                    - without transition
![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FdfJmpWnp3v.gif?alt=media&token=e59e941d-3751-480e-a52a-26929635b672)
                - __transitions__ take in parameters so they can be more fine-tuned.
                - Adding a __local__ modifier to a component prevents a parent transition from using the child transition. So when adding or removing an individual fruit element it uses __fly__ transition, without a __local__ modifier, whenever the Toggle button is clicked, those same fly transitions are also used to hide those elements:
                    - without local modifier
                        - code
                            - ```javascript
<button on:click={() => {showParagraph = !showParagraph}}>Toggle</button>
{#if showParagraph}
    <p transition:fly={{x: 300}}>Can you see me?</p>
{/if}

<hr>
<input type='text' bind:this={boxInput}>
<button on:click={addBox}>Add</button>

{#if showParagraph}
    {#each boxes as box}
        <div transition:fly={{easing: cubicIn, x: 0, y: 300}} on:click={discard.bind(this, box)}>{box}</div>
    {/each}
{/if}```
                        - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2Fqtvc26SxBD.gif?alt=media&token=798ab147-1c74-4600-8992-881824de9870)
                    - with local modifier
                        - code
                            - `<div transition:fly|local={{easing: cubicIn, x: 0, y: 300}} on:click={discard.bind(this, box)}>{box}</div>`
                        - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2FxpuKj02Q1_.gif?alt=media&token=b2687b96-35ef-4b47-9c0b-445f3cc4fe00)
            - In/Out transitions.
                - It's possible to set different transition for how the element enters the scene, and how it exits it.
                    - One drawback is that as those are two separate animations, you cannot undo them while they're in motion.
            - Additionally, it's also possible to control how the elements that __aren't__ transitioning behave when an element is transitioning. That is achieved with the help of __animate__ [directive](https://svelte.dev/tutorial/animate).
                - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Ftomsbee%2Fc9B4QrXl0w.gif?alt=media&token=c6144f88-5dbc-4982-9fe9-451bac7493be)
            - In some applications/ use-cases, you might want to play multiple animations after each other (e.g. animate an item from list A to B) - deferred transitions can help you with that.
                - Here's a great example: https://svelte.dev/tutorial/deferred-transitions
    - ## Section 14: Network Interaction via Http
        - ### 
