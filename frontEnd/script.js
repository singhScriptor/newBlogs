
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
        let id = result.data.id
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
        <input type="text" class="comment m-1 form-control w-50" id="comment">
        <button type="button" class="cmnt-btn bg-primary rounded text-white" id="cmnt-btn">comment</button>
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

    }
    catch(err){
        console.log(err.message)
    }
}

async function reload() {
    try{
        let result = await axios.get('http://localhost:3000/blogs')
        let ans=result.data
        ans.forEach(i => {
            displayDetails(i)
        });
    }
    catch(err){
        console.log(err.message)
    }
}




