const chai = require('chai')
const subset = require('chai-subset')
const http = require('chai-http')
const server = require('./../index').app

chai.use(subset)
chai.use(http)

const MOCK = {
    "name": "Nicolas Danilo Ferreira",
    "email": "nicolasdaniloferreira@dominiozeladoria.com.br",
    "phone": ["1129702471", "11998305628"],
    "address": {
        "street": "Rua Santa Inês",
        "number": "287",
        "neighborhood": "Parque Santa Amélia",
        "city": "Itapecerica da Serra",
        "state": "SP",
        "zipCode": "06852780"
    }
}

const MOCK_DB = {
    "message": "1 records found for your search criteria",
    "data": [
        {
            "address": {
                "street": "Avenida Sete de Setembro",
                "number": "100",
                "neighborhood": "Centro",
                "city": "Itápolis",
                "state": "SP",
                "zipCode": "14900000"
            },
            "phone": [
                "16996095737"
            ],
            "excluded": false,
            "_id": "5fd51e8c80b5890027b0cae7",
            "name": "Hygor Podgornik",
            "email": "hppodgornik@gmail.com",
            "createdAt": "2020-12-12T19:48:28.053Z",
            "updatedAt": "2020-12-12T19:48:28.053Z"
        }
    ]
}

describe('REST Test', () => {
    describe('POST', () => {
        it('Should add contact', () => {
            chai.request(server)
                .post('/api/contact')
                .send(MOCK)
                .end((err, res) => {
                    const expectedResponse = { message: 'Contact saved successfully' }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(201)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })

        it('Should give error of validation', () => {
            delete MOCK['address']['city']
            chai.request(server)
                .post('/api/contact')
                .send(MOCK)
                .end((err, res) => {
                    const expectedResponse = {
                        message: 'The contact could not be saved. Check for errors',
                        errors: [
                            {
                                field: "address.city",
                                message: "Path `address.city` is required."
                            }
                        ]
                    }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })
    })

    describe('GET', () => {
        it('Should get all contacts', () => {
            chai.request(server)
                .get('/api/contacts')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                })
        })

        it('Should get contact filter by name', () => {
            chai.request(server)
                .get('/api/contacts?name=Hygor')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(MOCK_DB)
                })
        })

        it('Should get contact filter by email', () => {
            chai.request(server)
                .get('/api/contacts?email=hppodgornik@gmail.com')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(MOCK_DB)
                })
        })

        it('Should get contact filter by phone', () => {
            chai.request(server)
                .get('/api/contacts?phone=16996095737')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(MOCK_DB)
                })
        })

        it('Should get contact filter by address.city', () => {
            chai.request(server)
                .get('/api/contacts?address.city=Itápolis')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(MOCK_DB)
                })
        })

        it('Should get contact filter by name doesnt exists', () => {
            chai.request(server)
                .get('/api/contacts?name=Maria')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(204)
                })
        })
    })

    describe('GET/:ID', () => {
        it('Should get contact by ID', () => {
            chai.request(server)
                .get('/api/contact/5fd51e8c80b5890027b0cae7')
                .end((err, res) => {
                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(MOCK_DB)
                })
        })

        it('Should get contact by incorrect ID', () => {
            chai.request(server)
                .get('/api/contact/undefined')
                .end((err, res) => {
                    const expectedResponse = { message: "We were unable to perform your search at this time." }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })
    })

    describe('PUT/:ID', () => {
        it('Should update contact by ID', () => {
            chai.request(server)
                .put('/api/contact/5fd51e8c80b5890027b0cae7')
                .send({
                    "phone": ["16996095737", "1632630701"]
                })
                .end((err, res) => {
                    delete MOCK_DB['phone']
                    MOCKDB['phone'] = ["16996095737", "1632630701"]

                    const expectedResponse = { message: "Contact updated successfully" }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })

        it('Should update contact by incorrect ID', () => {
            chai.request(server)
                .put('/api/contact/undefined')
                .send({
                    "phone": ["16996095737"]
                })
                .end((err, res) => {
                    const expectedResponse = { message: "There was a problem updating the contact" }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })
    })

    describe('DELETE/:ID', () => {
        it('Should delete contact by ID', () => {
            chai.request(server)
                .delete('/api/contact/5fd51e8c80b5890027b0cae7')
                .end((err, res) => {
                    const expectedResponse = { message: "Contact excluded successfully" }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })

        it('Should delete contact by incorrect ID', () => {
            chai.request(server)
                .delete('/api/contact/undefined')
                .end((err, res) => {
                    const expectedResponse = { message: "There was a problem deleting the contact" }

                    chai.expect(err).to.be.null
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body).to.containSubset(expectedResponse)
                })
        })
    })
})
