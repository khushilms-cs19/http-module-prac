const createGroceriesList = (groceriesList)=>{
  return groceriesList.reduce((total, curr)=> total +`<li>${curr}</li>`, '');
};

const createHTMLWrapper = (content)=>{
  return `<html>
    <head>
      <title>To Do List</title>
    </head>
    <body>${content}</body>
  </html>`;
};

module.exports = {
  createGroceriesList,
  createHTMLWrapper,
};