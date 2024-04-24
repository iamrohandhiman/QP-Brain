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



const chapters = [4, 5, 6];
const chpNumericalRatio = [40,60,50]
const weights = [6, 9, 10];
const TnRatio = 50;





let nqAT = Math.round(TnRatio * 0.01 * 7);
let nqBT = Math.round(TnRatio * 0.01 * 4);

let nqAN = 7 - nqAT;
let nqBN = 4 - nqBT;

console.log(nqAT)
console.log(nqBT)
console.log(nqAN)
console.log(nqBN)


let maxiIndex = 0;
for (let i = 1; i < weights.length; i++) { 
    if (weights[i] > weights[maxiIndex]) {
        maxiIndex = i;
    }
}

let chpMaxi = chapters[maxiIndex];

const chapterRatioDict = {};
for (let i = 0; i < chapters.length; i++) {
    chapterRatioDict[chapters[i]] = chpNumericalRatio[i];
}

let chapterRatioArray = Object.entries(chapterRatioDict); 

chapterRatioArray.sort((a, b) => b[1] - a[1]); 


console.log(chapterRatioArray);

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


//populating questions(numeric) in section A

let dictAN = {};
chapters.forEach(chapter => dictAN[chapter] = 0); 

let indexAN = 0;
let questionCountAN = 0;


if (nqAN % 2 === 0) { 
    while (questionCountAN < nqAN) {
        let chapter = chapterRatioArray[indexAN][0]; 
        dictAN[chapter] += 1; 
        indexAN = (indexAN + 1) % chapters.length; 
        questionCountAN++;
    }
} else {
    while (questionCountAN < (nqAN - 1)) {
        let chapter = chapterRatioArray[indexAN][0];
        dictAN[chapter] += 1;
        indexAN = (indexAN + 1) % chapters.length;
        questionCountAN++;
    }
    dictAN[chpMaxi] += 1; 
}

console.log(dictAN); 

//populating questions(numeric) in section B
// Correct initialization for Section B
let dictBN = {};
chapters.forEach(chapter => dictBN[chapter] = 0); 

let indexBN = 0;
let questionCountBN = 0;

// Correct even/odd check
if (nqBN % 2 === 0) { // Use nqBN for Section B
    while (questionCountBN < nqBN) {
        let chapter = chapterRatioArray[indexBN][0]; 
        dictBN[chapter] += 1; 
        indexBN = (indexBN + 1) % chapters.length; 
        questionCountBN++;
    }
} else {
    while (questionCountBN < (nqBN - 1)) { 
        let chapter = chapterRatioArray[indexBN][0];
        dictBN[chapter] += 1;
        indexBN = (indexBN + 1) % chapters.length;
        questionCountBN++;
    }
    dictBN[chpMaxi] += 1; 
}

console.log(dictBN); 







// // Generate question papers and store them in arrays
for (let i = 0; i < chapters.length; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(chapters[i], 2, parseInt(dictAT[chapters[i]]), "T", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

for (let i = 0; i < chapters.length; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(chapters[i], 2, parseInt(dictAN[chapters[i]]), "N", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

// Generate question papers and store them in arrays
for (let i = 0; i < chapters.length; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(chapters[i], 5, parseInt(dictBT[chapters[i]]), "T", true); //module marks count 
  qp1.push(set1);
  
  qp2.push(set2);
  
  qp3.push(set3);
  
}

// // Generate question papers and store them in arrays
for (let i = 0; i < chapters.length; i++) {
  const { set1, set2, set3 } = generateQuestionPaper(chapters[i], 5, parseInt(dictBN[chapters[i]]), "N", true); //module marks count 
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
