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
    console.log(username);
    const profile = await getUser(username);
    console.log(profile);
    showProfile(profile);
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
showRepo()
{
    
}

/*


        
*/ 