const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe("ONG Unique ID", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app).post('/ongs').send({
      name: "APAD2",
      email: "contato@test.com",
      whatsapp: "44998639827",
      city: "Araruna",
      uf: "PR"
    });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

})