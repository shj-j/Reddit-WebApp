/*jshint esversion: 6 */

export function buildPostForm(apiUrl,token){
    //create post Form
    const post_form = document.createElement('form');
    post_form.setAttribute('class','modal animate');
    post_form.setAttribute('id','post_form');
    //create div
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-post container');

    //create label for title
    const label_title = document.createElement('label');
    label_title.setAttribute('class', 'post_title');
    const b_title = document.createElement('b');
    b_title.innerText = 'Title： ';
    const input_title = document.createElement('textarea');
    input_title.setAttribute('placeholder','Give a title (Required)');

    //create label for text
    const label_text = document.createElement('label');
    label_text.setAttribute('class','text');
    const b_text = document.createElement('b');
    b_text.innerText = 'Text : ';
    const input_text = document.createElement('textarea');    
    input_text.setAttribute('class', 'long-input');
    input_text.setAttribute('placeholder','What do you want to say');

    //create label for subseddit
    const label_subseddit = document.createElement('label');
    label_subseddit.setAttribute('class','label_subseddit');
    const b_subseddit = document.createElement('b');
    b_subseddit.innerText = 'Subseddit : ';
    const input_subseddit = document.createElement('input');
    input_subseddit.setAttribute('type','text');
    input_subseddit.setAttribute('placeholder','subseddit');

    //create label for image
    const label_image = document.createElement('label');
    label_image.setAttribute('class','label_image');
    const b_image = document.createElement('b');
    b_image.innerText = 'image : ';
    const input_image = document.createElement('textarea');
    input_image.setAttribute('class', 'long-input');
    input_image.setAttribute('placeholder','image base64');

    // create submit button for post form
    const submit= document.createElement('button');
    submit.innerText ='Submit';
    submit.setAttribute('class','button');
    // create cancel button for post form
    const cancel= document.createElement('button');
    cancel.innerText ='Cancel';
    cancel.setAttribute('class','button');

    // append all the elements
    // append  b-tile to  label_title
    label_title.appendChild(b_title);
    // then append label and input field to div
    div.appendChild(label_title);
    div.appendChild(input_title);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    // append  b-text to label_title
    label_text.appendChild(b_text);
    // then append label and input field to div
    div.appendChild(label_text);
    div.appendChild(input_text);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    // append  b-subseddit to label_subseddit
    label_subseddit.appendChild(b_subseddit);
    // then append label and input field to div
    div.appendChild(label_subseddit);
    div.appendChild(input_subseddit);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    label_image.appendChild(b_image);
    //  append image label and input field to div
    div.appendChild(label_image);
    div.appendChild(input_image);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    // append 2 button to div
    div.appendChild(submit);
    div.appendChild(cancel);
    //append div to form and append form to root
    post_form.appendChild(div);
    root.appendChild(post_form);
    // make sure form can reponse the click
    post_form.addEventListener('submit' , function(e) {
        e.preventDefault();
    });
    // click cancel, hide the form
    cancel.addEventListener('click', function(){
        post_form.style.display = 'none';
    });
    // click submit, do the post punction, which send the post content to the database.
    submit.addEventListener('click',function() {postFunc(apiUrl,token, input_title.value, input_text.value, input_subseddit.value, input_image.value);});
}

function postFunc(apiUrl,token, title,text,subseddit,image){
    const url =apiUrl+ "/post/";
    // console.log(image);
    //check if image is null, if is null, donnot send image info to backend
    var formdata = {};
    if (image != ''){
        formdata = JSON.stringify({title: title, text: text, subseddit: subseddit, image: image});
    }else{
        formdata = JSON.stringify({title: title, text: text, subseddit: subseddit});
    }
    console.log(formdata);
    // post new post to backend
    fetch(url,{ 
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Token ' + token
        },
        body: formdata,
    })
    .then(function(response){
        // check the response for the post result
        console.log(response.status);
        if (response.status == 200){
            document.getElementById("post_form").style.display = 'none';
        }else if (response.status == 400){
            console.log("Malformed Request / Image could not be processed");
        }else if (response.status == 403){
            console.log("Invalid Auth Token");
        }
    });
}
