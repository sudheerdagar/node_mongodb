
const http = require('http')
const url = require('url')//used for parsing variables form url
const fs = require('fs');




//reading templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


//reading the data only once so that dont have to read again every time page refreshes
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataobj = JSON.parse(data);//here dataobj is an array of 5 objects
 

const replacetemplate=(temp,product)=>
{
{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
  }
}


const server = http.createServer((req, res)=>{

    const {query,pathname}=url.parse(req.url,true);


    //overview page
    if (pathname == '/' || pathname == '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardsHtml = dataobj.map((el)=>{
        return replacetemplate(tempCard,el);
        }).join('');
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
res.end(output);
    }
    //product page
    else if (pathname == '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product=dataobj[query.id];
    
    const output=replacetemplate(tempProduct,product);

    res.end(output);

}
//api
else if (pathname == '/api') {
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.end("this is other");
}


    // console.log(req.url);

    

})

server.listen(8080, () => {
    console.log("server is listning on 8080");
})
