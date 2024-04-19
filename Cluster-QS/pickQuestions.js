import UserQuestions from "../mock_db.js"

//fetching quesitons
export const pickQuestions =(module, marks) => {
  module = module.toString();
  const questions = UserQuestions.filter(
    (user) => user.co === `CO${module}` && user.marks === marks.toString()
  );
  return questions;
}

