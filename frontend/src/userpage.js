/*jshint esversion: 6 */

export function userPage(token){
    // document.getElementById('feed').style.display = 'none';
    document.getElementById("login_form").style.display = 'none';
    const url = "http://127.0.0.1:5000/user/feed";
    fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Token ' + token
        },
    }).then(res => res.json())
    .then(function(posts){
        // console.log(posts);
        // After login, update all the post in ppublic page to user feed 
        for(var i = 0 ; i <= posts.posts.length - 1 ; i++){
            userPost(i,posts.posts[i].meta.author, posts.posts[i].meta.published,
                posts.posts[i].image, posts.posts[i].meta.upvotes.length,posts.posts[i].title, 
                posts.posts[i].text, posts.posts[i].comments.length, posts.posts[i].meta.subseddit );
        }
        const upvotes_div = document.getElementsByClassName('vote');
        const comments_p = document.getElementsByClassName('comments post-author');
        console.log("upvotes_div: " + upvotes_div);
        console.log(token);
        // leve2 first 2, click upvotes/comments, it will show the details about the upvotes & comments
        for(var j = 0 ; j <= posts.posts.length - 1 ; j++){
            var upv = posts.posts[j].meta.upvotes;
            addupvoteModal(upvotes_div[j],upv,token);
            commentsModal(comments_p[j], posts.posts[j].comments);
        }
    });
}

function userPost(i,author, timestamp, image, upvotes,title,text,comments, suseddit){
    // console.log(author);
    const div_vote = document.getElementsByClassName('vote');
    //change the content to user upvotes number
    div_vote[i].innerText = upvotes;
    // console.log(div_vote[i].innerText);

    const h4_id_title = document.getElementsByClassName('h4 post-title alt-text');
    //change the to user feeds title
    h4_id_title[i].innerText = title;

    const h5_id_text = document.getElementsByClassName('h5 post-title alt-text');
    //change the content to user feed content
    h5_id_text[i].innerText = text;

    const post_image = document.getElementsByClassName('img-post');
    //change the image 
    post_image[i].src = 'data:image/jpeg;base64, ' + image;

    const p_post_author = document.getElementsByClassName('author post-author');
    //change the author and time
    var time = new Date(timestamp*1000);
    p_post_author[i].innerText = "Psted by @"+ author + ' at ' + time;

    const p_post_comment = document.getElementsByClassName('comments post-author');
    //change the comment number
    p_post_comment[i].innerText = comments + ' comments';

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

function addupvoteModal(x, upvotes,token){
    //create a new div to show the details of upvotes
    const upvote_model = document.createElement('div');
    upvote_model.setAttribute('class', 'modal-upvote animate');
    // set a close button 
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    upvote_model.appendChild(span);
    // var userlist = [];
    // get the user's name by using the login user token and the id in upvotes detail
    for (var i = 0; i< upvotes.length;i++){
        const p = document.createElement('p');
        const url = "http://127.0.0.1:5000/user/?id="+upvotes[i];
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
        });
        //add to upvote_modal to show the name
        upvote_model.appendChild(p);
    }

    // append this new div to upvotes div but not display at first
    x.appendChild(upvote_model);
    upvote_model.style.display = 'none';

    // when click the upvotes, show the div
    x.addEventListener('click', function(){
        upvote_model.style.display = 'block';
    });
    // when click the close, hide the div(upvote modal)
    span.addEventListener('click', function(){
        upvote_model.style.display = 'none';
    });
}

function commentsModal(x, comments){
    // create a new div for showing comments
    const comments_modal = document.createElement('div');
    comments_modal.setAttribute('class', 'modal-upvote animate');
    // create a close button
    const span = document.createElement('span');
    span.setAttribute('class','close');
    span.innerText = 'close';
    comments_modal.appendChild(span);
    // go through all the comments
    for (var i = 0; i< comments.length;i++){
        console.log(comments[i]);
        console.log(comments[i].author);
        //add the author and comments to the p
        const p = document.createElement('p');
        p.innerText = comments[i].author+ ": " + comments[i].comment;
        // appedn to div to show the author and comments
        comments_modal.appendChild(p);
    }

    // append this new div to comments
    x.appendChild(comments_modal);
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