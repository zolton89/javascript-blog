'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML),
};

const opts = {
  optArticleSelector: '.post',
  optTitleSelector: '.post-title',
  optTitleListSelector: '.titles',
  optArticleTagsSelector: '.post-tags .list',
  optArticleAuthorSelector: '.post-author',
  optTagsListSelector: '.tags.list',
  optCloudClassCount: '5',
  optCloudClassPrefix: 'tag-size-',
  optAuthorsListSelector: '.list.authors'
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  
  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selectior (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector); 

  /* [DONE] add class 'active' to the correct article */ 
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.optTitleListSelector);
  function clearTitleList() {
    titleList.innerHTML = '';
  }
  clearTitleList();

  /* for each article */
  const articles = document.querySelectorAll(opts.optArticleSelector + customSelector);
  for(let article of articles){
  
    console.log(article);
  
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(opts.optTitleSelector).innerHTML;
    let html = '';

    /* get the title from the title element */
    console.log('Title: ',articleTitle);

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
  }
  

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();


function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.optCloudClassCount - 1) + 1);

  return opts.optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */
      const tagHTMLData = {id: tag, tag: tag};
      const tagHTML = templates.articleTagLink(tagHTMLData);

      /* const linkHTML = '<li><a href="#tag-'+ tag +'"><span>'+ tag +'</span></a></li>'; */

      /* add generated code to html variable */
      html = html + tagHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1; 
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
  for (let activeTag of activeTags){
  

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */ 
  let allAuthors = {};

  /* find all artiicles */
  const articles = document.querySelectorAll(opts.optArticleSelector);

  /* Start Loop: for articles: */
  for (let article of articles){

    /* Find autorhs wrapper */
    const authorWrapper = article.querySelector(opts.optArticleAuthorSelector);
    console.log (authorWrapper); 

    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);

    /* generate html of the link */
    const authorLinkData = {id: author, author: author};
    const authorLink = templates.articleAuthorLink(authorLinkData);

    /* insert html of all the links into the authors wrapper */
    authorWrapper.innerHTML = authorLink;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[author]){
      /* [NEW] add generated code to allAuthors array */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    //END loop for every article 
  }

  /* [NEW] find list of Authors in right column */
  const authorList = document.querySelector(opts.optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let author in allAuthors){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsData.authors.push({
      author: author, 
    });

  /* [NEW] END LOOP: for each tag in allTags: */
  }
   
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = templates.authorsListLink(allAuthorsData);

}

generateAuthors();

function authorClickHandler(event) {

  /* Prevent default action for this event */
  event.preventDefault();

  /* Make new constant  "clickedElement" with this */
  const clickedElement = this; 
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make constant tagAuthor extract tag from the "href" constant */
  const author = href.replace('#author-','');

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
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* start loop */
  for (let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active'); 
    console.log('Active: ', clickedElement);
    
    /*End loop*/
  }

  /* execute function */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  /*find all links to tagAuthors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /*start loop*/
  for (let authorLink of authorLinks) { 

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  
    /*End loop*/
  }
}
addClickListenersToAuthors();