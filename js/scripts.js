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
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorSelectorA = '.post-author a',
  optArticleTagsSelectorA = '.post-tags .list li a';

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
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      //const tagHTML = '<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
      html = html + tagHTML;
    }
    wrapperTags.insertAdjacentHTML('afterbegin', html);
  }
}
generateTags();

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const authorName = article.getAttribute('data-author');
    const authorLink = `<a href="#${authorName}"> by ${authorName}</a>`;
    const postAuthor = article.querySelector(optArticleAuthorSelector);
    postAuthor.innerHTML = authorLink;
  }
}
generateAuthors();



function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeLinks = document.querySelectorAll('.post-tags .list .active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  const showLinks = document.querySelectorAll('.post-tags .list [href="' + href + '"]');

  for(let showLink of showLinks){
    showLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll(optArticleTagsSelectorA);

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function authorClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#', '');

  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  const postAuthors = document.querySelectorAll(optArticleAuthorSelectorA);

  for(let author of postAuthors){
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();


// function testFunction(){
//   console.log('correct');
// }
