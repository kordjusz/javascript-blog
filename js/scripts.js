'use strict';

const opt = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  ArticleTagsSelector: '.post-tags .list',
  TitleListSelector: '.titles',
  ArticleAuthorSelector: '.post-author',
  ArticleAuthorSelectorA: '.post-author a',
  ArticleTagsSelectorA: '.post-tags .list li a',
  AuthorsListSelector: '.list.authors',
  AuthorsListSelectorA: '.list.authors a',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  TagsListSelector: '.tags.list',
  TagsListSelectorA: '.tags.list a'};

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




function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(opt.TitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);

    }
  }
}

generateTitleLinks();


function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(opt.ArticleSelector);

  for(let article of articles){
    const wrapperTags = article.querySelector(opt.ArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html = html + linkHTML;

      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    wrapperTags.insertAdjacentHTML('beforeend', html);
    const tagList = document.querySelector(opt.TagsListSelector);

    const tagsParams = calculateTagsParams(allTags);

    let allTagsHTML = '';

    for(let tag in allTags){

      const tagLinkHTML = '<li class="' + opt.CloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"><a href=#tag-' + tag + '>' + tag + ' (' + allTags[tag] + ') ' +  '</a></li>';
      allTagsHTML += tagLinkHTML;
    }

    tagList.innerHTML = allTagsHTML;
  }


}

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags){

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.max);

  }
  return params;
}

function calculateTagClass(count,params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.CloudClassCount - 1) + 1 );
  return classNumber;
}

generateTags();

function generateAuthors(){
  let authorTags = {};
  const articles = document.querySelectorAll(opt.ArticleSelector);
  let postAuthorrightBanner = document.querySelector(opt.AuthorsListSelector);


  for(let article of articles){

    const authorName = article.getAttribute('data-author');
    const authorLink = `<a href="#${authorName}"> by ${authorName}</a>`;
    //const authorLinkRightBanner = `<li><a href="#${authorName}">${authorName}</a></li>`;

    // eslint-disable-next-line no-prototype-builtins
    if(!authorTags.hasOwnProperty(authorName)){
      authorTags[authorName] = 1;
    } else {
      authorTags[authorName]++;
    }


    // for(let authorName of authorTags){
    //   const rightBannerAuthorHTMl = `<li><a href="#${authorName}">${authorName}(${authorTags[authorName]})</a></li>`;
    //   console.log(rightBannerAuthorHTMl);
    // }

    const postAuthor = article.querySelector(opt.ArticleAuthorSelector);

    postAuthor.innerHTML = authorLink;
    postAuthorrightBanner.innerHTML ='';

    console.log(authorTags);
    for(let authorName in authorTags){
      const authorTagLinkHTML = '<li><a href="#' + authorName + '">' + authorName + ' (' + authorTags[authorName] + ') ' +  '</a></li>';
      postAuthorrightBanner.innerHTML += authorTagLinkHTML;
    }
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
  const tagLinks = document.querySelectorAll(opt.ArticleTagsSelectorA);
  const rightBannerLInks = document.querySelectorAll(opt.TagsListSelectorA);

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }

  for(let rightBannerLink of rightBannerLInks){
    rightBannerLink.addEventListener('click', tagClickHandler);
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
  const postAuthors = document.querySelectorAll(opt.ArticleAuthorSelectorA);
  const rightBannerAuthors = document.querySelectorAll(opt.AuthorsListSelectorA);

  for(let author of postAuthors){
    author.addEventListener('click', authorClickHandler);
  }

  for(let rightBannerAuthor of rightBannerAuthors){
    rightBannerAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();


// function testFunction(){
//   console.log('correct');
// }
