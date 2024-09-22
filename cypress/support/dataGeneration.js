const { faker } = require('@faker-js/faker');

function generateUserData() {
  const randomNumber = Math.ceil(Math.random() * 1000);
  const gender = faker.helpers.arrayElement(['male', 'female']);
  const name = faker.person.firstName(gender);
  const username = `test${name}${randomNumber}`;
  const password = generatePassword(randomNumber);

  return {
    username,
    password
  };
}

function generatePassword(randomNumber) {
  const normalWord = faker.lorem.word(10);
  const capitalLetterNormal = normalWord.charAt(0).toUpperCase();
  const validPassword = `${capitalLetterNormal}${normalWord.slice(1)}${randomNumber}`;

  return validPassword;
}

module.exports = { generateUserData };
