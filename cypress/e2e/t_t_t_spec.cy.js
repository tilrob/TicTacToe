//POSSITIVE TESTS
  //should alternate moves between X and O starting with X
  //should declare X as the winner upon completing a row
  //should declare O as the winner upon completing a row 
  //should display the correct next player after each move
  //should reset the board when reset button is clicked after a win
  //should allow a new game after clicking reset

  //NEGATIVE TESTS
  //should not allow a player to overwrite a filled square
  //Cannot play after game ends (borad freezes)
  //will not crash game if reset game button is continuously spammed

  // all elements should exist+
  describe('TicTacToe app', () => {
    const site = '/';
  
    it('01 should alternate moves between X and O starting with X',()=>{
      cy.visit(site);
  
      cy.get('[class="square"]').each(($el, index)=>{
        if(index < 4){
          if(index % 2 === 0 ){
            cy.wrap($el).click().should('contain.text','X');
          } else {
            cy.wrap($el).click().should('contain.text','O');
          };
        };
      });
  
    });
  
    it('02 should declare X as the winner upon completing a row',()=>{
      
      cy.visit(site);
  
      cy.clickSequence('xtop row');
     
      cy.get('[class="status"]').should('contain.text', 'Laimėjo: X');
  
    });
  
    it('03 should declare O as the winner upon completing a row',()=>{
      
      cy.visit(site);
      
      cy.clickSequence('otop row');
     
      cy.get('[class="status"]').should('contain.text', 'Laimėjo: O');
     
    });
  
  it('04 should display the correct next player after each move', () => {
    cy.visit(site);
  
    cy.get('[class="square"]').each(($el, index) => {
      if (index < 4) {
        let expectedMark;
        let expectedNextPlayer;
  
        if (index % 2 === 0) {
          expectedMark = 'X';
          expectedNextPlayer = 'Kitas žaidėjas: O';
        } else {
          expectedMark = 'O';
          expectedNextPlayer = 'Kitas žaidėjas: X';
        }
  
        cy.wrap($el).click().should('contain.text', expectedMark);
        cy.get('[class="status"]').should('contain.text', expectedNextPlayer);
      }
    });
  });
  
    it('05 should reset the board when reset button is clicked after a win',()=>{
      
      cy.visit(site);
      cy.get('#root').should('be.visible');
  
      cy.clickSequence('xtop row');
      cy.get('[class="status"]').should('contain.text', 'Laimėjo: X');
  
      cy.get('[class="reset-button"]').click();
      cy.get('[class="status"]').should('contain.text', 'Kitas žaidėjas: X');
      
      cy.get('[class="square"]').each(($el)=>{
        cy.wrap($el).should('contain.text','');
      });
     
    });
  
    it('06 should allow a new game after clicking reset',()=>{
      
      cy.visit(site);
      cy.get('#root').should('be.visible');
  
      cy.get('.board > button').eq(0).click();
      cy.get('.board > button').eq(1).click();
    
      cy.get('[class="reset-button"]').click();
      cy.get('[class="status"]').should('contain.text', 'Kitas žaidėjas: X');
      
      cy.get('[class="square"]').each(($el)=>{
        cy.wrap($el).should('contain.text','');
      });
     
    });
  
  
    //NEGATIVE TESTS
  
    it('N01 should not allow a player to overwrite a filled square',()=>{
      cy.visit(site);
      cy.get('#root').should('be.visible');
  
      cy.get('.board > button').eq(0).click().should('contain.text','X');
      cy.get('.board > button').eq(0).click().should('contain.text','X');
  
    });
  
    it('N02 Cannot play after game ends (borad freezes)',()=>{
      
      cy.visit(site);
      cy.get('#root').should('be.visible');
  
      cy.clickSequence('omiddle row');
  
      cy.get('[class="status"]').should('contain.text', 'Laimėjo: O');
  
      cy.get('.square').each(($el) => {
        if (!$el.text().trim()) {
              cy.wrap($el).click().should('contain.text','');
        };
      });
  
    });
   
    it('N03 will not crash game if reset game button is continuously spammed ',()=>{
      
      cy.visit(site);
      cy.get('#root').should('be.visible');
  
      for (let i = 0; i < 20; i++) {
        cy.get('[class="reset-button"]').click();
      };
  
      cy.get('.square').eq(0).click().should('contain.text', 'X');
     
    });
  
  });