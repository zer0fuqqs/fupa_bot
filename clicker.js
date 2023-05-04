const request = require('request')
const jsdom = require("jsdom");
const fs = require("fs")
const { JSDOM } = jsdom;

const proxyTxt = fs.readFileSync('proxy.txt', 'utf-8').split('\r')

let proxyListe = [];
for (let i = 0; i < proxyTxt.length; i++) {
    proxyListe.push(proxyTxt[i].replace('\n', ''))
}


function createProxy(task) {

    let proxySplit = proxyListe[task].split(':')

    const user = proxySplit[2]
    const password = proxySplit[3]
    const host = proxySplit[0]
    const port = proxySplit[1]

    const proxyUrl = "http://" + user + ":" + password + "@" + host + ":" + port; 

    console.log("Createt following Proxy "+ proxyUrl)

    return proxyUrl
}




function callback(err, res, body) {
    console.log(res.statusCode)
    const dom = new JSDOM(res.body)
    console.log(dom.window.document.querySelectorAll('span.hudpXq')[9].textContent)
}

function callback2(err, res, body) {
    console.log(err)
    console.log(res.statusCode) 
    console.log("Aktuelle Klicks: "+ JSON.parse(body).clicks)
}

function main (task) {

    console.log("Making Request")

    let proxyUrl = createProxy(task)
    
let options2 = {
    method: 'POST',
    url: 'https://tracking.fupa.net/v1/clicks',
    proxy: proxyUrl,
    headers: {
        "accept": "application/json, text/plain, */*",
        "user-agend": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.fupa.net/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: '{"entity":"player","id":1676331}'
}

    console.log(new Date())

    request(options2, callback2)
}

main(3)