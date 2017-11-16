var count = 0;
var searchWord;
var dataG;
var dataW;
var url1, url2;
document.querySelector('.submitButton').addEventListener('click', function() {
  searchWord = document.querySelector('.searchBar').value;
  console.log(searchWord);
  var newSearchWord = searchWord.split(" ").join("%20");
  url1 = 'https://content.guardianapis.com/search?q=' + newSearchWord + keys.apiGuardian;
  var newSearchWordw = searchWord.split(" ").join("+");
  url2 = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + newSearchWordw + '&redirects';
  console.log('wiki urk is ' + url2)
  searchWordfunc(url1, url2);
  // document.querySelector('searchBar').contentText="";

});

function searchWordfunc(guardianURL, wikiURL) {
  fetch(guardianURL, function(data) {

    dataG = filterGuardian(data);
    if (count == 2) {
      datatoDOMG(dataG);
      datatoDOMW(dataW);
    }
  });
  fetch(wikiURL, function(data) {

    dataW = filterWiki(data);
    if (count == 2) {
      datatoDOMG(dataG);
      datatoDOMW(dataW);
    }
  });
}
// ,FilterDataFunc,datatoDOM
var count = 0;

function fetch(apiCall, cb) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      count++;
      cb(JSON.parse(xhr.responseText));
    }
  })
  xhr.open('GET', apiCall);
  xhr.send();
}




function filterGuardian(data) {
  var filteredData = data.response.results.reduce(function(acc, number) {
    acc.push({
      "Title": number.webTitle,
      "URL": number.webUrl
    })
    return acc;
  }, []);
  return filteredData;
  // console.log(filteredData);
  // return func(filteredData);
}

function filterWiki(data) {
  console.log(data);
  var new_obj = {};
  var keys = Object.keys(data.query.pages);
  // console.log('keys is' + keys);
  new_obj['Title'] = data.query.pages[keys[0]].title;
  new_obj['Content'] = data.query.pages[keys[0]].extract;
  console.log('new obj is' + new_obj);
  return new_obj;
  // console.log(filteredData);
  // return func(filteredData);
}



function datatoDOMG(filteredData) {
  var theNews = document.querySelector('.news');
  filteredData.forEach(function(obj) {
    var new_div = document.createElement("div");
    var new_article = document.createElement("article");
    var h2_title = document.createElement("h2");
    var p_tag = document.createElement("p");
    h2_title.textContent = obj.Title;
    p_tag.textContent = obj.URL;
    new_article.appendChild(h2_title);
    new_article.appendChild(p_tag);
    new_div.appendChild(new_article);
    theNews.appendChild(new_div);
  })
}

function datatoDOMW(filteredData) {
  var theNews = document.querySelector('.wiki');
  var new_div = document.createElement("div");
  var new_article = document.createElement("article");
  var h2_title = document.createElement("h2");
  var p_tag = document.createElement("p");
  // var new_div = document.createElement("div").classList.add('div__article');
  // var new_article = document.createElement("article").classList.add('article__wiki');
  // var h2_title = document.createElement("h2").classList.add('div__article--title');
  // var p_tag = document.createElement("p").classList.add('div__article--url');
  h2_title.textContent = filteredData.Title;
  p_tag.textContent = filteredData.Content;
  new_article.appendChild(h2_title);
  new_article.appendChild(p_tag);
  new_div.appendChild(new_article);
  theNews.appendChild(new_div);


}

var update = function(newState){

};

var renderState = function (state){

}

// getGuardian("dog", filterGuardian, '&api-key=279c3a85-521e-412e-a0a4-5c79365d98dd', datatoDOM);
