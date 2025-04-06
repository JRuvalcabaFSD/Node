import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../data/postgres';

describe('todo route testing', () => {
  const todo1 = { text: 'Hola Mundo 1' };
  const todo2 = { text: 'Hola Mundo 2' };

  beforeAll(async () => {
    await testServer.start();
  });
  afterAll(() => {
    testServer.close();
  });
  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  test('should return todos api/todos', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });
    const { body } = await request(testServer.app).get('/api/todos').expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeNull();
  });

  test('should return a todo api/todo/id', async () => {
    const { id } = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app).get(`/api/todos/${id}`);

    expect(body.text).toBe(todo1.text);
    expect(body.completedAt).toBeNull();
  });
});
