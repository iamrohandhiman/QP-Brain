import { pickQuestions } from "./Cluster-QS/pickQuestions.js";
import { SimilarityCheck } from "./Cluster-QS/SimilarityCheck.js";
import { Cluster } from "./Cluster-QS/Cluster.js";
import { prepRating } from "./Cluster-QS/prepRating.js";
import { sort_cluster } from "./Cluster-QS/sort_cluster.js";
import { lastOccurrence } from "./Cluster-QS/lastOccurrence.js";
import { seprateCluster } from "./Cluster-QS/seprateCluster.js";
import { SelectQuestions } from "./Cluster-QS/selectQuestions.js";

function generateQuestionPaper(module, marks, count, type, flag) {
  if (flag) {
    // Pick questions
    let questions = pickQuestions(module, marks);

    // Check similarity
    let averageSimilarity = SimilarityCheck(questions);

    // Cluster questions
    let { questions: cluster, clusterCount } = Cluster(questions, averageSimilarity);

    // Prepare ratings
    let prepCluster = prepRating(cluster, clusterCount);

    // Sort clusters
    let sorted_cluster = sort_cluster(prepCluster);

    // Find last occurrence
    let clusterlastOccurence = lastOccurrence(sorted_cluster, clusterCount);

    // Separate clusters
    const [cluster1, cluster2, cluster3] = seprateCluster(sorted_cluster, clusterlastOccurence);

    // Select questions for the question paper
    const [set1, set2, set3] = SelectQuestions(cluster3, cluster2, cluster1, cluster, count, type);

    // Return selected questions
    return { set1, set2, set3 };
  }
}


// Arrays to hold the generated question papers
var qp1 = [];
var qp2 = [];
var qp3 = [];



const chapters = [1, 2, 3];
const weights = [6, 9, 10];
const TnRatio = 80;
const chpNumericalRatio = [40,50,60]


let nqAT = Math.round(TnRatio * 0.01 * 7);
let nqBT = Math.round(TnRatio * 0.01 * 4);

let nqAN = 7 - nqAT;
let nqBN = 7 - nqBT;

// Finding maximum weight
let maxiIndex = 0;
for (let i = 1; i < weights.length; i++) { 
    if (weights[i] > weights[maxiIndex]) {
        maxiIndex = i;
    }
}

let chpMaxi = chapters[maxiIndex];

//populate sectionA theory
let dictAT = {};
chapters.forEach(chapter => dictAT[chapter] = 0);

let indexAT = 0;
let questionCountAT = 0;


if (nqAT % 2 === 0) {
    while (questionCountAT < nqAT) {
        dictAT[chapters[indexAT]] += 1; 
        indexAT = (indexAT + 1) % chapters.length; 
        questionCountAT++;
    }
} else { 
    while (questionCountAT < (nqAT - 1)) {
        dictAT[chapters[indexAT]] += 1;
        indexAT = (indexAT + 1) % chapters.length;
        questionCountAT++;
    }
    dictAT[chpMaxi] += 1; 
}

console.log(dictAT);

//populating questions(Theory) in section B
let dictBT = {};
chapters.forEach(chapter => dictBT[chapter] = 0); 


let indexBT = 0;
let questionCountBT = 0;


if (nqBT % 2 === 0) {
    while (questionCountBT < nqBT) { 
        dictBT[chapters[indexBT]] += 1; 
        indexBT = (indexBT + 1) % chapters.length; 
        questionCountBT++; 
    }
} else { 
    while (questionCountBT < (nqBT - 1)) { 
        dictBT[chapters[indexBT]] += 1;
        indexBT = (indexBT + 1) % chapters.length;
        questionCountBT++;
    }
    dictBT[chpMaxi] += 1; 
}

console.log(dictBT); 




// let dictAN = {
//   "1": "0",
//   "2": "1",
//   "3": "0"
//  }
 
// let dictBN = {
//    "1": "0",
//    "2": "1",
//    "3": "0"
//   }

// // Generate question papers and store them in arrays
// for (let i = 1; i <= 3; i++) {
//   const { set1, set2, set3 } = generateQuestionPaper(i, 2, parseInt(dictAT[i]), "T", true); //module marks count 
//   qp1.push(set1);
  
//   qp2.push(set2);
  
//   qp3.push(set3);
  
// }

// for (let i = 1; i <= 3; i++) {
//   const { set1, set2, set3 } = generateQuestionPaper(i, 2, parseInt(dictAN[i]), "N", true); //module marks count 
//   qp1.push(set1);
  
//   qp2.push(set2);
  
//   qp3.push(set3);
  
// }

// Generate question papers and store them in arrays
// for (let i = 1; i <= 3; i++) {
//   const { set1, set2, set3 } = generateQuestionPaper(i, 5, parseInt(dictBT[i]), "T", true); //module marks count 
//   qp1.push(set1);
  
//   qp2.push(set2);
  
//   qp3.push(set3);
  
// }

// // Generate question papers and store them in arrays
// for (let i = 1; i <= 3; i++) {
//   const { set1, set2, set3 } = generateQuestionPaper(i, 5, parseInt(dictBN[i]), "N", true); //module marks count 
//   qp1.push(set1);
  
//   qp2.push(set2);
  
//   qp3.push(set3);
  
// }


// console.log("Set 1:");
// console.log(qp1);
// console.log("Set 2:");
// console.log(qp2);
// console.log("Set 3:");
// console.log(qp3);
