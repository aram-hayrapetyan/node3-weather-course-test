const weather_form = document.querySelector('form')
const input = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')
const message_3 = document.querySelector('#message-3')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value

    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    message_3.innerHTML = ''

    fetch('/weather?address='+location).then(response => {
        response.json().then(data => {
            if (data.error){
                message_1.textContent = data.error
            } else {
                console.log(data)
                message_1.textContent = data.location
                message_2.textContent = data.address
                message_3.innerHTML = data.message
            }
        })
    });    
})
