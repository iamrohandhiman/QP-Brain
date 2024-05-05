import { compareTwoStrings } from "string-similarity";
import { pickQuestions } from "../pickQuestions.js";

export const Final_Validation = (qp) => {
  // Flatten the input array to a single level
  const flattened = qp.flat(Infinity);
  console.log("Flattened questions:", flattened);

  // Loop through each pair of questions to find duplicates
  for (let i = 0; i < flattened.length; i++) {
    const question1 = flattened[i].questions;
    if (!question1) {
      console.warn(`No question found at index ${i}. Skipping.`);
      continue;
    }

    for (let j = i + 1; j < flattened.length; j++) {
      const question2 = flattened[j].questions;
      if (!question2) {
        console.warn(`No question found at index ${j}. Skipping.`);
        continue;
      }

      // Compare the questions to see if they are identical
      const similarity = compareTwoStrings(question1, question2);

      if (similarity === 1) {
        console.log("==================================================================");
        console.log(
          `Duplicate found! Indices: ${i} and ${j}, CO: ${flattened[j].co}, Marks: ${flattened[j].marks}`
        );

        // Extract module number from the CO property
        const co = flattened[j].co || "";
        const regex = /\d+/;
        const result = co.match(regex);
        const module_number = result ? parseInt(result[0], 10) : null;

        if (module_number === null) {
          console.warn(`Could not extract module number from CO: ${co}`);
          continue;
        }

        // Pick additional questions based on module number and marks
        const extracted_questions = pickQuestions(
          module_number,
          parseInt(flattened[j].marks)
        );

        if (!extracted_questions || extracted_questions.length === 0) {
          console.warn("No extracted questions found.");
          continue;
        }

        // Find the most similar question from `extracted_questions`
        const similarity_dict = {};
        for (let k = 0; k < extracted_questions.length; k++) {
          const question_to_compare = extracted_questions[k].questions;
          if (!question_to_compare) {
            console.warn(`No question found in extracted question at index ${k}.`);
            continue;
          }

          const current_similarity = compareTwoStrings(
            question1,
            question_to_compare
          );

          similarity_dict[k] = current_similarity;
        }

        // Sort by similarity in descending order
        const similarity_entries = Object.entries(similarity_dict).sort(
          (a, b) => a[1] - b[1]
        );

        // Update `flattened[j]` with the extracted question with the highest similarity
        const most_similar_index = parseInt(similarity_entries[0][0], 10);
        flattened[j] = extracted_questions[most_similar_index];
      }
    }
  }

  // Return the updated flattened array
  return flattened;
};
