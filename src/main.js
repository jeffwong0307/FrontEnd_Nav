const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) // 把字符串重新编程对象
const hashMap = xObject || [
    {
        logo:'A', 
        logoType:'text', 
        url:'https://www.acfun.cn'
    },
    {
        logo:'B', 
        logoType:'image', 
        url:'https://bilibili.com'
    },
    {
        logo:'J', 
        logoType:'text', 
        url:'https://juejin.cn'
    }
]

const simplifyUrl = (url) =>{
    return url.replace('https://','')
              .replace('http://','')
              .replace('www.','')
              .replace(/\/.*/,'') // 删除 /开头的内容直至结尾
}

const render = ()=>{
    // 先删掉之前的li
    $siteList.find('li:not(.last)').remove()
    // 再渲染新的
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addBtn')
    .on('click',()=>{
        let url = window.prompt('你要添加的网址是：')
        console.log(url);
        if(url.indexOf('http')!=0){
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0], // 可加 .toUpperCase 转换成大写，也可在CSS中控制
            logoType: 'text',
            url: url
        })
        render()
    })

window.onbeforeunload = () =>{
    // console.log('页面要关闭了')
    
    const string = JSON.stringify(hashMap) 
    // 把对象变成字符串，因为localStorage 只能保存字符串，不能保存对象
    localStorage.setItem('x', string) 
    // window 可省略，localStoraae 是一个全局变量
    
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
}

$(document).on('keypress',(e)=>{
    const key = e.key; // 可以简写成 const {key} = e
    for(let i = 0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})