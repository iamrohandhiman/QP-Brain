import { compareTwoStrings } from "string-similarity";
import { pickQuestions } from "../pickQuestions.js";
import { Cluster } from "../Cluster.js";

export const Final_Validation = (qp) => {
  // Flatten the input array to a single level
  const flattened = qp.flat(Infinity);
  console.log("Flattened questions:", flattened);

  // Loop through each pair of questions to find duplicates
  for (let idx1 = 0; idx1 < flattened.length; idx1++) {
    const question1 = flattened[idx1].questions;
    if (!question1) {
      console.warn(`No question found at index ${idx1}. Skipping.`);
      continue;
    }

    for (let idx2 = idx1 + 1; idx2 < flattened.length; idx2++) {
      const question2 = flattened[idx2].questions;
      if (!question2) {
        console.warn(`No question found at index ${idx2}. Skipping.`);
        continue;
      }

      // Compare the questions to see if they are identical
      const similarity = compareTwoStrings(question1, question2);

      if (similarity === 1) {
        console.log(
          "=================================================================="
        );
        console.log(
          `Duplicate found! Indices: ${idx1} and ${idx2}, CO: ${flattened[idx2].co}, Marks: ${flattened[idx2].marks}`
        );

        // Extract module number from the CO property
        const co = flattened[idx2].co || "";
        const regex = /\d+/;
        const result = co.match(regex);
        const module_number = result ? parseInt(result[0], 10) : null;

        // Pick additional questions based on module number and marks
        const extracted_questions = pickQuestions(
          module_number,
          parseInt(flattened[idx2].marks)
        );

        let dict = {};
        for (let eq_idx = 0; eq_idx < extracted_questions.length; eq_idx++) {
          let max_similarity = -1;
          for (let fq_idx = 0; fq_idx < flattened.length; fq_idx++) {
            const similarity = compareTwoStrings(
              extracted_questions[eq_idx].questions,
              flattened[fq_idx].questions
            );
            if (similarity > max_similarity) {
              max_similarity = similarity;
            }
          }
          dict[eq_idx] = max_similarity;
        }

        const entries = Object.entries(dict);

        entries.sort((a, b) => a[1] - b[1]);
        flattened[idx2] = extracted_questions[entries[0][0]];
      }
    }
  }

  // Return the updated flattened array
  return flattened;
};
