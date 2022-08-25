import axios from 'axios'
import assert from 'assert'
import { crearServidor } from "../src/server.js";

let server

async function conectar({ port = 0 }) {
    return new Promise((resolve, reject) => {
        server = crearServidor().listen(3000, err => {
            if (err) {
                reject(err)
            } else {
                resolve(port)
            }
        })
    })
}

async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

describe('servidor Mongo', () => {

    const url = "http://localhost:3000"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyZjAzYTgzNzZlYWJhOGQ1NWQzMmI2YSIsImlkIjoiNkdUVFJRUzlVT05SREtJMkxITFJLSyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkajhJTDZaVFRqTUNqeXhubkEyVk16LkVIQy5SbFJlRU56RUZCMmxEUG5ZZE16YnVDcEw5cWkiLCJyb2xlcyI6WyJhZG1pbiJdLCJ1c2VybmFtZSI6bnVsbCwibmFtZSI6ImFkbWluIiwibGFzdG5hbWUiOiJhZG1pbiIsImFkZHJlc3MiOm51bGwsImRhdGVCaXJ0aCI6bnVsbCwicGhvbmUiOiIrNTQxMTQ0NDQxMjM0IiwiYXZhdGFyIjpudWxsfSwiaWF0IjoxNjYwMDA3OTAzLCJleHAiOjE2NjAwMTE1MDN9.7OkHEsb5rOjQJo33QZ2wzp7JbGBowLi39jg0i2HQUBA"
    const username = "admin@admin.com"
    const password = "1234"
    const productoID = "200RHTQ24MRA5XMU9MEH56"
    const productoNuevo = {                    
                            "name": "Prueba de test",
                            "description": "Descripcin del Test",
                            "category": "Pruebas",
                            "code": 124,
                            "image": "https://cdn1.iconfinder.com/data/icons/scenarium-vol-12/128/012_031-256.png",
                            "price": 1500,
                            "stock": 25
                        }

    before(async () => {
        await conectar({ port: 8080 })
    })

    after(async () => {
        await desconectar()
    })

    beforeEach(() => { })

    afterEach(() => { })

    describe('LOGIN', () => {
        describe('API GET /login', () => {
            it('deberia loguear al usuario y obtener el token', async () => {
                const { data } = await axios.post( url + '/login', {
                    "email":username,
                    "password":password
                })
                assert.ok(data.msg)
            })
        })
    })

    describe('PRODUCTOS', () => {
        describe('API GET api/productos', () => {
            it('deberia devolver todos los proudctos', async () => {
                const { status } = await axios.get( url + '/api/products')
                assert.strictEqual(status, 200)
            })
        })

        describe('API GET api/products/{PRODUCT_ID}', () => {
            it('deberia devolver la informacion del producto indicado', async () => {
                const { data } = await axios.get( url + '/api/products/' + productoID)
                assert.ok(data.id)
                assert.ok(data.name)
                assert.ok(data.price)
                assert.ok(data.stock)
            })
        })

        describe('API GET api/productos/{PRODUCT_ID}', () => {
            it('deberia devolver la informacion del producto indicado', async () => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const { data } = await axios.post(url + '/api/products',productoNuevo)
                assert.ok(data.id)
                assert.ok(data.name)
                assert.ok(data.price)
                assert.ok(data.stock)
            })
        })

    })

})
