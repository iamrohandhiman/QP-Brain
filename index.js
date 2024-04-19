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

let dictAT = {
 "1": "2",
 "2": "1",
 "3": "3"
}

let dictBT = {
  "1": "1",
  "2": "1",
  "3": "1"
 }

let dictAN = {
  "1": "0",
  "2": "1",
  "3": "0"
 }
 
let dictBN = {
   "1": "0",
   "2": "1",
   "3": "0"
  }

// Generate question papers and store them in arrays
for (let i = 1; i <= 3; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(i, 2, parseInt(dictAT[i]), "T", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

for (let i = 1; i <= 3; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(i, 2, parseInt(dictAN[i]), "N", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

// Generate question papers and store them in arrays
for (let i = 1; i <= 3; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(i, 5, parseInt(dictBT[i]), "N", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

// Generate question papers and store them in arrays
for (let i = 1; i <= 3; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(i, 5, parseInt(dictBN[i]), "N", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}


console.log("Set 1:");
console.log(qp1);
console.log("Set 2:");
console.log(qp2);
console.log("Set 3:");
console.log(qp3);
