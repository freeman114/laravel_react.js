function onSubscribe() {
    const name = document.getElementById('subscribeName').value;
    const email = document.getElementById('subscribeEmail').value;
    const subscribeError = document.getElementById('subscribeError');
    const subscribeSuccess = document.getElementById('subscribeSuccess');

    if (!(name && email)) {
        subscribeSuccess.style.display = 'none';
        subscribeError.style.display = 'block';
        subscribeError.innerText = 'Invalid form data';
    }

    jQuery.post("/api/news_subscribe/create", { name, email }, function(data){
        if (data.status === 'success') {
            subscribeError.style.display = 'none';
            subscribeSuccess.style.display = 'block';
        } else {
            subscribeSuccess.style.display = 'none';
            subscribeError.style.display = 'block';
            subscribeError.innerText = 'Server error';
        }
    });
}
