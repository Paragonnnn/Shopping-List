import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref,push, onValue,remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shopping-list-07-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

console.log(app);
console.log(database);

const inputField = document.querySelector('.inputField')
const btn = document.querySelector('.btn')
const listParent = document.querySelector('.listParent')


btn.addEventListener('click', () => {
    if (inputField.value.trim() !== '') {
        let inputValue = inputField.value.trim()
        push(shoppingListInDB, inputValue)
        alert(`${inputValue} pushed to database`)
        inputField.value = ""
        
    } else {
        alert('please input a valid word')
    }
})
onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        listParent.innerHTML = ''
        console.log(itemsArray);
        for (let i = 0; i < itemsArray.length; i++) {
            const item = itemsArray[i];
            const itemsId = item[0]
            const itemsValue = item[1]
            let newElement = document.createElement('li')
            newElement.innerText = itemsValue
            listParent.appendChild(newElement)     
            newElement.addEventListener('dblclick', () => {
                console.log(itemsId);
                let exactLocationOfItemInDB = ref(database, `shoppingList/${itemsId}`)
                remove(exactLocationOfItemInDB)
            })   
        }
        
    } else {
        listParent.innerHTML = 'no items yet'
    }
    
})
