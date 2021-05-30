'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');


  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    // console.log(html);
    // titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);

    }
  }
}

generateTitleLinks();

function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){

      const tagHTML = `<li><a href="#${tag}">${tag}</a></li>`;
      html = html + tagHTML;
    }
    wrapperTags.insertAdjacentHTML('beforeend', html);
  }
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll(href);
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
  /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const showLinks = document.querySelectorAll('a.[href="#' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let showLink of showLinks){
  /* add class active */
    showLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagsSelector);
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

//addClickListenersToTags();


