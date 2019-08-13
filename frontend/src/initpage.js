/*jshint esversion: 6 */
import {buildLoginForm} from './login.js';
import {buildSignupForm} from './signup.js';
import {showPopularPost} from  './publicpost.js';

export function createFront(apiUrl){
    const root  = document.querySelector('#root');
    while(root.firstChild){
        root.removeChild(root.firstChild);
    }
    //create elements
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    const li_input = document.createElement('li');
    const li_login = document.createElement('li');
    const li_signup = document.createElement('li');
    const input = document.createElement('input');
    const login_button = document.createElement('button');
    const signup_button = document.createElement('button');

    //set attribute to header, using banner as class
    header.setAttribute('class', 'banner');
    //set attribute to header, using nav as id
    header.setAttribute('id', 'nav');
    //set attribute to header, set id and class
    h1.setAttribute('id', 'logo');
    h1.setAttribute('class', 'flex-center');
    h1.innerText = 'Seddit';

    //set input searching box
    ul.setAttribute('class','nav');
    input.setAttribute('id', 'search');
    //set input,login,signup searching box
    li_input.setAttribute('class','nav-item');
    li_login.setAttribute('class','nav-item');
    li_login.setAttribute('id','li-login');
    li_signup.setAttribute('class','nav-item');
    li_signup.setAttribute('id','li-signup');

    login_button.setAttribute('class','button button-primary login');
    login_button.setAttribute('data-id-login','');
    login_button.setAttribute('id','login_public');
    login_button.innerText = 'Log In';
    signup_button.setAttribute('class','button button-secondary signup');
    signup_button.setAttribute('data-id-signup','');
    signup_button.setAttribute('id','signup_public');
    signup_button.innerText = 'Sign Up';

    //Go to a login form when press button
    login_button.addEventListener("click", (event)=>{
        buildLoginForm(apiUrl);
    });

    //Go to a regist form when we press button
    signup_button.addEventListener("click", (event)=>{
        buildSignupForm(apiUrl);
    });

    //Add to Dom
    li_input.appendChild(input);
    li_login.appendChild(login_button);
    li_signup.appendChild(signup_button);
    ul.appendChild(li_input);
    ul.appendChild(li_login);
    ul.appendChild(li_signup);
    header.appendChild(h1);
    header.appendChild(ul);
    root.appendChild(header);
    
    showPopularPost(apiUrl);
}
export default createFront;