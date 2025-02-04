
function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = function () {
        return this.rank + this.suit
    }
    this.getSuit=function (){
        if(this.suit==="wan"){
            return 1
        }
        if(this.suit==="tiao"){
            return 2
        }
        if(this.suit==="tong"){
            return 3
        }
    }
}

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x) ;
        return this;
    };
}


/**
 * 创建Player
 */
function Player() {
    this.handCard = [];
}

function game() {
    this.p1 = new Player()
    this.m1 = new Mj
    this.m1.shuffle()
    this.getCard = function () {
        for (let i = 0; i <= 12; i++) {
            this.p1.handCard.push(this.m1.duck.shift())
        }
        this.p1.handCard = new Arth().sortCard(this.p1.handCard)
    }
    this.play = function () {
        this.p1.handCard.push(this.m1.duck.shift())
        this.p1.handCard = new Arth().sortCard(this.p1.handCard)
        if (new Arth().findJiang(this.p1.handCard)) {
            let hp=document.getElementById("hp")
            hp.style.backgroundColor="rgba(255,0,0,1)"
            hp.onclick=function (){alert("胡牌了")}
        }else {
            let hp=document.getElementById("hp")
            hp.style.backgroundColor="rgba(255,0,0,0)"
        }
            this.showPl(this.p1.handCard)
    }
    this.showPl = function (card) {
       
        console.log(card)
        this.cb = []
        card.forEach((v, i) => {
            this.cb[i] = document.getElementById(`l${i}`)
            this.cb[i].style.backgroundImage = `url(img/${v.rank+v.suit}.png)`
            this.cb[i].onclick = function () {
                m.p1.handCard.splice(i, 1)
                m.play()
            }

        })
    }
    // this.showPl=function (card){
    //     this.cb=[]
    //     this.table=document.createElement("table")
    //     this.table.setAttribute("id","100")
    //     this.tr = document.createElement("tr")
    //     card.forEach((v,i)=>{
    //         this.td = document.createElement("td")
    //         this.cb[i]=document.createElement("button")
    //         this.cb[i].innerText=v.rank + v.suit
    //         this.cb[i].setAttribute("id",i)
    //         this.td.appendChild(this.cb[i])
    //         this.tr.appendChild(this.td)
    //         this.cb[i].onclick=function (){
    //             m.p1.handCard.splice(i,1)
    //             m.play()
    //             }
    //
    //     })
    //     this.table.appendChild(this.tr)
    //     document.body.appendChild(this.table)
    // }

}


function show(card) {
    let table = document.createElement("table")
    let tr = document.createElement("tr")
    card.forEach((v, i) => {
        let td = document.createElement("td")
        td.innerText = v.rank + v.suit
        tr.appendChild(td)
        if (((i + 1) % 13 === 0) || (i === card.length - 1)) {
            table.appendChild(tr)
            tr = document.createElement("tr")
        }
    })
    document.body.appendChild(table)
}

/**
 * 创建新麻将,将包括三个方法:
 * 1、创建新麻将方法
 * 2、显示麻将方法
 * 3、洗牌方法
 *
 */
function Mj() {
    this.duck = [];

    /**
     * 创建新麻将方法：
     * 将创建一副新的麻将
     */
    this.newMj = function () {
        var s = ["wan", "tiao", "tong"];
        for (var k = 0; k < 4; k++) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 9; j++) {
                    this.duck.push(new Card(j + 1, s[i]));
                }
            }
        }
    }
    /**
     * 显示麻将方法:
     * 将显示现有的牌,打印在页面上
     */


    this.shuffle = function () {
        this.duck.shuffle()

    }
    this.newMj()


}

function Arth() {

    this.sortCard = function (card) {
        let c = [];
        let temArr = [];
        card.sort(function (a, b) {
            return a.getSuit() - b.getSuit()
        })
        for (let i = 0; i <= card.length - 1; i++) {
            temArr.push(card[i]);
            if (i === card.length - 1) {
                temArr.sort((a, b) => a.rank - b.rank);
                c = [...c, ...temArr];
                temArr.splice(0, i + 1);
                break
            } else if (card[i + 1].suit !== card[i].suit) {
                temArr.sort((a, b) => a.rank - b.rank);
                c = [...c, ...temArr];
                temArr.splice(0, i + 1);
            }
        }
        c.push()
        return c
    }
    /***
     *
     * @param c Card对象
     * @param i 从第几位开始删除
     * @param n 删除几个元素
     */
    this.del = function (c, i, n) {
        return c = [...c.splice(0, i), ...c.splice(n, c.length - n)]
    }

    this.findJiang = function (c) {
        let j = 1

        for (let i = 0; i < c.length - 1; i++) {
            if (c[i].value() === c[j].value()) {
                if (this.ifshun(this.del(Array.from(c), i, 2))) {
                    return true
                }
            }
            j++
        }
        return false
    }
    this.ifshun = function (c) {
        if (c.length === 0) {
            return true;
        }
        for (let i = 0; i < c.length - 2; i++) {
            if ((c[i + 2].rank - c[i + 1].rank === c[i + 1].rank - c[i].rank && c[i + 2].rank - c[i + 1].rank === 1) &&
                (c[i].suit === c[i + 1].suit && c[i + 1].suit === c[i + 2].suit)) {
                return this.ifshun(this.del(c, i, 3))
            }
            if (c[i + 2].value() === c[i + 1].value() && c[i + 1].value() === c[i].value()) {
                return this.ifshun(this.del(c, i, 3))
            }
            if (c[i + 1].value() === c[i + 2].value()) {
                let tem = []
                tem = c[i + 1]
                c[i + 1] = c[i]
                c[i] = tem
                return this.ifshun(c)
            }
        }
        return false;
    }
}

function clearAll() {
    let ob = document.getElementById()
}

var t1 = [
    {name: "a", age: 6},
    {name: "h", age: 8},
    {name: "i", age: 7},
    {name: "c", age: 5}
]

var x = [
    new Card(2, "c"),
    new Card(3, "a"),
    new Card(2, "b"),
    new Card(2, "a"),
    new Card(3, "a"),
    // new Card(3, "b"),
    // new Card(4, "b"),
    // new Card(6, "c"),
    // new Card(7, "c"),
    // new Card(8, "c"),
    // new Card(1, "c"),
    // new Card(9, "b"),
    // new Card(9, "b"),
    // new Card(9, "b"),

]

let m = new game()
m.getCard()
m.play()


// console.table(t1.sort(function(a,b){return a.age-b.age}))
// console.table(x.sort((a,b) => a.suit.charCodeAt()-b.suit.charCodeAt()))


