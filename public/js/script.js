const submitPostBtn = document.querySelector('#submit-post-btn');
const submitCommentBtn = document.querySelector('#submit-comment-btn');
const updatePostBtn = document.querySelector('#update-post-btn');
const deletePostBtn = document.querySelector('#delete-post-btn');

// allows the user to submit a new post. If the post can not be created for whatever reason, throws an error
const submitNewPost = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed create post, please try again');
        }
    }
    else {
        alert('Failed create post, please try again');
    }
};

// allows the user to submit a new comment. If the comment can not be created for whatever reason, throw fail error
const submitNewComment = async (e) => {
    e.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const data = document.querySelector('.custom-card')
    const id = data.dataset.id;

    if (content) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/api/posts/${id}`);
        } else {
            alert('Failed create comment, please try again');
        }
    }
    else {
        alert('Failed create comment, please try again');
    }
};

// allows the user to update a post. If the post can not be updated for whatever reason, throw a failed post error
const updatePost = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const data = document.querySelector('.custom-card')
    const id = data.dataset.id;

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update a post, please try again');
        }
    }
    else {
        alert('Failed to update a post, please try again');
    }
};

// allows the user to delete a post. If the post can not be deleted, throw delete fail error
const deletePost = async (e) => {
    e.preventDefault();

    const data = document.querySelector('.custom-card')
    const id = data.dataset.id;

    if (id) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete a post, please try again');
        }
    }
    else {
        alert('Failed to delete a post, please try again');
    }
};


// event listeners
if (submitPostBtn) {
    submitPostBtn.addEventListener('click', submitNewPost);
}

if (submitCommentBtn) {
    submitCommentBtn.addEventListener('click', submitNewComment);
}

if (updatePostBtn) {
    updatePostBtn.addEventListener('click', updatePost);
}

if (deletePostBtn) {
    deletePostBtn.addEventListener('click', deletePost);
}