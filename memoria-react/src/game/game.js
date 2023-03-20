let game = {     /*variável game que recebe um objeto*/ 

        lockMode: false,
        firstCard: null,
        secondCard: null,

    techs:        /*objeto que recebe um array(array de 10 posições em texto que representam as cartas do jogo)*/
        ['bootstrap',
            'css',
            'eletron',
            'firebase',
            'html',
            'javascript',
            'jquery',
            'mongo',
            'node',
            'react'],

    cards: null,

        setCard: function(id){
           let card = this.cards.filter(card=>card.id === id)[0]
            console.log(card)
           if(card.flipped || this.lockMode){
            return false
           }
           if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
           }else{
            this.secondCard = card 
            this.secondCard.flipped = true 
            this.lockMode = true
            return true
           }
        },
        
        checkMatch: function(){
            if(!this.firstCard || !this.secondCard){
                return false
            }
            return this.firstCard.icon === this.secondCard.icon

        },

        clearCards: function(){
            this.firstCard = null
            this.secondCard = null
            this.lockMode = false
        },

        unflipCards(){
            this.firstCard.flipped = false
            this.secondCard.flipped = false
            this.clearCards()
        },

        checkGameOver(){
           return this.cards.filter(card=>!card.flipped).length == 0
        },

         

    createCardsFromTechs: function () {  /*função de criação das cartas*/
        this.cards = [] /*cartas começa vazia*/  

        this.techs.forEach((tech) => {  /*Aqui é criado um for no array tech*/
            this.cards.push(this.createPairFromTech(tech))  /**/
    })

    this.cards = this.cards.flatMap(pair => pair)
    this.shuffleCards()
    return this.cards

},  

createPairFromTech: function(tech) {
    return [{
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false
    }, {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false
    }]
},

createIdWithTech: function(tech) {
    return tech + parseInt(Math.random() * 1000)
},


shuffleCards: function(cards) {
    let currentIndex = this.cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    }
},

flipCard: function(cardId, gameOverCallBack, noMatchCallBack){
    if(this.setCard(cardId)){
        if(this.secondCard){
            if (this.checkMatch()){
                this.clearCards()
                if (this.checkGameOver()) {
                    //game over
                    gameOverCallBack()
                }
            }else{
                setTimeout(()=>{
                    //no match
                        this.unflipCards()
                       noMatchCallBack() 
                },1000)
            }
        }
     }
}

}

export default game