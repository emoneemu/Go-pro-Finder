//fetch(`https://api.github.com/users/andrew`).then((res)=>res.json()).then((profile)=>console.log(profile));

const client_id = `b64eb1f235c0517a8170`;
const client_secret = `bd3e46b591ce20a7e32f8ffb0ca8004a7a4b28f2`;

async function getUser(name) {
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${client_id}&client_secret=${client_secret}`);

    const profile = await res.json();
    return profile;
}


document.querySelector('#search').addEventListener('submit',async (e)=>
{
    e.preventDefault();
    const username = document.querySelector('#findByUsername').value;
    const profile = await getUser(username);

    if(username.length>0)
    {
      document.querySelector('.loader').style.display = 'block';
      document.querySelector('.user-details').style.display = 'none';
      document.querySelector('.notFound').style.display = 'none';
      const profile = await getUser(username);
      document.querySelector('.loader').style.display = 'none';


      if(profile.message === 'Not Found')
      {
        document.querySelector('.notFound').style.display = 'block';
      }
      else{
        const repos = await getRepos(profile);
        document.querySelector('.user-details').style.display = '';
        showProfile(profile);
        showRepos(repos);
      }
    }
    console.log(username);
    
    
    console.log(profile);
    document.querySelector('#findByUsername').value = '';
   
});

function showProfile(profile)
{
    document.querySelector('.profile').innerHTML = `
    <img
            src="${profile.avatar_url}"
            alt="${profile.name}"
          />
          <p class="name">${profile.name}</p>
          <p class="username login">${profile.login}</p>
          <p class="bio">
          ${profile.bio}
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> ${profile.followers} </span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> ${profile.following} </span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
          </p>
    `;

}
async function getRepos(profile)
{
    const res = await fetch(`${profile.repos_url}?client_id=${client_id}&client_secret=${client_secret}&per_page=10`);
    const repo = await res.json();
    return repo;
}

function showRepos(repos)
{
    let newHtml = '';
    for(let repo of repos)
    {
        newHtml+=`
        <div class="repo">
          <div class="repo_name">
            <a href="${repo.html_url}">${repo.name}</a>
          </div>
          <p>
            <span class="circle"></span> ${repo.language}
            <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
            <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
          </p>
        </div>
        `;
    }

    document.querySelector('.repos').innerHTML = newHtml;
}



/*


        
*/ 