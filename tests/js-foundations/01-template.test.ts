import { emailTemplate } from '../../src/js-fundations/01-template';

describe('js-foundation/01-template.ts', () => {
  test('emailTemplate shoud cointain message a greeting', () => {
    expect(emailTemplate).toContain('Hi, ');
  });
  test('emailTemplate should contain {{name}} and {{orderID}}', () => {
    expect(emailTemplate).toContain('{{name}}');
    expect(emailTemplate).toContain('{{orderID}}');
  });
});
