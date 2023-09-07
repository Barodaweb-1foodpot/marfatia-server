const fs = require("fs");
const amcSchemeModel = require("../models/amcSchemeModel");

const amcSchemaData = require("./AMCSchemeMaster.json");
const amcCategoryData = require("./amcCategoryMaster.json");
const amcMasterData = require("./amcMaster.json");

// Create a mapping object for easy lookup
const amcCategoryMap = {};
const amcMasterMap = {};

amcCategoryData.forEach((category) => {
  amcCategoryMap[category.AMCCatId] = category.CategoryName;
});

amcMasterData.forEach((amc) => {
  amcMasterMap[amc.AMCId] = amc.AMCName;
});

// Populate the main JSON file with new properties
amcSchemaData.forEach((scheme) => {
  scheme.AMC = amcMasterMap[scheme.AMCId] || null;
  scheme.AMCCategory = amcCategoryMap[scheme.AMCCatId] || null;
});

console.log(amcSchemaData);
// Save the updated main JSON file

try {
  const createCategoryPromises = [];
  //loop thrugh data
  for (const element of amcSchemaData) {
    createCategoryPromises.push(amcSchemeModel.create(element));
  }

  const createdCategories = Promise.all(createCategoryPromises);

  
} catch (error) {
  next(error);
}

// try {
//     fs.writeFileSync('./amcSchemeMaster.json', JSON.stringify(amcSchemaData, null, 2));

//     console.log('Main JSON file updated and saved as main_updated.json');
//   } catch (error) {
//     console.error('Error writing the file:', error);
//   }

// console.log('Main JSON file updated and saved as main_updated.json');
