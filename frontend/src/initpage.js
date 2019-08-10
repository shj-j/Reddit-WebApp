/*jshint esversion: 6 */
import {buildLoginForm} from './login.js';
import {buildSignupForm} from './signup.js';
export function createFront(){
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
    li_signup.setAttribute('class','nav-item');

    login_button.setAttribute('class','button button-primary');
    login_button.setAttribute('data-id-login','');
    login_button.innerText = 'Log In';
    signup_button.setAttribute('class','button button-secondary');
    signup_button.setAttribute('data-id-signup','');
    signup_button.innerText = 'Sign Up';

    //Go to a login form when press button
    login_button.addEventListener("click", (event)=>{
        buildLoginForm();
    });

    //Go to a regist form when we press button
    signup_button.addEventListener("click", (event)=>{
        buildSignupForm();
    });

    //Create main for feed
    const main = document.createElement('main');
    main.setAttribute('role', 'main');

    const ul_feed = document.createElement('ul');
    ul_feed.setAttribute('id', 'feed');
    ul_feed.setAttribute('data-id-feed', 'feed');

    const div_feed_header = document.createElement('div');
    div_feed_header.setAttribute('class','feed-header');
    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'feed-title alt-text');
    h3.innerText = "Popular posts";
    const button_post = document.createElement('button');
    button_post.setAttribute('class', 'button button-secondary');
    button_post.innerText = 'Post';

    div_feed_header.appendChild(h3);
    div_feed_header.appendChild(button_post);

    const li_post = document.createElement('li');
    li_post.setAttribute('class','post');
    li_login.setAttribute('dat-id-upvotes', '');

    const div_vote = document.createElement('div');
    div_vote.setAttribute('class', 'vote');
    div_vote.setAttribute('dat-id-upvotes', '');

    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'content');
    const h4_id_title = document.createElement('h4');
    h4_id_title.setAttribute('class', 'post-title alt-text');
    h4_id_title.setAttribute('data-id-title', '');
    const p_post_author = document.createElement('p');
    p_post_author.setAttribute('class', 'post-author');
    p_post_author.setAttribute('dat-id-author', '');

    div_content.appendChild(h4_id_title);
    div_content.appendChild(p_post_author);

    li_post.appendChild(div_vote);
    li_post.appendChild(div_content);
    ul_feed.appendChild(div_feed_header);
    ul_feed.appendChild(li_post);
    main.appendChild(ul_feed);


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
    root.appendChild(main);
}
export default createFront;