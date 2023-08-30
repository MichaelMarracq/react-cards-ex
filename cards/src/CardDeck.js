import React, { useState, useEffect } from "react";

function CardDeck() {
  const [deckId, setDeckId] = useState(null);
  const [data, setData] = useState({ cards: [] }); // Declare and initialize data state

  useEffect(() => {
    async function fetchNewDeck() {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      const responseData = await response.json();
      setDeckId(responseData.deck_id);
    }

    fetchNewDeck();
  }, []);

  async function drawCard() {
    if (!deckId) return;

    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    const responseData = await response.json();

    if (responseData.error) {
      alert("Error: no cards remaining!");
      return;
    }

    setData(responseData); // Update the data state
    setDeckId(responseData.deck_id);
  }

  return (
    <div>
      <button onClick={drawCard}>Draw Card</button>
      {data.cards.length > 0 && (
        <img src={data.cards[0].image} alt={data.cards[0].value} />
      )}
    </div>
  );
}

export default CardDeck;
