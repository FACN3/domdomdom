function getGuardian (search, cb, apiKey){
  var baseURL = 'http://content.guardianapis.com/search?q=';
  var xhr = new XMLHttpRequest();
  var url = baseURL + search;
  var i=0;
  var res;
  res = xhr.addEventListener('load',function(){
    if(xhr.readyState==4 && xhr.status==200){
      var j=JSON.parse(xhr.responseText).response.results;
      i++;
      return (cb(j));
    }
  });
  console.log(res);
  if(i==1){
    return res;
  }
  xhr.open("GET", url+apiKey,true);
  xhr.send();

}

function filterGuardian (data){
  var filteredData= data.reduce(function(acc,number){
    acc.push({"Title":number.webTitle,"URL":number.webUrl })
    return acc;
  },[]);
  console.log(filteredData);
  return filteredData;
}
var k= getGuardian("dog",filterGuardian,'&api-key=279c3a85-521e-412e-a0a4-5c79365d98dd');
console.log(k);
