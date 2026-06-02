document.addEventListener('DOMContentLoaded',reload)
const form = document.getElementById('form')

let blogList = document.getElementById('blog-lists')

form.addEventListener('submit', addBlogs)

async function addBlogs(e) {
    e.preventDefault()
    try {
        const blogs = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            blog: document.getElementById('blog').value
        }
        if (blogs) {
            let result = await axios.post('http://localhost:3000/blogs', blogs)
            blogs.id = result.data.id
            console.log(result.data)
            let details = result.data
            await displayBlogs(details)
        }

    }
    catch (err) {
        console.log(err.message)
    }
    form.reset()
}

async function displayBlogs(details) {
    try {
        let list = document.createElement('li')
        list.className = 'list d-flex justify-content-between align-items-center'

        const titleSpan = document.createElement('span')
        titleSpan.textContent = details.title

        const toggleBtn = document.createElement('button')
        toggleBtn.className = 'btn btn-sm text-danger border-0 ms-auto fw-bolder'
        toggleBtn.textContent = "+"

        list.appendChild(titleSpan)
        list.appendChild(toggleBtn)

        blogList.appendChild(list)

        toggleBtn.addEventListener('click', () => {
            let data = list.querySelector('.details')
            if (data) {
                data.remove()
                toggleBtn.textContent = '+'
                return
            }
            const div = document.createElement('div')
            div.className = 'details p-2 rounded w-100'

            div.innerHTML = `
                <p><strong>Author:</strong> ${details.author}</p><br>
                <p><strong>Description:</strong> ${details.blog}</p><br><br>
                <h2>comments:</h2><br>
                <input type="text" id="comment-${details.id}" class="comment form-control w-50"><br>
                <button type="submit" class="comment-btn bg-info rounded p-2" id="comment-btn-${details.id}">Submit</submit>

            `
            list.appendChild(div)
            toggleBtn.textContent = "-"

            let commentBtn = document.getElementById(`comment-btn-${details.id}`)
            commentBtn.addEventListener('click', async () => {
                let commentDetails = {
                    comment: document.getElementById(`comment-${details.id}`).value
                }
                if (commentDetails.comment) {
                    try {
                        let res = await axios.post('http://localhost:3000/comments', {
                            comment : commentDetails.comment,
                            blogId : details.id
                        })
                        let commentId = res.data.id
                        console.log(res.data)
                        const p = document.createElement('p')
                        p.textContent = res.data.comment

                        let cmntDlt = document.createElement('button')
                        cmntDlt.className='del-cmnt p-2 border-0 bg-warning rounded text-white'
                        cmntDlt.textContent = 'delete'


                        p.appendChild(cmntDlt)

                        div.appendChild(p)

                        cmntDlt.addEventListener('click',async()=>{
                            await deleteComment(p,commentId)

                        })

                    }
                    catch(err){
                        console.log(err.message)
                    }
                }
            })

        })

    }
    catch(err){
        console.log(err.message)
    }
}

async function deleteComment(p,commentId){
    try{
        await axios.delete(`http://localhost:3000/comments/${commentId}`)
        p.remove()
    }
    catch(err){
        console.log(err.message)
    }
}

async function reload() {
    try {
        const blogsRes = await axios.get('http://localhost:3000/blogs')
        const commentsRes = await axios.get('http://localhost:3000/comments')

        blogsRes.data.forEach(blog => {
            displayBlogs(blog)
        })

    }
    catch(err){
        console.log(err.message)
    }
}




