'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleAttribute = clickedElement.getAttribute('href');
  console.log(articleAttribute);

  /* [DONE] find the correct article using the selectior (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleAttribute); 
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */ 
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleAuthorSelector = '.post .post-author';
const optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log('Title list: ', titleList);
         

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){
  
    console.log(article);
  
  
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    console.log('Title: ',articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#'+ articleId +'"><span>'+ articleTitle +'</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      
      const linkHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
  

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('data-tags~="' + tag +'"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.list.list-horizontal a');

  /* START LOOP: for each link */
  for (const link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all artiicles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* Start Loop: for articles: */
  for (let article of articles) {

    /* Find autorhs wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log (authorWrapper); 

    /* get authors from data-author attribute */
    const Authors = article.getAttribute('data-author');
    console.log(Authors);

    /* generate html of the link */
    const linkAuthor = '<p class="post-author"><a href="#author-' + Authors + '"><span>by ' + Authors + '</span></a></p>';

    /* insert html of all the links into the authors wrapper */
    authorWrapper.innerHTML = linkAuthor;

  /* end loop */
  }

}
generateAuthors();

function authorClickHandler(event) {

  /* Prevent default action for this event */
  event.preventDefault();

  /* Make new constant  "clickedElement" with this */
  const clickedElement = 'this'; 
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make constant tagAuthor extract tag from the "href" constant */
  const tagAuthor = href.replaced('author-','');

  /* find all tagAuthor links with class active */
  const activeAuthors = document.querySelectorAll('a .active[href^="#author-"]');
  console.log(activeAuthors); 

  /* Start loop */
  for (let activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classList.remove('active');
    
    /*end loop */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */ 
  const authorLinks = document.querySelectorAll('href^=#author-"]');

  /* start loop */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active'); 
    console.log('Active: ', clickedElement);
    
    /*End loop*/
  
  }

  /* execute function */
  generateTitleLinks('[data-author="' + tagAuthor + '"]');

}

function addClickListenersToAuthors() {
/*find all links to tagAuthors */
  const links = document.querySelectorAll('[href^="#author-"]');

  /*start loop*/
  for (const link of links) { 

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  
    /*End loop*/
  }

}

addClickListenersToAuthors();