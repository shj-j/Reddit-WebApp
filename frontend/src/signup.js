/*jshint esversion: 6 */

export function buildSignupForm(){
    //create login Form
    const signup_form = document.createElement('form');
    signup_form.setAttribute('class','modal animate');
    signup_form.setAttribute('id','signup_form');
    //create div
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-content container');

    //create input text field for username
    const b_username = document.createElement('b');
    b_username.innerText = 'Username: ';
    const input_usn = document.createElement('input');
    input_usn.setAttribute('placeholder','Please input a username');
    input_usn.setAttribute('name','username');

    //create input text field for password
    const b_password = document.createElement('b');
    b_password.innerText = 'Password: ';
    const input_psw = document.createElement('input');
    input_psw.setAttribute('placeholder','Please input a Password');
    input_psw.setAttribute('name','password');

    //create input text field for email
    const b_email = document.createElement('b');
    b_email.innerText = 'Set Email: ';
    const input_email = document.createElement('input');
    input_email.setAttribute('placeholder','xxx@xxx.com');
    input_email.setAttribute('name','email');

    //create input text field for name
    const b_name = document.createElement('b');
    b_name.innerText = 'Set Name: ';
    const input_name = document.createElement('input');
    input_name.setAttribute('placeholder','Please input a name');
    input_name.setAttribute('name','email');

    // create signup button for signup form
    const signup_button= document.createElement('button');
    signup_button.innerText ='Regist';
    signup_button.setAttribute('class','button');
    const cancel= document.createElement('button');
    cancel.innerText ='Cancel';
    cancel.setAttribute('class','button');

    // append all the elements
    div.appendChild(b_username);
    div.appendChild(input_usn);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    div.appendChild(b_password);
    div.appendChild(input_psw);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    div.appendChild(b_email);
    div.appendChild(input_email);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    div.appendChild(b_name);
    div.appendChild(input_name);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    div.appendChild(signup_button);
    div.appendChild(cancel);

    signup_form.appendChild(div);
    document.getElementById('root').appendChild(signup_form);
    signup_form.addEventListener('submit' , function(e) {
        e.preventDefault();
    });
    cancel.addEventListener('click', function(){
        signup_form.style.display = 'none';
        // console.log(input_usn.value);
        // console.log(input_psw.value);
    });
    signup_button.addEventListener('click',function() {sigupFunc(input_usn.value, input_psw.value, input_email.value, input_name.value);});

}

function sigupFunc(u,p,e,n){
    const url = "http://127.0.0.1:5000/auth/signup";
    const formdata = JSON.stringify({username: u, password: p, email: e, name: n});
    console.log(formdata);
    fetch(url,{ 
        method: 'post',
        body: formdata,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(function(response){
        console.log(response.status);
        if (response.status == 200){
            const preUrl = location.href;
            console.log(preUrl);
            const userUrl = preUrl + u;
            document.getElementById("signup_form").style.display = 'none';
        }else if (response.status == 400){
            console.log("Missing Username/Password");
        }else if (response.status == 403){
            console.log("Invalid Username/Password");
        }
    });
}