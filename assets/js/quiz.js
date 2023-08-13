// Обработчик нажатия на кнопку "назад"
document.getElementById('back-button').addEventListener('click', () => {
  window.history.back(); // Используем стандартную браузерную функцию "назад"
});


(function() {
  const answer1 = localStorage.getItem('answer1');
  const answer2 = localStorage.getItem('answer2');
  const answer3 = localStorage.getItem('answer3');
  const answer4 = localStorage.getItem('answer4');
  const answer5 = localStorage.getItem('answer5');
  const answer6 = localStorage.getItem('answer6');
  const answer7 = localStorage.getItem('answer7');
  const answer8 = localStorage.getItem('answer8');
  const answer9 = localStorage.getItem('answer9');
  console.log('Вопрос 1:', answer1, '\nВопрос 2:', answer2,'\nВопрос 3:', answer3,'\nВопрос 4:', answer4, '\nВопрос 5:', answer5,'\nВопрос 6:', answer6,'\nВопрос 7:', answer7, '\nВопрос 8:', answer8,'\nВопрос 9:', answer9)
})();