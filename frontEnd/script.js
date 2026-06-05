
document.addEventListener('DOMContentLoaded',reload)
const form  = document.getElementById('form')

const blogList = document.getElementById('blog-lists')

form.addEventListener('submit',addBlogs);

async function addBlogs(e){
    e.preventDefault()
    try{
        const blogs = {
            title:document.getElementById('title').value ,
            author:document.getElementById('author').value,
            blog:document.getElementById('blog').value
        }
        let result = await axios.post('http://localhost:3000/blogs',blogs)
        //let id = result.data.id
        console.log(result.data)
        const details = result.data

        await displayDetails(details)
    }
    catch(err){
        console.log(err.message)
    }
    form.reset()
}

async function displayDetails(details) {
    try{
        let list = document.createElement('li')
        list.className = 'list p-2 m-1 rounded border-0 shadow w-100 d-block'

        let div = document.createElement('div')
        div.className = 'd-flex align-items-center w-100'

        let span = document.createElement('span')
        span.textContent = details.title

        let toggleBtn = document.createElement('button')
        toggleBtn.className = 'ms-auto text-danger fw-bolder border-0 bg-dark text-danger'
        toggleBtn.textContent = '+'

        div.appendChild(span)
        div.appendChild(toggleBtn)

        list.appendChild(div)


        let detailsDiv = document.createElement('div')
        detailsDiv.className = 'd-none mt-2'
        detailsDiv.innerHTML = `

        <strong> Author: </strong> ${details.author} <br>
        <strong> Blog: </strong> ${details.blog} <br>
        <input type="text" class="comment m-1 form-control w-50" id="comment-${details.id}">
        <button type="button" class="cmnt-btn bg-warning rounded text-white" id="cmnt-btn-${details.id}">comment</button>
        <ul id="comments-${details.id}" class="mt-2"></ul>
        `
        list.appendChild(detailsDiv)

         blogList.appendChild(list)

        toggleBtn.addEventListener('click',()=>{
            if(detailsDiv.classList.contains('d-none')){
                detailsDiv.classList.remove('d-none')
                toggleBtn.textContent ='-'
            }
            else{
                detailsDiv.classList.add('d-none')
                toggleBtn.textContent = '+'
            }
        })

        let c_btn = detailsDiv.querySelector(`#cmnt-btn-${details.id}`)
        c_btn.addEventListener('click',async()=>{
            await addComments(details.id)
        })
    }
    catch(err){
        console.log(err.message)
    }
}

async function addComments(blogId) {
    try {
        let c_input = document.getElementById(`comment-${blogId}`).value
        let result = await axios.post(`http://localhost:3000/blogs/${blogId}/comments`, { comment: c_input })
        const comment = result.data

        await displayComment(blogId,comment)


    } catch (err) {
        console.log(err.message)
    }
}

async function displayComment(blogId,comment) {
    try{
        let c_list = document.createElement('li')
        c_list.className ='c-list border-0 form-control bg-dark text-white d-flex'
        c_list.textContent =comment.comment

        let c_del = document.createElement('button')
        c_del.className='c-del rounded  bg-danger text-white  border-0 ms-auto'
        c_del.textContent = 'delete'

        c_list.appendChild(c_del)

        let userList = document.getElementById(`comments-${blogId}`)

        userList.appendChild(c_list)

        c_del.addEventListener('click',async()=>{
            await deleteComment(blogId,comment.id,c_list)
        })

    }
    catch(err){
        console.log(err.message)
    }
}

async function deleteComment(blogId,commentId,c_list) {
    try{
        await axios.delete(`http://localhost:3000/blogs/${blogId}/comments/${commentId}`)
        c_list.remove()
    }
    catch(err){
        console.log(err.message)
    }
}


async function reload() {
    try{
        let result = await axios.get('http://localhost:3000/blogs')
        let ans=result.data
        for(let i of ans) {
           await  displayDetails(i)

           let comments = await axios.get(`http://localhost:3000/blogs/${i.id}/comments`)
           let c_mnt = comments.data
           c_mnt.forEach(j=>{
            displayComment(i.id,j)
           })

        };

    }
    catch(err){
        console.log(err.message)
    }
}




