const url = "http://localhost:3000"

// const loadingElement = document.querySelector("#loading");
// const postsContainer = document.querySelector("#posts-container");

// Get all posts
async function getAllPosts() {
    const response = await fetch(url);
  
    console.log(response);
}

getAllPosts();