/*jshint esversion: 6 */
export function showPopularPost(){
    //Create main for feed
    const main = document.createElement('main');
    main.setAttribute('role', 'main');
    main.setAttribute('id','main');

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

    ul_feed.appendChild(div_feed_header);

    const url = "http://127.0.0.1:5000/post/public";
    fetch(url).then(res => res.json())
            .then(function(posts){
                console.log(posts.posts);
                for(var i = 0 ; i <= posts.posts.length - 1 ; i++){
                    createPost(ul_feed, posts.posts[i].meta.author, posts.posts[i].meta.published, 
                            posts.posts[i].image, posts.posts[i].meta.upvotes.length,posts.posts[i].title, 
                            posts.posts[i].text, posts.posts[i].comments.length, posts.posts[i].meta.subseddit );
                }
            });
    root.appendChild(main);
}

function createPost(ul_feed, author, timestamp, image, upvotes,title,text,comments, suseddit){
    //create li 
    const li_post = document.createElement('li');
    li_post.setAttribute('class','post');
    li_post.setAttribute('dat-id-upvotes', '');

    const div_vote = document.createElement('div');
    div_vote.setAttribute('class', 'vote');
    div_vote.setAttribute('dat-id-upvotes', '');
    div_vote.innerText = upvotes;

    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'content');

    const h4_id_title = document.createElement('h4');
    h4_id_title.setAttribute('class', 'h4 post-title alt-text');
    h4_id_title.setAttribute('data-id-title', '');
    h4_id_title.innerText = title;

    const h5_id_text = document.createElement('h5');
    h5_id_text.setAttribute('class', 'h5 post-title alt-text');
    // h5_id_text.setAttribute('data-id-title', '');
    h5_id_text.innerText = text;

    const post_image = document.createElement('img');
    post_image.setAttribute('class','img-post');
    post_image.src = 'data:image/jpeg;base64, ' + image;

    const p_post_author = document.createElement('p');
    p_post_author.setAttribute('class', 'author post-author');
    p_post_author.setAttribute('dat-id-author', '');
    var time = new Date(timestamp*1000);
    p_post_author.innerText = "Psted by @"+ author + ' at ' + time;

    const p_post_comment = document.createElement('p');
    p_post_comment.setAttribute('class', 'comments post-author');
    p_post_comment.innerText = comments + ' comments';

    const p_post_suseddit = document.createElement('p');
    p_post_suseddit.setAttribute('class', 'subseddit post-author');
    p_post_suseddit.innerText = 'suseddit: ' + suseddit;

    div_content.appendChild(h4_id_title);
    div_content.appendChild(h5_id_text);
    div_content.appendChild(post_image);
    if(image == null){
        post_image.style.display = 'none';
    }
    div_content.appendChild(p_post_author);
    div_content.appendChild(p_post_comment);
    div_content.appendChild(p_post_suseddit);


    li_post.appendChild(div_vote);
    li_post.appendChild(div_content);

    ul_feed.appendChild(li_post);
    main.appendChild(ul_feed);
}