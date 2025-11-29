const btn = document.querySelector('.sendIdeaBtn');
const errorMsg = document.createElement('p');
errorMsg.style.color = 'red';
btn.parentElement.appendChild(errorMsg);
document.getElementById('bookBtn').addEventListener('click', function () {
    const concetrs = document.getElementById('concerts')
    concetrs.scrollIntoView({ behavior: 'smooth' })
})


btn.addEventListener('click', function (e) {
    e.preventDefault();

    errorMsg.textContent = '';

    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const ideaEl = document.getElementById('idea');

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const idea = ideaEl.value.trim();


    if (name.length < 2) {
        errorMsg.textContent = 'Це поле не може бути пустим';
        return;
    }

    if (!email.includes('@')) {
        errorMsg.textContent = 'Введіть коректний email';
        return;
    }

    if (idea.split(/\s+/).length < 3) {
        errorMsg.textContent = "Повідомлення повинно містити не менше 3 слів";
        return;
    }

    errorMsg.style.color = 'green';
    errorMsg.textContent = 'Дані заповнені вірно!';


    const params = new URLSearchParams({
        name: name,
        email: email,
        idea: idea
    });

    fetch(`https://example.com/submit?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            console.log('Answer from server:', data);
            errorMsg.style.color = 'green';
            errorMsg.textContent = 'Дані відправлено !';
        })
        .catch(err => {
            console.error(err);
            errorMsg.style.color = 'red';
            errorMsg.textContent = 'Помилка при відправці даних';
        });

    nameEl.value = '';
    emailEl.value = '';
    ideaEl.value = '';
});

function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex'
    document.body.style.overflow = 'hidden'
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none'
    document.body.style.overflow = 'auto'

}

document.addEventListener('keydown', function closeByESC(e) {
    if (e.key === 'Escape') {
        closePopup()
    }
})


function openBurger() {
    const menu = document.getElementById('menu')
    menu.classList.toggle('active')
}


