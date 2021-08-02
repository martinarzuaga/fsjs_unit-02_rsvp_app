const d = document;
const form = d.getElementById('registrar')
const input = form.querySelector('input')
const mainDiv = d.querySelector('.main')
const ul = d.getElementById('invitedList')

const div = d.createElement('div')
const filterLabel = d.createElement('label')
const filterCheckbox = d.createElement('input')

filterLabel.textContent = "Hide those who haven't responded"
filterCheckbox.type = 'checkbox'
div.appendChild(filterLabel)
div.appendChild(filterCheckbox)

mainDiv.insertBefore(div, ul)

function createLi(text) {
    const li = d.createElement('li')
    const span = d.createElement('span')
    span.textContent = text
    li.appendChild(span);
    // Create confirmed checkbox and append to li
    const label = d.createElement('label')
    label.textContent = 'Confirmed'
    const checkbox = d.createElement('input')
    checkbox.type = 'checkbox';
    label.appendChild(checkbox)
    li.appendChild(label)
    // Create edit button and append to li
    const editButton = d.createElement('button')
    editButton.textContent = 'edit';
    li.appendChild(editButton)
    // Create remove button and append to li
    const removeButton = d.createElement('button')
    removeButton.textContent = 'remove';
    li.appendChild(removeButton)
    return li;
}

form.addEventListener('submit', (e) => {
    // Prevent refresh
    e.preventDefault()
    // Create li element and append the input value
    const text = input.value
    input.value = ''
    const li = createLi(text)
    // Append li to ul
    ul.appendChild(li)
})

ul.addEventListener('change', (e) => {
    const checkbox = e.target
    const checked = checkbox.checked
    const listItem = checkbox.parentNode.parentNode

    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = ''
    }
})

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target
        const li = e.target.parentNode
        const ul = li.parentNode
        const span = li.firstElementChild

        if (button.textContent === 'remove') {
            ul.removeChild(li)
        } else if (button.textContent === 'edit') {
            button.textContent = 'save'
            const input = d.createElement('input')
            input.type = 'text'
            input.value = span.textContent
            li.insertBefore(input, span)
            li.removeChild(span)
            if (button.textContent === 'save') {
                button.type = 'submit'
                button.addEventListener('click', () =>{
                    const span = d.createElement('span')
                    span.textContent = input.value
                    li.insertBefore(span, input)
                    li.removeChild(input)
                })
            }
        }
    }
})

filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked
    const lis = ul.children

    if (isChecked) {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i]
            if (li.className === 'responded') {
                li.style.display = ''
            } else {
                li.style.display = 'none'
            }
        }
    } else {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i]
            li.style.display = ''
        }
    }
    
})