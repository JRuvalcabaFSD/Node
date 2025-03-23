import { getUuid } from '../../src/plugins/uuid.plugin';

describe('getUuid', () => {
  test('should return UUID', () => {
    const uuid = getUuid();

    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
  });
});
