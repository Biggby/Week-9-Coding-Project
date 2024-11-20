import chai from "chai";
const { assert, expect } = chai;

describe('Suits', () => {
  describe('#array', () => {
    it('should contain four values', (done) => {
      /* Arrange */
      /* Act / Invoke */
      /* Assert */
      expect(Suits.length).to.equal(4);

      done();
    });
    it('should contain "♠"', (done) => {
      /* Arrange */
      let expectedSuit = '♠';
      
      /* Act / Invoke */
      /* Assert */
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♥"', (done) => {
      /* Arrange */
      let expectedSuit = '♥';
      
      /* Act / Invoke */
      /* Assert */
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♣"', (done) => {
      /* Arrange */
      let expectedSuit = '♣';
      
      /* Act / Invoke */
      /* Assert */
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♦"', (done) => {
      /* Arrange */
      let expectedSuit = '♦';
      
      /* Act / Invoke */
      /* Assert */
      expect(Suits).to.contain(expectedSuit);

      done();
    });
  });
});

const Suits = [ '♠', '♥', '♣', '♦' ]; // declares each symbol for the suits / aces, clubs etc.

export default Suits;
