var css_manipulator = (function () {

  function showNextPage( current_page ) {
    const footer = document.querySelector('footer');
    const next_page = current_page.nextElementSibling;
    
    current_page.className = 'page js-slideout';
    footer.className = 'js-fade'; /*Hide footer while slide transition occurs*/

    setTimeout( () => {
        next_page.style.display = 'block';
        next_page.className = 'page js-slidein';
        footer.className = ''; /*reset hide animation*/
      },950);/* wait 950ms for slide-in animation*/

  }

  function activeCard( card_selected ) {
    const cardStyles = document.getElementsByClassName('style');

    for(let card of cardStyles) {
      card.style.backgroundColor = '#1d1d1d';
      card.className = 'style';
    }

    card_selected.style.backgroundColor = 'black';
    card_selected.className = 'style card_active';
  }

  return {
    showNextPage: showNextPage,
    activeCard: activeCard
  }
  
})();


var request = (function () {

  async function getUserInfo( username ) { /* Get data from API */
    let resp = await fetch(`https://cors.io/?https://www.codewars.com/api/v1/users/${username}`);

    let data = await resp.json();

    data.image = await _getImageProfile( username );
    
    return data;
  }
  
  async function _getImageProfile( username ) { /* Web scrap to get profile image */
    let resp = await fetch(`https://cors.io/?https://www.codewars.com/users/${username}`);
    
    let html_string = await resp.text();
    
    let parser = new DOMParser();
    
    let body = parser.parseFromString(html_string,'text/html');
    
    let img = body.querySelector('.has-tip');
    
    return img.src;
  }

  return {
    getUserInfo: getUserInfo
  }
  
})();


var cardCreator = (function () {
   
  function _addSkillsImg( userdata, container ) {
    
    let lang_img = undefined;
    
    for(let lang of Object.keys( userdata.ranks.languages )) {

      switch( lang ) {

        case 'cpp' : 
          lang_img = document.createElement('img');
          lang_img.src = 'img/cpp.png';
          container.appendChild(lang_img);
        break;
          
        case 'csharp' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/csharp.png';
          container.appendChild(lang_img);
        break;

        case 'javascript' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/js.png';
          container.appendChild(lang_img);
        break;

        case 'java' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/java.png';
          container.appendChild(lang_img);
        break;

        case 'php' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/php.png';
          container.appendChild(lang_img);
        break;

        case 'python' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/python.png';
          container.appendChild(lang_img);
        break;

        case 'sql' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/sql.png';
          container.appendChild(lang_img);
        break;
          
        case 'ruby' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/ruby.png';
          container.appendChild(lang_img);
        break;
          
        case 'haskell' :
          lang_img = document.createElement('img');
          lang_img.src = 'img/ruby.png';
          container.appendChild(lang_img);
        break;

      }
  }
    
    return container;
    
  }
  
  function createVerticalCard( userdata ) {
  
  const card_container = document.getElementById('cardV');
  
  card_container.innerHTML = 
    `
      <p id="leader_positionV"><span>#${ userdata.leaderboardPosition }</span></p>

      <div id="profilepicV">
          <img src="${ userdata.image }" alt="profile pic">
      </div>

      <div id="namesV">
          <h3 id="usernameV">${ userdata.username }</h3>
          <p id="nameV">${ userdata.name }</p>
      </div>

      <div id="rankV" style="background-color: ${ userdata.ranks.overall.color }; box-shadow: 0 0 2px ${ userdata.ranks.overall.color };">
          <p>${ userdata.ranks.overall.name }</p>
      </div>
  
      <p id="clanV">${ userdata.clan }</p>
      
      <div id="statsV">
          
          <div id="row1V">
            
            <div id="honorV">
              <p><span>${ userdata.honor }</span></p>
              <p>Honor</p>
            </div>
          
            <div id="scoreV">
              <p><span>${ userdata.ranks.overall.score }</span></p>
              <p>Score</p>
            </div>
            
          </div>
          
          <div id="row2V">
            
            <div id="completedV">
              <p><span>${ userdata.codeChallenges.totalCompleted }</span></p>
              <p>Katas completed</p>
            </div>
            
          </div>
          
        </div>
      
    `
  let skills = document.createElement('div');
  skills.id = 'skillsV';
  
  card_container.appendChild( _addSkillsImg( userdata, skills ) );
  
  card_container.style.display = 'block';
}
  
  function createHorizontalCard( userdata ) {
    const card_container = document.getElementById('cardH');
    card_container.style.background = `linear-gradient(45deg, ${ userdata.ranks.overall.color } 33%, #222222 0)`;
  
    card_container.innerHTML = 
    `
        <div id="left">
          
          <div id="rankH">
            <p>${ Math.abs( parseInt( userdata.ranks.overall.rank ) ) }</p>
          </div>
        
          <div id="profilepicH">
            <img src="${ userdata.image }">
          </div>
          
        </div>

        <div id="right">
        
          <div id="positionH"><p><span>#${ userdata.leaderboardPosition }</span></p></div>
          
          <div id="namesH">
            <h3>${ userdata.username }</h3>
            <p>${ userdata.name }</p>   
          </div>

          <div id="statsH">
            
            <div id="honorH">
              <p><span>Honor</span></p>
              <p>${ userdata.honor }</p>
            </div>
            
            <div id="completedH">
              <p><span>Katas</span></p>
              <p>${ userdata.codeChallenges.totalCompleted }</p>
            </div>
          
            <div id="scoreH">
              <p><span>Score</span></p>
              <p>${ userdata.ranks.overall.score }</p>
            </div>
            
          </div>

    `
    let skills = document.createElement('div');
    skills.id = 'skillsH';
    skills.style.backgroundColor = userdata.ranks.overall.color;
    card_container.appendChild( _addSkillsImg( userdata, skills ) );
    
    card_container.style.display = 'block';
  }
  
  return {
    createHorizontalCard : createHorizontalCard,
    createVerticalCard : createVerticalCard,
  }
})();

function cleanData(data) {

  if(data.clan == '') {
    data.clan = 'Clan: unknown';
  }
  else{
    data.clan = 'Clan: ' + data.clan;
  }

  switch(data.ranks.overall.color) {
        
      case 'white' : data.ranks.overall.color = '#FEFEFE';
      break;
      
      case 'yellow' : data.ranks.overall.color = '#ECB613';
      break;
      
      case 'blue' : data.ranks.overall.color = '#3c7ebb';
      break; 
      
      case 'purple' : data.ranks.overall.color = '#866cc7';
      break;
      
      case 'black' : data.ranks.overall.color = '#555555';
      break;
    }

  
  return data;
}


/*init*/


const btn_list = document.getElementsByClassName('nextbtn');
const page_list = document.getElementsByClassName('page');

var userdata = undefined;

btn_list[0].onclick = () => { /* <CLICK> page 1 Button */
  
  let error_msg = document.getElementById('error_msg');
  error_msg.style.display = 'none';
  
  document.querySelector('.loader').style.display = 'block';//<
                                                            //< Start loading
  btn_list[0].style.display = 'none';                       //<
  
  let username = page_list[0].querySelector('input').value;
  
  
  request.getUserInfo( username )
  .then( (data) => { /* Everything OK */
    document.querySelector('.loader').style.display = 'none'; /* Stop loading */
    
    userdata = cleanData( data );
    css_manipulator.showNextPage(btn_list[0].parentElement);
  })
  .catch( (err) => { /* Show Error */
    document.querySelector('.loader').style.display = 'none'; /* Stop loading */
    
    error_msg.style.display = 'block';
    
    if(err.message == 'NetworkError when attempting to fetch resource.') {//  Network Error
      error_msg.textContent = 'ERROR: NetworkError when attempting to get user info.';
    }
    else{ 
      error_msg.textContent = 'ERROR: USER NOT FOUND';
    }
    
     btn_list[0].style.display = 'block';

  });
  
}

var card_styles_list = document.getElementsByClassName('style');

for(let style of card_styles_list) {
  style.onclick = () => css_manipulator.activeCard( style );
}
card_styles_list[0].click(); /*vertical card selected by default*/


var id_card_selected;
btn_list[1].onclick = () => { /* <CLICK> page 2 Button */
  
  if(card_styles_list[0].className == 'style card_active') {
    cardCreator.createVerticalCard( userdata );
    id_card_selected = 'cardV';
  }
  else {
    cardCreator.createHorizontalCard(userdata);
    id_card_selected = 'cardH';
  }
  
  css_manipulator.showNextPage(btn_list[1].parentElement);
}