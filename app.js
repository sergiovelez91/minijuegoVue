Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      rounds: 0,
      result: null,
      message: []
    }
  },
  computed: {
    monsterLive() {
      if(this.monsterHealth <= 0) {
        return {width: '0%'}
      }
      return {width: this.monsterHealth + '%'}
    },
    playerLive() {
      if(this.playerHealth <= 0) {
        return {width: '0%'}
      }
      return {width: this.playerHealth + '%'}
    },
    buttonSpecialAttackDisabled() {
      if(this.monsterHealth <= 0) {
        return {width: '0%'}
      }
       return this.rounds % 3 !== 0
    }
  },
  methods: {
    startGame() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.rounds = 0
      this.result = null
      this.message = []
    },
    attackMonster() {
      let atackValue = Math.floor(Math.random()*(10-5)) + 5
      this.monsterHealth -= atackValue
      this.attackPlayer()
      this.rounds += 1
      this.logMessage("player", "attack", atackValue)
    },

    attackPlayer() {
      let atackValue = Math.floor(Math.random()*(15-8)) + 8
      this.playerHealth -= atackValue
      this.logMessage("monster", "attack", atackValue)
    },

    specialAttack() {
      if(this.rounds % 3 === 0) {
        this.rounds += 1
        let atackValue = Math.floor(Math.random()*(25-10)) + 10
        this.monsterHealth -= atackValue
        this.attackPlayer()
        this.logMessage("player", "special attack", atackValue)
      }
    },

    logMessage(who, what, val) {
      this.message.unshift({
        by: who,
        type: what,
        action: val
      })
    },

    heal() {
      this.rounds += 1
      if(this.playerHealth + 15 > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += 15
      }
      this.attackPlayer()
      this.logMessage("player", "heal", "15")
    },

    surrender() {
      this.result = "lost"
    }
  },
  watch: {
    playerHealth(val){
      if(val <= 0 && this.monsterHealth <= 0) {
       this.result = "draw"
      } else if (val <= 0) {
        this.result = "lost"
      }
    },
    monsterHealth(val) {
      if(val <= 0 && this.playerHealth <= 0) {
        this.result = "draw"
      } else if (val <= 0) {
        this.result = "win"
      }
    },
  }
}).mount('#game');