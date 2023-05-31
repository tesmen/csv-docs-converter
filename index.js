import fetch from 'node-fetch'
import { getRandomName, getFriends } from './GetRandomName.js'

// const { Client } = require("@elastic/elasticsearch");

class Doer {

    async doIt(start, count) {
        for(let i = start; i < start + count + 1; i++) {
            await this.createDoc(i, getRandomName(), getFriends(10))
            console.log(`${i} / ${count}`)
        }
    }

    async createRandomUser(id) {
        const name = getRandomName()
        const friends = getFriends(10)
        return {
            id: id ? id : Math.floor(Math.random() * 1000000),
            name_keyword: name,
            name_text: name,
            friends_keyword: friends,
            friends_text: friends,
        }
    }

    async createDocBulk(count = 100) {
        const resArr = []
        let c = 0

        while(c < count) {
            const user = await this.createRandomUser()
            resArr.push(`{ "create" : { "_index" : "users-index", "_type": "doc", "_id" : "${user.id}" } }\n`)
            resArr.push(JSON.stringify(user) + `\n`)
            c++
        }

        let payload = resArr.reduce((prev, curr) => {
            return prev + curr
        })

        // console.log(payload)
        const res = await fetch(`http://localhost:4592/_bulk`, {
            method: 'PUT',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
        })
        // console.log(await res.text())
    }

    async createDoc(id, name, friends) {
        const payload = {
            id: id,
            name_keyword: name,
            name_text: name,
            friends_keyword: friends,
            friends_text: friends,
        }

        await fetch(`http://localhost:4592/users-index/doc/${id}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
let mul = 0
const c = new Doer()

while(mul < 100){
    await c.createDocBulk(10000)
    mul++
}

// await c.createDoc(1,'user')
// c.doIt(10 ^ 6)
// console.log(1000)
