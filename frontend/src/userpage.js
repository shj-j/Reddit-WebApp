/*jshint esversion: 6 */

import {buildPostForm} from './post.js';
import {createPost} from './publicpost.js';

export function userPage(apiUrl,token,username){
    // document.getElementById('feed').style.display = 'none';
    document.getElementById("login_form").style.display = 'none';
    const url = apiUrl+"/user/feed";
    fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Token ' + token
        },
    }).then(res => res.json())
    .then(function(posts){
        // console.log(posts);
        // if there is no user feed then remove all the public feeds, show nothing
        const div_content = document.getElementsByClassName('content');
        const li_feed = document.getElementsByClassName('post');
        console.log(token);
        // After login, update all the feeds in public page to user feed if it's not null
        // if users feeds are less than popular feeds then remove the rest popular feeds
        // if (posts.posts.length <= li_feed.length){
        for(var i = 0 ; i <= posts.posts.length - 1 ; i++){
            userFeed(apiUrl, i,posts.posts[i].meta.author, posts.posts[i].meta.published,
            posts.posts[i].image, posts.posts[i].meta.upvotes, posts.posts[i].title, 
            posts.posts[i].text, posts.posts[i].comments, posts.posts[i].meta.subseddit,posts.posts[i].id,token,username);
        }
        for(var j = posts.posts.length ; j <= li_feed.length -1; j++){
            li_feed[j].style.display = 'none';                    
        }
    });
    // Remove the login button after log in and change it to profile button.
    const login = document.getElementById('login_public');
    login.parentNode.removeChild(login);
    // Remove the login button after log in and change it to my posts button which allowed user to check their own posts.
    const signup = document.getElementById('signup_public');
    signup.parentNode.removeChild(signup);

    //create a profile butthon
    const profile_button = document.createElement('button');
    profile_button.setAttribute('class','button button-primary');
    profile_button.setAttribute('id','usre-profile');
    profile_button.innerText = 'Profile';
    const li_login = document.getElementById('li-login');
    li_login.appendChild(profile_button);

    // create a myposts butthon
    const mypost_btton = document.createElement('button');
    mypost_btton.setAttribute('class','button button-secondary');
    mypost_btton.setAttribute('id','mypost');
    mypost_btton.innerText = 'My Posts';
    li_login.appendChild(mypost_btton);

    // add events after click the profile button
    userInfoModal(apiUrl,token);
    profile_button.addEventListener('click',function(){
        document.getElementById('userInfoModal').style.display = 'block';
    });
    
    mypost_btton.addEventListener('click', function(){
        buildViewPostForm(apiUrl,token);
    });

    document.getElementById('post_button').addEventListener('click',function(){
        buildPostForm(apiUrl,token);
    });
}

function userFeed(apiUrl,i,author, timestamp, image, upvotes,title,text,comments, suseddit,id,token, logged_username){
    // console.log(author);
    var logged_user_id = -1;
    const div_vote = document.getElementsByClassName('vote');
    const div_content = document.getElementsByClassName('content');
    //change the content to user upvotes number
    div_vote[i].innerText = '';
    // console.log(div_vote[i].innerText);

    // create a thumb icon for upvote, when click the icon, change color
    const upvote_button = document.createElement("i");
    upvote_button.setAttribute('class', "material-icons unlike");
    console.log(upvotes);
    //fetch to get loggedin user id
    fetch(apiUrl+"/user/", {
        method: 'GET',
        headers:{
            Authorization: "Token "+token,
            'Content-Type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(function(info){
        // if user already upvote the post then the icon show in like style else unlike style
        logged_user_id =info.id;
        if(upvotes.includes(logged_user_id)){
            upvote_button.setAttribute('class', "material-icons like");
        }else{
            upvote_button.setAttribute('class', "material-icons unlike");
        }
    });
    
    upvote_button.innerText = "thumb_up";
    upvote_button.addEventListener('click', function() {
        // alert('upvote!');
        putUpvote(apiUrl,this,token,id,upvotes);
    });
    div_vote[i].appendChild(upvote_button);    
    div_vote[i].appendChild(document.createElement('br'));

    // create a place for upvotes amount
    const upvote_number = document.createElement("i");
    upvote_number.innerText = upvotes.length;
    // If click the number, then show the details of the upvotes
    upvote_number.addEventListener('click', function() { 
        addupvoteModal(apiUrl,div_vote[i],upvotes,token,upvote_button);
    });
    div_vote[i].appendChild(upvote_number);

    const h4_id_title = document.getElementsByClassName('h4 post-title alt-text');
    //change the to user feeds title
    h4_id_title[i].innerText = title;

    const h5_id_text = document.getElementsByClassName('h5 post-title alt-text');
    //change the content to user feed content
    h5_id_text[i].innerText = text;

    const post_image = document.getElementsByClassName('post-image');
    //change the image 
    post_image[i].src = 'data:image/jpeg;base64, ' + image;

    const p_post_author = document.getElementsByClassName('author post-author');
    //change the author and time
    var time = new Date(timestamp*1000);
    p_post_author[i].innerText = "Psted by @"+ author + '    at ' + time;

    // create a comments icon for user to write the comment.
    const wcomment_button = document.createElement("i");
    wcomment_button.setAttribute('class', "material-icons like");
    wcomment_button.innerText = "add";

    div_content[i].appendChild(wcomment_button);
    wcomment_button.addEventListener('click', function() {
        buildAddCommentForm(apiUrl,token,id);
    });

    // create a follow icon for user to follow other users.
    const follow_button = document.createElement("i");
    follow_button.setAttribute('class', "material-icons like");
    follow_button.innerText = "person";
    follow_button.addEventListener('click', function() {
        followUser(apiUrl,follow_button,token,author);
    });
    div_content[i].appendChild(follow_button);

    const p_post_comment = document.getElementsByClassName('comments post-author');
    //change the comment number
    p_post_comment[i].innerText = comments.length + ' comments ';
    // appen write-comment-icon beside the comments
    // p_post_comment[i].appendChild(wcomment_button);
    commentsModal(p_post_comment[i], comments);

    //change subseddit
    const p_post_suseddit = document.getElementsByClassName('subseddit post-author');
    p_post_suseddit[i].innerText = 'suseddit: ' + suseddit;

    //check if image exist if not don't show it.
    if(image != null){
        post_image[i].style.display = 'block';
    }else{
        post_image[i].style.display = 'none';
    }
}

function addupvoteModal(apiUrl,x, upvotes,token,upvote_button){
    //create a new div to show the details of upvotes
    const upvote_model = document.createElement('div');
    upvote_model.setAttribute('class', 'modal-upvote animate');
    upvote_model.setAttribute('id', 'modal-upvote');
    // set a close button 
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    upvote_model.appendChild(span);
    // var userlist = [];
    // get the user's name by using the login user token and the id in upvotes detail
    for (var i = 0; i< upvotes.length;i++){
        const p = document.createElement('p');
        const url = apiUrl+"/user/?id="+upvotes[i];
        fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization : 'Token ' + token
            }
        })
        .then(res=>res.json())
        .then(function(user){
            // show the name in the div
            p.innerText = user.name;
            console.log("!!!!!!  "+document.getElementById('logged_user_name').innerText);
        });
        //add to upvote_modal to show the name
        upvote_model.appendChild(p);
    }

    // append this new div to upvotes div but not display at first
    root.appendChild(upvote_model);
    span.addEventListener('click', function(){
        upvote_model.style.display = 'none';
    });
}

function commentsModal(x, comments){
    // create a new div for showing comments
    const comments_modal = document.createElement('div');
    comments_modal.setAttribute('class', 'modal-comments animate');
    // create a close button
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    comments_modal.appendChild(span);
    // go through all the comments
    for (var i = 0; i< comments.length;i++){
        // console.log(comments[i]);
        //add the author and comments to the p
        const p = document.createElement('p');
        p.innerText = comments[i].author+ ": " + comments[i].comment;
        // appedn to div to show the author and comments
        comments_modal.appendChild(p);
    }

    // append this new div to comments
    root.appendChild(comments_modal);
    comments_modal.style.display = 'none';
    // when click the comments, show this new div and then can see the details of the comments
    x.addEventListener('click', function(){
        comments_modal.style.display = 'block';
    });
    // when click the close, close the div
    span.addEventListener('click', function(){
        comments_modal.style.display = 'none';
    });
}

function userInfoModal(apiUrl, token){
    // create a new div for showing comments
    const userinfo_modal = document.createElement('div');    
    userinfo_modal.setAttribute('id', 'userInfoModal');
    userinfo_modal.setAttribute('class', 'modal-profile animate');
    // create a close button
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    userinfo_modal.appendChild(span);

    //add a edit icon for user profile which can modify the profile
    const edit_button = document.createElement("i");
    edit_button.setAttribute('class', "material-icons");
    edit_button.innerText = "create";
    //append the button to the modal
    userinfo_modal.appendChild(edit_button);
    edit_button.addEventListener('click', function(){
        buildEditProfileForm(apiUrl,token);
    });

    const url = apiUrl+"/user/";
    fetch(url, {
        method: 'GET',
        headers:{
            Authorization: "Token "+token,
            'Content-Type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(function(info){  
        // Get the result and then append the result to all the object      
        const p_id= document.createElement('p');
        p_id.setAttribute('id','logged_id');
        const p_usrn= document.createElement('p');
        const p_name= document.createElement('p');
        p_name.setAttribute('id','logged_user_name');
        const p_email= document.createElement('p');
        const p_posts_num= document.createElement('p');
        const p_followed_num= document.createElement('p');
        const p_following_num= document.createElement('p');
        // show the user id
        p_id.innerText = "ID: " + info.id;
        // show the infoname
        p_name.innerText = "Name: " + info.name;
        // show the email
        p_email.innerText = "Email: " + info.email;
        // show the username
        p_usrn.innerText = "Username: " + info.username;       
        // show the post number  
        p_posts_num.innerText = "Posts Amounts: " + info.posts.length;
        // show the number of the followed user
        p_followed_num.innerText = "Followers Amounts: " + info.followed_num;
        // show the number of thefollowing bumer
        p_following_num.innerText = "Following Amounts: " + info.following.length;

        //append all the objects to the modal to make sure it can show on the website
        userinfo_modal.appendChild(p_id);
        userinfo_modal.appendChild(p_name);
        userinfo_modal.appendChild(p_email);
        userinfo_modal.appendChild(p_usrn);
        userinfo_modal.appendChild(p_posts_num);
        userinfo_modal.appendChild(p_followed_num);
        userinfo_modal.appendChild(p_following_num);
    });
    // when click the close, hide the div(userinfo_modal)
    root.appendChild(userinfo_modal);
    userinfo_modal.style.display = 'none';
    // click the close icon, then hide the modal
    span.addEventListener('click', function(){
        userinfo_modal.style.display = 'none';
    });
}

function putUpvote(apiUrl,upvote,token, id){
    const url = apiUrl+"/post/vote?id="+id;
    // do the fetch, check the upvote icon status, if it's like already then unlike, delete the upvote
    if (upvote.className == "material-icons like"){
        console.log(id);
        console.log(token);
        fetch(url, {
            method: 'DELETE',
            headers:{
                Authorization: 'Token '+token,
                id: id
            }
        });
        // change the icon style to unlike style
        upvote.setAttribute('class', 'material-icons unlike');
        console.log('unlike unlike unlike');
    }else{
        // do the fetch, check the upvote icon status, if it's like already then unlike, put the upvote request
        console.log(id);
        console.log(token);
        fetch(url, {
            method: 'PUT',
            headers:{
                Authorization: 'Token '+token,
                id: id
            }
        });
        upvote.setAttribute('class', 'material-icons like');
        console.log('like like like');
    }
}

function buildEditProfileForm(apiUrl,token){
    // build a form
    const editprofile_form = document.createElement('form');
    editprofile_form.setAttribute('class','modal animate');
    editprofile_form.setAttribute('id','editprofile_form');
    //create div
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-content container');

    //create input text field for password
    const b_password = document.createElement('b');
    b_password.innerText = 'Password: ';
    const input_psw = document.createElement('input');
    // show the input content in the field
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
    const edit_button= document.createElement('button');
    edit_button.innerText ='Regist';
    edit_button.setAttribute('class','button');
    const cancel= document.createElement('button');
    cancel.innerText ='Cancel';
    cancel.setAttribute('class','button');

    //append all the object to div
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
    div.appendChild(edit_button);
    div.appendChild(cancel);

    editprofile_form.appendChild(div);
    // 
    document.getElementById('root').appendChild(editprofile_form);
    editprofile_form.addEventListener('submit' , function(e) {
        e.preventDefault();
    });
    // click the cancel button then hide the form
    cancel.addEventListener('click', function(){
        editprofile_form.style.display = 'none';
        // console.log(input_usn.value);
        // console.log(input_psw.value);
    });
    // click the edit icon 
    edit_button.addEventListener('click',function() {
        const url = apiUrl+"/user";
        // get email, name, password input value then change it to json format
        const formdata = JSON.stringify({email: input_email.value, name: input_name.value,password: input_psw.value});
        fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: 'Token '+token,
                'Content-Type': 'application/json',
            },
            body: formdata
        }).then(function(response){
            // if success, then hide the form, and then give the alert
            console.log(response.status);
            if (response.status == 200){
                document.getElementById("editprofile_form").style.display = 'none';
            }else if (response.status == 400){
                alert('Malformed user object');
                console.log("Malformed user object");
            }else if (response.status == 403){
                alert('Invalid Authorization Token');
                console.log("Invalid Authorization Token");
            }
        });
    });
}

function buildViewPostForm(apiUrl,token){
    // build the form
    const viewpost_form = document.createElement('form');
    viewpost_form.setAttribute('class','modal animate');
    viewpost_form.setAttribute('id','viewpost_form');
    //create div container
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-mypost container');
    div.setAttribute('id','view post form');

    // create a close button
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    viewpost_form.appendChild(span);
    //get user's post number from user information
    const url = apiUrl+"/user/";
    fetch(url, {
        method: 'GET',
        headers:{
            Authorization: "Token "+token,
            'Content-Type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(function(info){
        //according to post number get the posts details
        for (var i =0; i<info.posts.length-1;i++){
            fetch(apiUrl+"/post/?id="+info.posts[i], {
                method: 'GET',
                headers:{
                    Authorization: 'Token '+token,
                    id: info.posts[i],
                }
            }).then(res=>res.json())
            .then(function(post){
                // ceate the remove the button icon
                const remove_button = document.createElement('i');
                remove_button.setAttribute('class', 'material-icons like');
                remove_button.innerText = "remove";
                //append the remove icon to div
                div.appendChild(remove_button);
                div.appendChild(document.createElement('br'));
                //create the post and show on the div
                // create the place to show the post
                createPost(div,post.meta.author, post.meta.published, post.image, post.meta.upvotes.length, post.title, 
                            post.text, post.comments.length, post.meta.subseddit);
                // set remove button icon click function,
                // if click the icon, delet the post
                remove_button.addEventListener('click', function(){
                    fetch(apiUrl+"/post/?id="+info.posts[i], {
                        method: "DELETE",
                        headers:{
                            Authorization: "Token "+token,
                            id: info.posts[i],
                            'Content-Type': 'application/json',
                        }
                    }).then(res=>alert(res.status));
                });
            });
            //append the form 
            viewpost_form.appendChild(div);
        }
    });
    //append this form to root
    root.appendChild(viewpost_form);
    // when you clickt the close icon then hide the form
    span.addEventListener('click', function(){
        viewpost_form.style.display = 'none';
    });
}

function buildAddCommentForm(apiUrl,token,id){
    // build the form
    const addcomment_form = document.createElement('form');
    addcomment_form.setAttribute('class','modal animate');
    addcomment_form.setAttribute('id','addcomment_form');
    //create div
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-comments container');

    //create input text field for username
    const comment_label = document.createElement('label');
    comment_label.setAttribute('class','comment_label');
    const b_comments = document.createElement('b');
    b_comments.innerText = 'Comment: ';
    const input_comment = document.createElement('textarea');
    input_comment.setAttribute('placeholder','Input the comment');
    input_comment.setAttribute('class', 'input-comment');

    // create post button 
    const submit= document.createElement('button');
    submit.innerText ='Submit';
    submit.setAttribute('class','button');
    // create cancel button 
    const cancel= document.createElement('button');
    cancel.innerText ='Cancel';
    cancel.setAttribute('class','button');

    comment_label.appendChild(b_comments);
    comment_label.appendChild(document.createElement('br'));
    comment_label.appendChild(input_comment);
    // append all object to div container
    div.appendChild(comment_label);    
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    div.appendChild(submit);
    div.appendChild(cancel);
    // append container to form
    addcomment_form.appendChild(div);
    // show this form to root
    root.appendChild(addcomment_form);

    // make sure form can answer click
    addcomment_form.addEventListener('submit' , function(e) {
        e.preventDefault();
    });
    // hide the form when click the cancel
    cancel.addEventListener('click', function(){
        addcomment_form.style.display = 'none';
    });
    console.log("heere is id : "+id);

    // submit the comment to this post when click the submit icon
    submit.addEventListener('click', function(){
        const url = apiUrl+"/post/comment?id="+id;
        const formdata = JSON.stringify({comment: input_comment.value});
        fetch(url,{
            method: 'PUT',
            headers:{
                Authorization: "Token "+token,
                id: id,
                'Content-Type': 'application/json',
            },
            body:formdata,
        }).then(res => alert(res.status));
        // before click the comment button, don't show the form
        addcomment_form.style.display = 'none';
    });
}

function followUser(apiUrl,follow_button, token, username){
    var url = apiUrl+"/user/follow?username="+username;
    // check if the logged user followed this user
    if(follow_button.innerText == "person_add"){   
        // connect with backend     
        // if is not follow, then send follow request
        fetch(url, {
            method: 'PUT',
            headers:{
                Authorization: 'Token '+token,
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            // show the result of the response
            if (response.status == 200){
                alert('successed to follow this user');
            }else if (response.status == 400){
                alert('Malformed Request');
                console.log("Malformed Request");
            }else if (response.status == 403){
                alert('Malformed Request');
                console.log("Malformed Request");
            }
        });
        // then change the icon style to followed
        follow_button.innerText = "person";
    }else{
        url = apiUrl+"/user/unfollow?username="+username;
        // if user followed user then put unfollow request 
        fetch(url, {
            method: 'PUT',
            headers:{
                Authorization: 'Token '+token,
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            if (response.status == 200){
                alert('successed to unfollow the user');
            }else if (response.status == 400){
                alert('Malformed Request');
                console.log("Malformed Request");
            }else if (response.status == 403){
                alert('Malformed Request');
                console.log("Malformed Request");
            }
        });
        //then change icon style to unfollowed
        follow_button.innerText = "person_add";
    }
}