function login () {
    let userName = $('#userName').val();
    let passWord = $('#passWord').val();
    let userAccount = {
        userName: userName,
        passWord: passWord
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
                    'Content-Type': 'application/json'
        }
    })
}