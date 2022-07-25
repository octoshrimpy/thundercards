class Lib {

  rand(min, max) {
    if (!min && !max) { return Math.random() }
    if (!max) {
      max = min
      min = 0
    } else {
      max += 1
    }

    return Math.floor(this.rand() * (max - min) + min)
  }

  sample(arr) {
    return arr[this.rand(arr.length)]
  }
}

class Card {

  constructor(data){
    this.title   = data.title
    this.front   = data.front
    this.back    = data.back
    this.history = {}
    this.unix    = data.unix
  }
}

class DB {
  constructor(filepath = null) {
    this.cards = {}
    if (filepath) {
      this.cards = this.jsonFromFilePath(filepath)
    }
  }

  jsonFromFilePath(path){
    let fileContents
    // open file or URL

    return JSON.parse(fileContents)
  }

  add(card) {
    let data = {
      unix: Date.now(),
      title: this.clean(card.title),
      front: this.clean(card.front),
      back: this.clean(card.back)
    }
    let storeCard = new Card(data)
    let id = Math.floor(Math.random() * 10) + 1
    this.cards[id] = storeCard
  }

  get(cardId) {
    return this.cards[cardId]
  }

  clean(string) {
    return encodeURIComponent(string)
  }
}

class System {
  constructor() {
    this.db = new DB()
    this.lib = new Lib()
  }

  getRandom(){
    let keys = Object.keys(this.db.cards)
    let card = this.db.cards[this.lib.sample(keys)]
    return card
  }

  get(id) {
    return this.db.get(id)
  }

  add(title = new Date().toDateString(), front = "", back= "") {
    this.db.add({title: title, front: front, back: back})
  }
}

let sys = new System()

sys.add("title 1", "front 1", "back 1")
sys.add("title 2", "front 2", "back 2")
sys.add("title 3", "front 3", "back 3")
sys.add("title 4", "front 4", "back 4")
sys.add("title 5", "front 5", "back 5")

console.log(sys.getRandom())