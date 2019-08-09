/*jshint esversion: 6 */

export function buildLoginForm(){
    //create login Form
    const login_form = document.createElement('form');
    login_form.setAttribute('class','modal animate');
    login_form.setAttribute('action','/action_page.php');
    //create div
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-content container');

    //create label for username
    const label_usn = document.createElement('label');
    label_usn.setAttribute('class', 'username');
    const b_username = document.createElement('b');
    b_username.innerText = 'Username： ';
    const input_usn = document.createElement('input');
    input_usn.setAttribute('type','text');
    input_usn.setAttribute('placeholder','Enter Username');
    input_usn.setAttribute('name','username');

    //create label for password
    const label_psw = document.createElement('label');
    label_psw.setAttribute('class','password');
    const b_password = document.createElement('b');
    b_password.innerText = 'Password： ';
    const input_psw = document.createElement('input');
    input_psw.setAttribute('type','text');
    input_psw.setAttribute('placeholder','Enter Password');
    input_psw.setAttribute('name','password');
    // create login button for login form
    const button= document.createElement('button');
    button.innerText ='Login';
    button.setAttribute('class','button');
    const cancel= document.createElement('button');
    cancel.innerText ='Cancel';
    cancel.setAttribute('class','button');
    cancel.setAttribute('id','cancel_button');

    // append all the elements
    label_usn.appendChild(b_username);
    div.appendChild(label_usn);
    div.appendChild(input_usn);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    label_psw.appendChild(b_password);
    div.appendChild(label_psw);
    div.appendChild(input_psw);
    div.appendChild(document.createElement('br'));
    div.appendChild(button);
    div.appendChild(cancel);
    login_form.appendChild(div);
    document.getElementById('root').appendChild(login_form);

    cancel.addEventListener('click', function(){
        login_form.style.display = 'none';
    });
}
